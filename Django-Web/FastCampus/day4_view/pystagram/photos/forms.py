from django import forms
from django.forms import ValidationError

from .models import Post

class PostSimpleForm(forms.Form):
	content = forms.CharField(widget=forms.Textarea, label="게시글 입력", help_text="게시글은 필수 !!")

class PostForm(forms.ModelForm):

	tags = forms.CharField(required=False)

	class Meta:
		model = Post
		fields = ['content', 'tags']

	# clean() 메서드 이후에 동작함.
	def clean_content(self):
		content = self.cleaned_data['content']

		if '바보' in content:
			msg = '바보라는 단어는 사용할 수 없습니다.'
			raise ValidationError(msg)

		return content


	def clean(self):
		content = self.cleaned_data.get('content')

		if content and '띨띨이' in content:
			msg = "금지어가 또 {}".format('띨띨이')
			self.add_error('content', msg)