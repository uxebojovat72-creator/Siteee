from django.contrib import admin
from django.utils.html import format_html
from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'created_at', 'name', 'phone', 'park', 'people_count',
        'desired_date', 'colored_status',
    )
    list_filter = ('status', 'park', 'desired_date')
    readonly_fields = ('created_at',)
    search_fields = ('name', 'phone', 'email', 'comment')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'

    fieldsets = (
        ('Контакты', {
            'fields': ('name', 'phone', 'email'),
        }),
        ('Детали заявки', {
            'fields': ('park', 'people_count', 'desired_date', 'comment'),
        }),
        ('Статус', {
            'fields': ('status', 'created_at'),
        }),
    )

    actions = ['mark_confirmed', 'mark_cancelled']

    @admin.display(description='Статус', ordering='status')
    def colored_status(self, obj):
        colors = {
            Booking.STATUS_NEW: ('#e67e00', '🟡 Новая'),
            Booking.STATUS_CONFIRMED: ('#1a7a1a', '🟢 Подтверждена'),
            Booking.STATUS_CANCELLED: ('#a00', '🔴 Отменена'),
        }
        color, label = colors.get(obj.status, ('#333', obj.status))
        return format_html(
            '<b style="color:{}">{}</b>', color, label
        )

    @admin.action(description='Подтвердить выбранные заявки')
    def mark_confirmed(self, request, queryset):
        updated = queryset.update(status=Booking.STATUS_CONFIRMED)
        self.message_user(request, f'Подтверждено заявок: {updated}')

    @admin.action(description='Отменить выбранные заявки')
    def mark_cancelled(self, request, queryset):
        updated = queryset.update(status=Booking.STATUS_CANCELLED)
        self.message_user(request, f'Отменено заявок: {updated}')
