from django.db import models


class Park(models.Model):
    name = models.CharField('Название', max_length=200)
    slug = models.SlugField(unique=True)
    location = models.CharField('Расположение', max_length=200)
    description = models.TextField('Описание')
    short_description = models.CharField('Краткое описание', max_length=500)
    photo = models.ImageField('Фото', upload_to='parks/', blank=True)
    is_active = models.BooleanField('Активен', default=True)

    class Meta:
        verbose_name = 'Парк'
        verbose_name_plural = 'Парки'

    def __str__(self):
        return self.name


class Activity(models.Model):
    park = models.ForeignKey(
        Park, on_delete=models.CASCADE, related_name='activities', verbose_name='Парк'
    )
    name = models.CharField('Название', max_length=200)
    description = models.TextField('Описание', blank=True)
    min_age = models.PositiveIntegerField('Мин. возраст', null=True, blank=True)
    price_from = models.DecimalField(
        'Цена от', max_digits=10, decimal_places=2, null=True, blank=True
    )
    price_label = models.CharField('Метка цены', max_length=100, blank=True)
    photo = models.ImageField('Фото', upload_to='activities/', blank=True)
    order = models.PositiveIntegerField('Порядок', default=0)
    is_active = models.BooleanField('Активна', default=True)

    class Meta:
        verbose_name = 'Активность'
        verbose_name_plural = 'Активности'
        ordering = ['order']

    def __str__(self):
        return f'{self.park.name} — {self.name}'
