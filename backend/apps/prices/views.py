from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from .models import PriceCategory
from .serializers import PriceCategorySerializer


class PriceCategoryListView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PriceCategorySerializer

    def get_queryset(self):
        return PriceCategory.objects.filter(is_active=True).prefetch_related('plans')
