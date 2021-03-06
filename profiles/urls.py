from django.urls import path
from . import views

app_name = "profiles"


urlpatterns = [
    
    path('', views.ProfileListCreateView.as_view(), name="profile"),  ## this endpoint contains all the profiles, so I can list them out in a 'userlist'
    path('<int:pk>/', views.ProfileDetailView.as_view(), name='profile_detail'), ## this endpoint contains one user's profile, to be seen by someone else
    path('followers/', views.FollowerListView.as_view(), name='list_followers'),
    path('following/', views.FollowingListView.as_view(), name='list_following'),
    path('user/', views.ProfileUpdateView.as_view(), name='user_profile'), ## this endpoint contains the logged in user's profile
    path('connections/', views.ConnectionListCreateAPIView.as_view(), name='connections'),
    path('connections/<int:pk>/', views.ConnectionRetrieveDestroyView.as_view(), name='remove_connections'),

]
