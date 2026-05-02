from django.contrib import admin
from .models import ChatSession, ChatMessage


class ChatMessageInline(admin.TabularInline):
    model = ChatMessage
    extra = 0
    readonly_fields = ('type', 'text', 'tg_message_id', 'created_at')
    can_delete = False


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'name', 'phone', 'ip', 'city', 'country', 'last_seen', 'created_at', 'online_status')
    list_filter = ('country', 'created_at')
    search_fields = ('name', 'phone', 'ip', 'city')
    readonly_fields = ('session_id', 'ip', 'city', 'country', 'last_seen', 'created_at')
    inlines = [ChatMessageInline]

    def online_status(self, obj):
        return '🟢 онлайн' if obj.is_online() else '⚫ оффлайн'
    online_status.short_description = 'Статус'
