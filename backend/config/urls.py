from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from apps.chat.views import MessagesView, WebhookView

admin.site.site_header = 'Пэйнтлэнд Парк'
admin.site.site_title = 'Управление сайтом'
admin.site.index_title = 'Панель управления'

urlpatterns = [
    path('adminka/', admin.site.urls),
    path('api/parks/', include('apps.parks.urls')),
    path('api/bookings/', include('apps.bookings.urls')),
    path('api/prices/', include('apps.prices.urls')),
    # chat: /api/chat/ → ChatView (POST)
    path('api/chat/', include('apps.chat.urls')),
    # same URL structure as Cloudflare Functions
    path('api/messages/', MessagesView.as_view()),
    path('api/webhook/', WebhookView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
