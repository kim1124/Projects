from django.contrib import admin
from photos.models import Post
from photos.models import Coment
from photos.models import Tag

# Register your models here.

class ComentInlineAdmin(admin.StackedInline):
	model = Coment
	extra = 2

class PostAdmin(admin.ModelAdmin):
	list_display = ('id', 'created_at')
	list_display_links = ('id', 'created_at')
	ordering = ('-id', '-created_at')
	inlines = [ComentInlineAdmin]
	list_filter = ('tags',)
	search_fields = ('content', )
	date_hierarchy = 'created_at'

admin.site.register(Tag)
admin.site.register(Post, PostAdmin)
admin.site.register(Coment)