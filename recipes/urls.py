from django.urls import path
from . import views

app_name = 'recipes'

urlpatterns = [
    path('tags/', views.TagListCreateView.as_view(), name='tag_create'),
    path('comments/', views.CommentListCreateView.as_view(), name='get_comments'),
    path('comments/<int:pk>/', views.CommentRUDView.as_view(), name='create_comment'),
    path('', views.RecipeListView.as_view(), name='list_recipe'),
    path('user/<int:pk>/', views.RecipeProfileListView.as_view(), name='profile_recipes'),
    path('<int:pk>/', views.RecipeDetailView.as_view(), name='detail_recipe'),
    path('<int:pk>/versions/', views.RecipeListView.as_view(), name='version_recipe'),
]
