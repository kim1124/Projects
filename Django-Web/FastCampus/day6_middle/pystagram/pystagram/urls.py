from django.conf.urls import url
from django.conf.urls import include
from django.contrib import admin
from django.contrib.auth.views import login

from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    url(r'^photos/', include('photos.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^login/$', login, {'template_name': 'login.html'}, name='login_url'),
]

# DEBUG=True 일 때만 동작한다.

urlpatterns += static(
	settings.MEDIA_URL,
	document_root=settings.MEDIA_ROOT,
)