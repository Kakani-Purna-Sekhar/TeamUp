from django.contrib import admin

from .models import Teammate


@admin.register(Teammate)
class TeammateAdmin(admin.ModelAdmin):
    list_display = ['name', 'college', 'created_at']
    search_fields = ['name', 'college', 'skills']
