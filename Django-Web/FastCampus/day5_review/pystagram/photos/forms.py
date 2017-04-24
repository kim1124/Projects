from django import forms
from django.forms import ValidationError

from .models import Post

class PostForm(forms.Form):
	title = forms.CharField(label='글 제목', widget=forms.TextInput(attrs={'class' : 'cls_form_textfield'}))
	passwd = forms.CharField(label='비밀 번호', required=False, widget=forms.TextInput(attrs={'class' : 'cls_form_textfield'}))
	filepath = forms.CharField(label='파일 경로', widget=forms.TextInput(attrs={'class' : 'cls_form_textfield'}))
	content = forms.CharField(widget=forms.Textarea(attrs={'class' : 'cls_form_content'}), label='')

class PostModelForm(forms.ModelForm):
	title = forms.CharField()
	passwd = forms.CharField(required=False)
	filepath = forms.CharField()
	content = forms.CharField()

	class Meta:
		model = Post
		fields = ('title', 'passwd', 'filepath', 'content',)

	# 폼필드 유효성검사 : clean_폼필드이름 - 단일폼 필드 유효성검사
	def clean_content(self):

		arr_youk = ['바보', '멍청이', '머저리']
		content = self.cleaned_data['content']

		for once_youk in arr_youk:

			if once_youk in content:
				print("앗 걸렸당 데헷 ~")
				str_error = '입력하신 단어는 본문에서 사용할 수 없습니다. 금지어 : {}'.format(once_youk)
				raise ValidationError(str_error)

		return content