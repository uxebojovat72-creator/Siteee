from rest_framework import serializers
from .models import Booking


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('park', 'name', 'phone', 'email', 'people_count', 'desired_date', 'comment')

    def validate_phone(self, value):
        digits = ''.join(c for c in value if c.isdigit())
        if len(digits) < 10:
            raise serializers.ValidationError('Введите корректный номер телефона.')
        return value
