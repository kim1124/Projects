from django.db import models

# Create your models here.
#
# 2016.09.03 : 장고의 모델을 사용하기 위해서는, 생성할 클래스에 장고의 모델 클래스를 상속받는다.

# Post 모델 클래스 => 장고의 모델 클래스를 상속받은 클래스. DB와 1:1 맵핑되며 DB에서는 테이블로 생성된다.
class Post(models.Model):
	name = 'kim1124'  # 모델의 필드로 생성하지 않은 멤버변수는 테이블의 컬럼으로 생성되지 않는다.
	created_at = models.DateTimeField(auto_now_add=True)    # save() 메서드가 실행될 때, 최초에만 자동으로 데이터를 넣어주는 고정옵션.
	updated_at = models.DateTimeField(auto_now=True)        # save() 메서드가 실행될 때마다 자동으로 데이터를 넣어주는 지속옵션.
	content = models.TextField(max_length=500)              # max_length : 최대 입력받을 수 있는 값을 제한하는 옵션.
	tags = models.ManyToManyField('Tag')                    # 파이썬 특성 상 인터프리터가 스캔할 때 시점에 없는 클래스 혹은 객체가 있다면 에러가 발생한다.
															# 문자열이 인자 값으로 들어온다면, 인터프리터가 연결하지 않고 런타임에서 연결한다.

	def __str__(self):
		return '글 번호 {}'.format(self.pk)

	# 모델이 맵핑될 때 메타데이터 설정으로 초기 값을 설정할 수 있다.
	class Meta:
		ordering = ('-created_at', '-pk')

# 관계형을 맺을 때는 n에서 1로
class Coment(models.Model):
	post = models.ForeignKey(Post)                          # 클래스 자체를 인자로 전달함. 전달방향은 n 에서 1
	content = models.TextField(max_length=500)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

class Tag(models.Model):
	name = models.CharField(max_length=40)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

# 모델에 변화가 있을경우, makemigrations -> migrate 작업을 수행한다.