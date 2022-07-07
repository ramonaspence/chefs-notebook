from django.urls import path
from . import views

app_name = 'recipes'

urlpatterns = [
    path('', views.RecipeListView.as_view(), name='list_recipe'),
    path('user/<int:pk>/', views.RecipeProfileListView.as_view(), name='profile_recipes'),
    path('dashboard/', views.RecipeByFollowersListView.as_view(), name='dashboard'),
    path('<int:pk>/', views.RecipeDetailView.as_view(), name='detail_recipe'),
    path('tags/', views.TagListCreateView.as_view(), name='tag_create'),
    path('<int:pk>/comments/', views.CommentListCreateView.as_view(), name='create_comment'),
    path('comments/<int:pk>/', views.CommentDeleteView.as_view(), name='delete_comment'),
    
    
]
