from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import AnonRateThrottle
from .serializers import ChatMessageCreateSerializer
from .telegram import send_chat_notification


class ChatThrottle(AnonRateThrottle):
    scope = 'chat'


class ChatMessageView(APIView):
    throttle_classes = [ChatThrottle]

    def post(self, request):
        serializer = ChatMessageCreateSerializer(data=request.data)
        if not serializer.is_valid():
            # Return generic error so bots get no useful feedback
            return Response({'status': 'error'}, status=status.HTTP_400_BAD_REQUEST)

        ip = (
            request.META.get('HTTP_X_FORWARDED_FOR', '').split(',')[0].strip()
            or request.META.get('REMOTE_ADDR')
        )
        msg = serializer.save(ip=ip)

        ok = send_chat_notification(msg)
        if ok:
            msg.sent_to_telegram = True
            msg.save(update_fields=['sent_to_telegram'])

        return Response({'status': 'ok'}, status=status.HTTP_201_CREATED)
