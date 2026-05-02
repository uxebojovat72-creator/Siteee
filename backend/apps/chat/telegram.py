import json
import logging
import urllib.request
import urllib.error
from django.conf import settings

logger = logging.getLogger(__name__)


def send_chat_notification(msg):
    token = getattr(settings, 'TELEGRAM_BOT_TOKEN', '')
    chat_id = getattr(settings, 'TELEGRAM_CHAT_ID', '')
    if not token or not chat_id:
        return

    lines = ['💬 *Новое сообщение с сайта*\n']
    if msg.name:
        lines.append(f'👤 {msg.name}')
    if msg.phone:
        lines.append(f'📱 {msg.phone}')
    lines.append(f'\n_{escape_md(msg.message)}_')
    lines.append('\n🌐 paintballclub.ru')

    text = '\n'.join(lines)

    payload = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown',
    }).encode('utf-8')

    url = f'https://api.telegram.org/bot{token}/sendMessage'
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
    try:
        urllib.request.urlopen(req, timeout=8)
        return True
    except urllib.error.URLError as e:
        logger.warning('Telegram notification failed: %s', e)
        return False


def escape_md(text):
    for ch in ('_', '*', '[', '`'):
        text = text.replace(ch, f'\\{ch}')
    return text
