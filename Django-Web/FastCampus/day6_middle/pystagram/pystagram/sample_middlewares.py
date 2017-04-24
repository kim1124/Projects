from django.utils.deprecation import MiddlewareMixin
from pystagram.errors import HelloWorldError
from django.shortcuts import render

from raven import Client

client = Client('https://a8635d2c814c4bf5ad170577c06ad5eb:f0913c0efc914d7e96f1914b091d085f@sentry.io/102931')

class SampleMiddleware(MiddlewareMixin):

	# 미들웨어 요청 관리
	def process_request(self, req):
		req.just_say = "Sample middleware"

	# 미들웨어 예외 관리
	def process_exception(self, req, exc):

		if isinstance(exc, HelloWorldError):

			ctx = {
				'error' : exc,
				'status': 500
			}

			#

			return render(req, 'error.html', ctx)