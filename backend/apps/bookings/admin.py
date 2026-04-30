from django.contrib import admin
from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'park', 'people_count', 'desired_date', 'status', 'created_at')
    list_filter = ('status', 'park', 'created_at')
    list_editable = ('status',)
    readonly_fields = ('created_at',)
    search_fields = ('name', 'phone', 'email')
    ordering = ('-created_at',)
