from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='ChatMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, verbose_name='Имя')),
                ('phone', models.CharField(blank=True, max_length=30, verbose_name='Телефон')),
                ('message', models.TextField(verbose_name='Сообщение')),
                ('ip', models.GenericIPAddressField(blank=True, null=True, verbose_name='IP-адрес')),
                ('sent_to_telegram', models.BooleanField(default=False, verbose_name='Отправлено в Telegram')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Получено')),
            ],
            options={
                'verbose_name': 'Сообщение чата',
                'verbose_name_plural': 'Сообщения чата',
                'ordering': ['-created_at'],
            },
        ),
    ]
