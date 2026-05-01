from django.db import models


class PriceCategory(models.Model):
    key = models.SlugField('Ключ', max_length=50, unique=True,
                           help_text='Латиницей без пробелов: paintball, lazertag, atv…')
    icon = models.CharField('Иконка (эмодзи)', max_length=10)
    title = models.CharField('Название', max_length=100)
    note = models.CharField('Подзаголовок/примечание', max_length=300, blank=True)
    badge = models.CharField('Бейдж (возраст и т.п.)', max_length=50, blank=True)
    photo = models.CharField('Путь к фото', max_length=200, blank=True,
                             help_text='Например: /bukhta_action1.jpg')
    order = models.PositiveIntegerField('Порядок', default=0)
    is_active = models.BooleanField('Активна', default=True)

    class Meta:
        verbose_name = 'Категория цен'
        verbose_name_plural = 'Категории цен'
        ordering = ['order', 'title']

    def __str__(self):
        return f'{self.icon} {self.title}'


class PricePlan(models.Model):
    category = models.ForeignKey(
        PriceCategory, on_delete=models.CASCADE,
        related_name='plans', verbose_name='Категория',
    )
    name = models.CharField('Название тарифа', max_length=100)
    price = models.CharField('Цена', max_length=50,
                             help_text='Например: 1 800 ₽  или  от 80 000 ₽')
    unit = models.CharField('Единица', max_length=30, blank=True,
                            help_text='Например: / чел  или  / авто. Оставьте пустым если не нужно.')
    duration = models.CharField('Длительность', max_length=50,
                                help_text='Например: 1 час  или  Неограничено')
    bullets = models.JSONField('Включено (список)', default=list,
                               help_text='Каждая строка — отдельный пункт')
    is_hot = models.BooleanField('Хит продаж', default=False)
    order = models.PositiveIntegerField('Порядок', default=0)
    is_active = models.BooleanField('Активен', default=True)

    class Meta:
        verbose_name = 'Тариф'
        verbose_name_plural = 'Тарифы'
        ordering = ['order', 'name']

    def __str__(self):
        return f'{self.category.title} — {self.name} ({self.price})'
