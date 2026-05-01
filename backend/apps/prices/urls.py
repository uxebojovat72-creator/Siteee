from django.urls import path
from .views import PriceCategoryListView

urlpatterns = [
    path('', PriceCategoryListView.as_view()),
]
