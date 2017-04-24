from django.db import models
from django.conf import settings

# Create your models here.

class BaseStruct(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL)
	content = models.TextField()
	updated_at = models.DateTimeField(auto_now=True)        # 모델의 변화가 있을 때 마다 데이터 업데이트
	created_at = models.DateTimeField(auto_now_add=True)    # 모델이 최초 추가시에만 한번 데이터 업데이트

	class Meta:
		abstract = True                                     # 추상화 클래스. 테이블로 생성되지 않는다.
		ordering = ['-created_at', '-pk']                   # 기본 정렬 정보

class Post(BaseStruct):
	#like = models.ManyToManyField('Like', null=True, blank=True)
	tags = models.ManyToManyField('Tags', null=True, blank=True)
	title = models.CharField(max_length=100)
	locked = models.BooleanField()
	hidden = models.BooleanField()
	passwd = models.CharField(max_length=15, blank=True)
	filepath = models.CharField(max_length=255)

	def __str__(self):
		return '게시글 번호 : {}'.format(self.pk)              # 모델 인스턴스의 PK키 값

class Comment(BaseStruct):
	post = models.ForeignKey('Post', related_name='cmt')    # 글에는 여러개의 댓글이 달릴 수 있다. N : 1 일 때, N 클래스 명칭을 넣어줌.

	def __str__(self):
		return '댓글 번호 : {}'.format(self.pk)               # 코멘트 모델 인스턴스의 PK 값

class Tags(models.Model):
	tagname = models.CharField(max_length=50)

class Like(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL)
	post = models.ForeignKey(Post)
	created_at = models.DateTimeField(auto_now_add=True)

	"""
	post = models.OneToOneField()
	user = models.ForeignKey(settings.AUTH_USER_MODEL)
	like_count = models.IntegerField(default=0)
	created_at = models.DateTimeField(auto_now_add=True)
	"""

	# 추천한 모든 유저의 정보를 리턴한다.
	def getRecommendAllUsers(self):
		pass