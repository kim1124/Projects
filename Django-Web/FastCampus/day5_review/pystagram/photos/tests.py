from django.test import TestCase
from django.db import transaction
from django.db.utils import IntegrityError

from django.contrib.auth import get_user_model

from .models import Post

# Create your tests here.

class PostTest(TestCase):

	def test_create_post(self):
		post = Post()
		user = get_user_model()

		#post['userid'] = 'kim1124'
		post['content'] = '테스트 케이스로 작성된 글입니다.'
		post['locked'] = False
		post['hidden'] = False

		with transaction.atomic():
			with self.assertRaises(IntegrityError):
				post.save()

		self.assertIsNone(post.pk)

		post.save()
		self.assertIsNotNone(post.pk)