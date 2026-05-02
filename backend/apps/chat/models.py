import uuid
from django.db import models
from django.utils import timezone


class ChatSession(models.Model):
    session_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('Имя', max_length=200, blank=True)
    phone = models.CharField('Телефон', max_length=50, blank=True)
    ip = models.GenericIPAddressField('IP', null=True, blank=True)
    city = models.CharField('Город', max_length=100, blank=True)
    country = models.CharField('Страна', max_length=10, blank=True)
    last_seen = models.DateTimeField('Последняя активность', default=timezone.now)
    created_at = models.DateTimeField('Создан', auto_now_add=True)

    class Meta:
        verbose_name = 'Сессия чата'
        verbose_name_plural = 'Сессии чата'
        ordering = ['-created_at']

    def is_online(self):
        return (timezone.now() - self.last_seen).total_seconds() < 120

    def __str__(self):
        return f'{self.name or self.ip or "Аноним"} #{str(self.session_id)[:6]}'


class ChatMessage(models.Model):
    TYPE_IN = 'in'
    TYPE_OUT = 'out'
    TYPE_CHOICES = [(TYPE_IN, 'Посетитель'), (TYPE_OUT, 'Менеджер')]

    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    type = models.CharField('Тип', max_length=3, choices=TYPE_CHOICES)
    text = models.TextField('Текст')
    tg_message_id = models.BigIntegerField('TG message_id', null=True, blank=True)
    created_at = models.DateTimeField('Получено', auto_now_add=True)

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
        ordering = ['created_at']

    @property
    def ts(self):
        return int(self.created_at.timestamp() * 1000)

    def __str__(self):
        return f'[{self.type}] {self.text[:60]}'
