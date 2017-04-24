from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# Create your views here.

from .forms import PostForm, PostModelForm
from .models import Post
from .models import Like

# show_postlist : 글 목록을 불러오는 함수

def show_postlist(req):
	try:

		page = req.GET.get('page', 1)
		num_pagecount = 10

		obj_posts = Post.objects.order_by('-created_at')
		obj_paging = Paginator(obj_posts, num_pagecount)

		arr_contents = obj_paging.page(page)

	except PageNotAnInteger:
		arr_contents = obj_paging.page(1)
	except EmptyPage:
		arr_contents = []

	#arr_queryset = Post.objects.order_by('-created_at')[(page - 1) * per_page : page * per_page]

	return render(req, 'show_postlist.html', {

		'posts' : arr_contents

	})

# show_targetpost : 특정 글의 내용을 볼 수 있는 함수

def show_targetpost(req, pk):

	post = get_object_or_404(Post, pk = pk)

	return render(req, 'show_targetpost.html',{

		'post' : post

	})

# create_photopost : 글을 작성하는 뷰 함수

#@login_required
def create_photopost(req):

	ctx = {
		'userid' : 'kim1124'
	}

	if not req.user.is_authenticated():
		raise Exception('인증되지 않은 사용자입니다.')

	if req.method == 'GET':

		ctx['form'] = PostForm(initial={'content' : '기본으로 입력되는 문자열입니다.'})

	else:
		# 글 추가 시 필수 입력항목 : 제목 / 본문 / 파일경로

		obj_form = req.POST
		#form_content = PostForm(data = obj_form, initial = {'content' : '본문의 내용이 입력되지 않았습니다.'})

		form_modelfield = PostModelForm(obj_form)

		if form_modelfield.is_valid():

			newpost = form_modelfield.save(commit=False)

			newpost.user = req.user
			newpost.locked = False
			newpost.hidden = False

			newpost.save()

			"""
			모델로 게시글 데이터를 저장하는 경우

			obj_newpost = Post()
			obj_newpost.userid = 'kim1124'
			obj_newpost.title = obj_form['title']
			obj_newpost.passwd = obj_form['passwd']
			obj_newpost.filepath = obj_form['filepath']
			#obj_newpost.content = obj_form['content']
			obj_newpost.content = form_content.cleaned_data['content']
			obj_newpost.locked = False
			obj_newpost.hidden = False

			obj_newpost.full_clean()
			obj_newpost.save()
			"""

			return redirect('photos:postlist')

	return render(req, 'create_post.html', ctx)

# edit_targetpost : 선택된 글을 수정하는 뷰 함수

def edit_targetpost(req, pk):

	obj_editpost = get_object_or_404(Post, pk = pk)

	if req.method == 'GET':
		pass
	else:

		obj_form = req.POST

		obj_editpost.userid = 'kim1124'
		obj_editpost.title = obj_form['title']
		obj_editpost.passwd = obj_form['passwd']
		obj_editpost.filepath = obj_form['filepath']
		obj_editpost.content = obj_form['content']
		obj_editpost.locked = False
		obj_editpost.hidden = False

		obj_editpost.full_clean()

		obj_editpost.save()

		return redirect('photos:targetpost', pk = obj_editpost.pk)

	return render(req, 'edit_targetpost.html', {

		'post' : obj_editpost

	})

# delete targetpost : 선택된 글을 삭제하는 뷰 함수

def delete_targetpost(req, pk):

	obj_delpost = get_object_or_404(Post, pk = pk)

	if req.method == 'GET':
		pass
	else:

		obj_delpost.delete()

		return redirect('photos:postlist')

	return render(req, 'delete_targetpost.html', {

		'post': obj_delpost

	})

# add_targetpost_recommend() : 선택된 글에 추천 카운트를 더하는 함수

@login_required()
def add_targetpost_recommend(req, pk):
	post = get_object_or_404(Post, pk = pk)
	qs = post.like_set.filter(user=req.user)
	did_like = qs.exists()

	if did_like:
		qs.delete()
		res_text = '좋아요 취소'
	else:
		qs.create(post = post, user = req.user)
		res_text = '좋아요'

	return HttpResponse(res_text)

