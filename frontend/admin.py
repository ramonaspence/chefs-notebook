from django.contrib import admin
from .models import Recipe, Ingredient


admin.site.register(Recipe)
admin.site.register(Ingredient)

class IngredientInlineAdmin(admin.ModelAdmin):
    extra = 0
    model = Ingredient

inlines = [IngredientInlineAdmin]
