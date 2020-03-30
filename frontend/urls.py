from django.urls import path
from . import views

app_name = 'frontend'


urlpatterns = [

    path('login/', views.IndexView.as_view(), name='login'),
    path('signup/', views.IndexView.as_view(), name='signup'),
    path('', views.IndexView.as_view(), name='index'),
    path('users/', views.IndexView.as_view()),
    path('users/profile/<int:id>/', views.IndexView.as_view()),
    path('profile/', views.IndexView.as_view()),
    path('profile/update/<int:pk>/', views.IndexView.as_view()),
    path('profile/followers/', views.IndexView.as_view()),
    path('profile/following/', views.IndexView.as_view()),
    path('profile/create/', views.IndexView.as_view()),
    path('recipes/', views.IndexView.as_view()),
    path('add/recipe/', views.IndexView.as_view()),
    path('recipes/<int:pk>/', views.IndexView.as_view()),
    path('update/<int:pk>/', views.IndexView.as_view()),


]
