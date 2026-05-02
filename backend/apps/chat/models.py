from django.db import models


class ChatMessage(models.Model):
    name = models.CharField('Имя', max_length=100, blank=True)
    phone = models.CharField('Телефон', max_length=30, blank=True)
    message = models.TextField('Сообщение')
    ip = models.GenericIPAddressField('IP-адрес', null=True, blank=True)
    sent_to_telegram = models.BooleanField('Отправлено в Telegram', default=False)
    created_at = models.DateTimeField('Получено', auto_now_add=True)

    class Meta:
        verbose_name = 'Сообщение чата'
        verbose_name_plural = 'Сообщения чата'
        ordering = ['-created_at']

    def __str__(self):
        sender = self.name or self.ip or 'Аноним'
        return f'{sender}: {self.message[:60]}'
