from django.urls import path
from . import views

app_name = 'frontend'


urlpatterns = [
    path('login/', views.IndexView.as_view(), name='login'),
    path('signup/', views.IndexView.as_view(), name='signup'),
    path('', views.IndexView.as_view(), name='index'),
]
