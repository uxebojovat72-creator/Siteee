from django.contrib import admin
from .models import Park, Activity


class ActivityInline(admin.TabularInline):
    model = Activity
    extra = 1
    fields = ('name', 'price_from', 'price_label', 'min_age', 'order', 'is_active')


@admin.register(Park)
class ParkAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ActivityInline]


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'park', 'price_from', 'price_label', 'min_age', 'order', 'is_active')
    list_filter = ('park', 'is_active')
    list_editable = ('price_from', 'price_label', 'order', 'is_active')
    ordering = ('park', 'order')
