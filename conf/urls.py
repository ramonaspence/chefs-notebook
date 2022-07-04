"""conf URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls'), name='login'),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls'), name='registration'),
    path('', include('frontend.urls', namespace='frontend')),
    path('api/v1/', include('api.urls', namespace='api_v1')),



] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
