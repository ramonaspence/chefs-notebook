from django.urls import path, include
from . import views


app_name = 'api_v1'

urlpatterns = [
    path('users/', include('accounts.urls', namespace='accounts')),
    path('recipes/', include('recipes.urls', namespace="recipes")),
    path('profiles/', include('profiles.urls', namespace='create_profile')),

]
