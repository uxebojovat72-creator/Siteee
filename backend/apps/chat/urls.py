from django.urls import path
from .views import ChatView, MessagesView, WebhookView

urlpatterns = [
    path('', ChatView.as_view()),
    path('messages/', MessagesView.as_view()),
    path('webhook/', WebhookView.as_view()),
]
