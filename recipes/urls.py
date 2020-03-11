from django.urls import path
from . import views

app_name = 'recipes'

urlpatterns = [
    path('', views.RecipeListView.as_view(), name='list_recipe'),
    path('<int:pk>/', views.RecipeDetailView.as_view(), name='detail_recipe'),
]
