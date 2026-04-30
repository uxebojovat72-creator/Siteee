from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from decouple import config


class Command(BaseCommand):
    help = 'Создать суперпользователя-владельца из переменных окружения'

    def handle(self, *args, **options):
        User = get_user_model()
        username = config('OWNER_USERNAME', default='owner')
        password = config('OWNER_PASSWORD', default=None)
        email = config('OWNER_EMAIL', default='')

        if not password:
            self.stderr.write('Ошибка: задайте OWNER_PASSWORD в .env')
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(f'Пользователь «{username}» уже существует.')
            return

        User.objects.create_superuser(username=username, password=password, email=email)
        self.stdout.write(self.style.SUCCESS(f'Суперпользователь «{username}» создан.'))
