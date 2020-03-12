from django.urls import path, include
from . import views


app_name = 'api_v1'

urlpatterns = [
    path('recipes/', include('recipes.urls', namespace="recipes")),
    path('profiles/<int:pk>', include('profiles.urls', namespace="profiles")),
]
