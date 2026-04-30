from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from .models import Park
from .serializers import ParkSerializer, ParkListSerializer


class ParkListView(ListAPIView):
    queryset = Park.objects.filter(is_active=True)
    serializer_class = ParkListSerializer
    permission_classes = [AllowAny]


class ParkDetailView(RetrieveAPIView):
    queryset = Park.objects.filter(is_active=True)
    serializer_class = ParkSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
