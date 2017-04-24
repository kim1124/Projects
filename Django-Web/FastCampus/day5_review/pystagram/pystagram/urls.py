"""pystagram URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.views import login as django_login
from django.contrib.auth.views import logout as django_logout

urlpatterns = [
    url(r'^photos/', include('photos.urls')),       # 앱 목록에 등록된 이름
    url(r'^admin/', admin.site.urls),
    url(r'^photos_login/$', django_login, {'template_name' : 'common_login.html'}, name='login_url'),
    url(r'^photos_logout/$', django_logout, {'next_page' : '/photos_login/'}, name='logout_url'),
    url('', include('django.contrib.auth.urls')),
]
