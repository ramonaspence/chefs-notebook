from django.urls import path
from . import views


app_name = 'accounts'

urlpatterns = [
    path('', views.UserListView.as_view(), name='users'),
]
