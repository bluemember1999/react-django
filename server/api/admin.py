from django.contrib import admin
from .models import Timezone

class TimezoneAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Timezone._meta.get_fields()]
    readonly_fields = ('id',)

admin.site.register(Timezone, TimezoneAdmin)
