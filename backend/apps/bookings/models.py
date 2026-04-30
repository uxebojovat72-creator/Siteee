from django.db import models
from apps.parks.models import Park


class Booking(models.Model):
    STATUS_NEW = 'new'
    STATUS_CONFIRMED = 'confirmed'
    STATUS_CANCELLED = 'cancelled'
    STATUS_CHOICES = [
        (STATUS_NEW, 'Новая'),
        (STATUS_CONFIRMED, 'Подтверждена'),
        (STATUS_CANCELLED, 'Отменена'),
    ]

    park = models.ForeignKey(
        Park, on_delete=models.SET_NULL, null=True, verbose_name='Парк'
    )
    name = models.CharField('Имя', max_length=200)
    phone = models.CharField('Телефон', max_length=30)
    email = models.EmailField('Email', blank=True)
    people_count = models.PositiveIntegerField('Количество человек', default=10)
    desired_date = models.DateField('Желаемая дата', null=True, blank=True)
    comment = models.TextField('Комментарий', blank=True)
    status = models.CharField(
        'Статус', max_length=20, choices=STATUS_CHOICES, default=STATUS_NEW
    )
    created_at = models.DateTimeField('Создана', auto_now_add=True)

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.phone} ({self.get_status_display()})'
