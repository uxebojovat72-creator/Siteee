from django.contrib import admin
from django.utils.html import format_html
from .models import PriceCategory, PricePlan


class PricePlanInline(admin.TabularInline):
    model = PricePlan
    extra = 0
    fields = ('order', 'name', 'price', 'unit', 'duration', 'bullets', 'is_hot', 'is_active')
    ordering = ('order',)


@admin.register(PriceCategory)
class PriceCategoryAdmin(admin.ModelAdmin):
    list_display = ('order', 'icon_title', 'key', 'badge', 'plans_count', 'is_active')
    list_display_links = ('icon_title',)
    list_editable = ('order', 'is_active')
    list_filter = ('is_active',)
    ordering = ('order',)
    inlines = [PricePlanInline]

    fieldsets = (
        ('Основное', {
            'fields': ('key', 'icon', 'title', 'note', 'badge', 'photo'),
        }),
        ('Настройки', {
            'fields': ('order', 'is_active'),
        }),
    )

    @admin.display(description='Категория')
    def icon_title(self, obj):
        return format_html('{} {}', obj.icon, obj.title)

    @admin.display(description='Тарифов')
    def plans_count(self, obj):
        total = obj.plans.count()
        active = obj.plans.filter(is_active=True).count()
        if total == active:
            return format_html('<span style="color:#1a7a1a">{}</span>', total)
        return format_html('<span style="color:#1a7a1a">{}</span> / {}', active, total)


@admin.register(PricePlan)
class PricePlanAdmin(admin.ModelAdmin):
    list_display = ('category', 'order', 'name', 'price', 'unit', 'duration', 'is_hot', 'is_active')
    list_filter = ('category', 'is_hot', 'is_active')
    list_editable = ('order', 'price', 'unit', 'is_hot', 'is_active')
    ordering = ('category__order', 'order')
    search_fields = ('name', 'price')
