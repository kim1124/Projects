from django.test import Client
from django.test import TestCase
from django.db import transaction
from django.db.utils import IntegrityError
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse

from .models import Post
from .forms import PostForm

# Create your tests here.

user_model_class = get_user_model()

class PostTest(TestCase):

	def setUp(self):
		self.user = user_model_class()
		self.user.username = "kim1124"
		self.user.set_password("kms737")
		self.user.save()

	def test_add_op(self):
		self.assertEqual(1, 1)

	def test_create_post_by_model(self):
		post = Post()
		with transaction.atomic():
			with self.assertRaises(IntegrityError):
				post.save()
		self.assertIsNone(post.pk)

		user = user_model_class.objects.last()
		post.user = user
		post.content = "Create test post ..."
		post.save()
		self.assertIsNotNone(post.pk)

	def test_create_post_view(self):
		c = Client()

		#url = '/photos/create/'
		url = reverse('photos:create')
		res = c.get(url)

		self.assertEqual(res.status_code, 302)

		c.login(username='kim1124', password='kms737')
		res = c.get(url)
		self.assertEqual(res.status_code, 200)
		self.assertEqual(res.resolver_match.func.__name__, 'create_post')
		self.assertIn('form', res.context)
		self.assertIsInstance(res.context['form'], PostForm)

