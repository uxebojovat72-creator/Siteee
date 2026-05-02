from django.urls import path
from .views import ChatMessageView

urlpatterns = [
    path('', ChatMessageView.as_view()),
]
