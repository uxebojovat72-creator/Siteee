from django.contrib import admin
from .models import ChatMessage


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'name', 'phone', 'message_short', 'ip', 'sent_to_telegram')
    list_filter = ('sent_to_telegram', 'created_at')
    search_fields = ('name', 'phone', 'message', 'ip')
    readonly_fields = ('ip', 'sent_to_telegram', 'created_at')
    ordering = ('-created_at',)

    def message_short(self, obj):
        return obj.message[:80]
    message_short.short_description = 'Сообщение'
