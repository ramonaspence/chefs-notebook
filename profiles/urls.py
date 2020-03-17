from django.urls import path
from . import views

app_name = "profiles"


urlpatterns = [
    ## these patterns all point to api endpoints! The urls you see in the app itself are comming from react-
    path('', views.ProfileCreateView.as_view(), name="profile"),
    path('<int:pk>/', views.ProfileView.as_view(), name='profile_view'),
    path('connections/', views.ConnectionListCreateAPIView.as_view(), name='connections')

]
