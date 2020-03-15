from django.urls import path
from . import views

app_name = 'recipes'

urlpatterns = [
    path('<int:pk>/comments/', views.CommentListCreateView.as_view(), name='create_comment'),
    path('', views.RecipeListView.as_view(), name='list_recipe'),
    path('<int:pk>/', views.RecipeDetailView.as_view(), name='detail_recipe'),
]
