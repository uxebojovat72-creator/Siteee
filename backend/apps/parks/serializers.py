from rest_framework import serializers
from .models import Park, Activity


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = (
            'id', 'name', 'description', 'min_age',
            'price_from', 'price_label', 'photo', 'order',
        )


class ParkSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = Park
        fields = (
            'id', 'name', 'slug', 'location',
            'description', 'short_description', 'photo', 'activities',
        )


class ParkListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Park
        fields = ('id', 'name', 'slug', 'location', 'short_description', 'photo')
