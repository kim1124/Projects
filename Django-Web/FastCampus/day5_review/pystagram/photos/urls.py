from django.conf.urls import url

from .views import show_postlist, show_targetpost, create_photopost, edit_targetpost, delete_targetpost, add_targetpost_recommend

app_name = 'photos'

urlpatterns = [
	url(r'^posts/$', show_postlist, name = 'postlist'),
	url(r'^posts/(?P<pk>[0-9]+)/$', show_targetpost, name = 'targetpost'),
	url(r'^posts/create/$', create_photopost, name = 'createpost'),
	url(r'^posts/(?P<pk>[0-9]+)/edit/$', edit_targetpost, name = 'edittargetpost'),
	url(r'^posts/(?P<pk>[0-9]+)/delete/$', delete_targetpost, name = 'deletetargetpost'),
	url(r'^posts/(?P<pk>[0-9]+)/recommend/$', add_targetpost_recommend, name = 'recommedtargetpost')
]