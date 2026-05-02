import json
import logging
import urllib.request
import urllib.error
from django.conf import settings
from django.utils import timezone

logger = logging.getLogger(__name__)


def _esc(text):
    for ch in ('\\', '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'):
        text = text.replace(ch, f'\\{ch}')
    return text


def _send(text):
    token = getattr(settings, 'TELEGRAM_BOT_TOKEN', '')
    chat_id = getattr(settings, 'TELEGRAM_CHAT_ID', '')
    if not token or not chat_id:
        logger.warning('Telegram: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set')
        return None
    payload = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'MarkdownV2',
    }).encode('utf-8')
    req = urllib.request.Request(
        f'https://api.telegram.org/bot{token}/sendMessage',
        data=payload,
        headers={'Content-Type': 'application/json'},
    )
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read())
            if data.get('ok'):
                return data['result']['message_id']
    except urllib.error.URLError as e:
        logger.warning('Telegram send failed: %s', e)
    return None


def send_chat_notification(session, msg, is_first):
    short_id = str(session.session_id)[:6]
    geo_parts = [p for p in [session.city, session.country] if p]
    geo = ', '.join(geo_parts)

    label = 'Новый чат' if is_first else 'Продолжение'
    lines = [f'💬 *{label}* · `#{short_id}`\n']
    if session.name:
        lines.append(f'👤 {_esc(session.name)}\n')
    if session.phone:
        lines.append(f'📱 {_esc(session.phone)}\n')
    lines.append(f'\n_{_esc(msg.text)}_')
    if session.ip or geo:
        ip_str = f'{_esc(geo)} · {_esc(str(session.ip))}' if geo and session.ip else _esc(str(session.ip or geo))
        lines.append(f'\n\n🌍 {ip_str}')

    return _send(''.join(lines))


def send_offline_warning(session):
    diff = (timezone.now() - session.last_seen).total_seconds()
    mins = round(diff / 60)
    if mins > 0:
        text = (
            f'⚠️ Пользователь оффлайн — последняя активность {mins} мин\\. назад\\.'
            f' Ответ сохранён, увидит при следующем визите\\.'
        )
    else:
        text = '⚠️ Пользователь не открывал сайт в этом сеансе\\. Ответ сохранён\\.'
    _send(text)
