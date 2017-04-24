from django.utils.deprecation import MiddlewareMixin

class SampleMiddleware(MiddlewareMixin):

	def process_req(self, req):
		req.just_say = 'Hello world !!'

