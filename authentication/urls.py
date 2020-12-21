from django.urls import path, include
from . import views


app_name = 'authentication'

urlpatterns = [
    # path('', views.UserListView.as_view(), name='users'),
    path('google/', views.GoogleLoginView.as_view(), name='google_login'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    
]
