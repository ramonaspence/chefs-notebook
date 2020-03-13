from django.urls import path
from . import views

app_name = "profiles"


urlpatterns = [
    path('', views.ProfileCreateView.as_view(), name="profile"),
    path('<int:pk>/', views.ProfileView.as_view(), name='profile_view'),

]
