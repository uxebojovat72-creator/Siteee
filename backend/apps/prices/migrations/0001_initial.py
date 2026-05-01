from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='PriceCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.SlugField(help_text='Латиницей без пробелов: paintball, lazertag, atv…', unique=True, verbose_name='Ключ')),
                ('icon', models.CharField(max_length=10, verbose_name='Иконка (эмодзи)')),
                ('title', models.CharField(max_length=100, verbose_name='Название')),
                ('note', models.CharField(blank=True, max_length=300, verbose_name='Подзаголовок/примечание')),
                ('badge', models.CharField(blank=True, max_length=50, verbose_name='Бейдж (возраст и т.п.)')),
                ('photo', models.CharField(blank=True, help_text='Например: /bukhta_action1.jpg', max_length=200, verbose_name='Путь к фото')),
                ('order', models.PositiveIntegerField(default=0, verbose_name='Порядок')),
                ('is_active', models.BooleanField(default=True, verbose_name='Активна')),
            ],
            options={
                'verbose_name': 'Категория цен',
                'verbose_name_plural': 'Категории цен',
                'ordering': ['order', 'title'],
            },
        ),
        migrations.CreateModel(
            name='PricePlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Название тарифа')),
                ('price', models.CharField(help_text='Например: 1 800 ₽  или  от 80 000 ₽', max_length=50, verbose_name='Цена')),
                ('unit', models.CharField(blank=True, help_text='Например: / чел  или  / авто. Оставьте пустым если не нужно.', max_length=30, verbose_name='Единица')),
                ('duration', models.CharField(help_text='Например: 1 час  или  Неограничено', max_length=50, verbose_name='Длительность')),
                ('bullets', models.JSONField(default=list, help_text='Каждая строка — отдельный пункт', verbose_name='Включено (список)')),
                ('is_hot', models.BooleanField(default=False, verbose_name='Хит продаж')),
                ('order', models.PositiveIntegerField(default=0, verbose_name='Порядок')),
                ('is_active', models.BooleanField(default=True, verbose_name='Активен')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plans', to='prices.pricecategory', verbose_name='Категория')),
            ],
            options={
                'verbose_name': 'Тариф',
                'verbose_name_plural': 'Тарифы',
                'ordering': ['order', 'name'],
            },
        ),
    ]
