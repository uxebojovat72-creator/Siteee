import uuid
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        # Drop the old one-way ChatMessage table (test data only, safe to lose)
        migrations.DeleteModel(name='ChatMessage'),

        migrations.CreateModel(
            name='ChatSession',
            fields=[
                ('session_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=200, verbose_name='Имя')),
                ('phone', models.CharField(blank=True, max_length=50, verbose_name='Телефон')),
                ('ip', models.GenericIPAddressField(blank=True, null=True, verbose_name='IP')),
                ('city', models.CharField(blank=True, max_length=100, verbose_name='Город')),
                ('country', models.CharField(blank=True, max_length=10, verbose_name='Страна')),
                ('last_seen', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Последняя активность')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Создан')),
            ],
            options={
                'verbose_name': 'Сессия чата',
                'verbose_name_plural': 'Сессии чата',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='ChatMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='chat.chatsession', verbose_name='Сессия')),
                ('type', models.CharField(choices=[('in', 'Посетитель'), ('out', 'Менеджер')], max_length=3, verbose_name='Тип')),
                ('text', models.TextField(verbose_name='Текст')),
                ('tg_message_id', models.BigIntegerField(blank=True, null=True, verbose_name='TG message_id')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Получено')),
            ],
            options={
                'verbose_name': 'Сообщение',
                'verbose_name_plural': 'Сообщения',
                'ordering': ['created_at'],
            },
        ),
    ]
