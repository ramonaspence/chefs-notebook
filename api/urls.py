from django.urls import path, include
from . import views


app_name = 'api_v1'

urlpatterns = [
    path('recipes/', views.RecipesView.as_view({'get':'list', 'post':'create'})),
]
