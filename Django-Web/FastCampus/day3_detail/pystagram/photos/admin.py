from django.contrib import admin
from photos.models import Post
from photos.models import Coment
from photos.models import Tag

# Register your models here.

admin.site.register(Tag)
admin.site.register(Post)
admin.site.register(Coment)