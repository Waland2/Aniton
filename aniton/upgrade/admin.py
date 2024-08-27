from django.contrib import admin

from .models import Upgrade

class UpgradeAdmin(admin.ModelAdmin):
    readonly_fields = ('id', )
    list_display = ('name_eng', 'id', 'money_cost', 'influence_cost', 'profit_ratio_boost', 'passive_income_boost')


admin.site.register(Upgrade, UpgradeAdmin)