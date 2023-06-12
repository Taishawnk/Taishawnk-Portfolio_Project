"""ecom URL Configuration

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
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static #imported to static for our static media resources imgs, videos, mp4 media files in gen this is boiler plate settings 
from django.conf import settings #imports our settings so we could acsess media and the othe setting configs

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),#added this in from documentation urlpaths must add include to the import above for it to work
    path('api/', include('api.urls'))# is saying hey if some visits /api then we want that request to be handled by the url inside of api
]#this is the root or home Route and calls our api

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)#needed to bring this in to set storage functionality of our Medias
