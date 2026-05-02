from rest_framework import serializers
from .models import ChatMessage


class ChatMessageCreateSerializer(serializers.ModelSerializer):
    # Honeypot: hidden from users, filled by bots
    hp = serializers.CharField(required=False, allow_blank=True, write_only=True, default='')

    class Meta:
        model = ChatMessage
        fields = ['name', 'phone', 'message', 'hp']

    def validate_hp(self, value):
        if value:
            raise serializers.ValidationError('Invalid request.')
        return value

    def validate_message(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Сообщение слишком короткое.')
        return value.strip()

    def create(self, validated_data):
        validated_data.pop('hp', None)
        return super().create(validated_data)
