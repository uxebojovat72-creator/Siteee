from rest_framework import serializers
from .models import PriceCategory, PricePlan


class PricePlanSerializer(serializers.ModelSerializer):
    hot = serializers.BooleanField(source='is_hot')

    class Meta:
        model = PricePlan
        fields = ('name', 'price', 'unit', 'duration', 'bullets', 'hot')


class PriceCategorySerializer(serializers.ModelSerializer):
    plans = serializers.SerializerMethodField()

    class Meta:
        model = PriceCategory
        fields = ('key', 'icon', 'title', 'note', 'badge', 'photo', 'plans')

    def get_plans(self, obj):
        active_plans = obj.plans.filter(is_active=True)
        return PricePlanSerializer(active_plans, many=True).data
