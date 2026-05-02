import uuid
import logging
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from .models import ChatSession, ChatMessage
from .telegram import send_chat_notification, send_offline_warning

logger = logging.getLogger(__name__)


class ChatThrottle(AnonRateThrottle):
    scope = 'chat'


def _get_ip(request):
    return (
        request.META.get('HTTP_X_FORWARDED_FOR', '').split(',')[0].strip()
        or request.META.get('REMOTE_ADDR', '')
    )


class ChatView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ChatThrottle]

    def post(self, request):
        data = request.data

        # Honeypot: silently succeed so bots think it worked
        if data.get('hp'):
            return Response({'status': 'ok', 'session_id': str(uuid.uuid4())}, status=201)

        message = (data.get('message') or '').strip()
        if len(message) < 2:
            return Response({'status': 'error'}, status=400)

        name = (data.get('name') or '').strip()
        phone = (data.get('phone') or '').strip()
        ip = _get_ip(request)
        # Cloudflare passes geo headers when proxied; fallback to empty
        city = request.META.get('HTTP_CF_IPCITY', '')
        country = request.META.get('HTTP_CF_IPCOUNTRY', '')

        # Resume existing session or start new one
        session = None
        raw_sid = data.get('session_id', '')
        if raw_sid:
            try:
                session = ChatSession.objects.get(session_id=raw_sid)
                session.last_seen = timezone.now()
                session.save(update_fields=['last_seen'])
            except (ChatSession.DoesNotExist, Exception):
                pass

        is_first = session is None
        if session is None:
            session = ChatSession.objects.create(
                name=name, phone=phone,
                ip=ip or None, city=city, country=country,
            )

        msg = ChatMessage.objects.create(session=session, type=ChatMessage.TYPE_IN, text=message)

        tg_msg_id = send_chat_notification(session, msg, is_first)
        if tg_msg_id:
            msg.tg_message_id = tg_msg_id
            msg.save(update_fields=['tg_message_id'])

        return Response({'status': 'ok', 'session_id': str(session.session_id)}, status=201)


class MessagesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        session_id = request.query_params.get('session', '')
        if not session_id:
            return Response({'messages': []})
        try:
            session = ChatSession.objects.get(session_id=session_id)
            # Heartbeat — update last_seen so manager knows user is online
            session.last_seen = timezone.now()
            session.save(update_fields=['last_seen'])
            messages = [
                {'type': m.type, 'text': m.text, 'ts': m.ts}
                for m in session.messages.all()
            ]
            return Response({'messages': messages})
        except ChatSession.DoesNotExist:
            return Response({'messages': []})


class WebhookView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response('Webhook active')

    def post(self, request):
        update = request.data
        msg = update.get('message')

        # Only process text replies to a specific bot message
        if not msg or not msg.get('text') or not msg.get('reply_to_message'):
            return Response('ok')

        reply_text = msg['text'].strip()
        original_msg_id = msg['reply_to_message']['message_id']

        # Find session by original TG message id
        orig = ChatMessage.objects.filter(tg_message_id=original_msg_id).first()
        if not orig:
            return Response('ok')

        session = orig.session
        is_offline = not session.is_online()

        # Save manager reply; also store its tg_message_id for reply chains
        ChatMessage.objects.create(
            session=session,
            type=ChatMessage.TYPE_OUT,
            text=reply_text,
            tg_message_id=msg.get('message_id'),
        )

        if is_offline:
            send_offline_warning(session)

        return Response('ok')
