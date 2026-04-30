from django.urls import path
from .views import ParkListView, ParkDetailView

urlpatterns = [
    path('', ParkListView.as_view()),
    path('<slug:slug>/', ParkDetailView.as_view()),
]
