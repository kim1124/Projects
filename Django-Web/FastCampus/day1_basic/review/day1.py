msg = "안녕하세요~"

"""
class myClass:
	toString = "Kim1124의 커스텀 클래스입니다."

	def getString(self):
		return self.toString

number = 1023
l_number = locals()['number']
print("L number -> ", l_number)

def func():
	number = 221
	print("Function number -> ", number)
	g_number = globals()['number']
	print("Funciton global number -> ", g_number)

func()

myObject = myClass()

"""

class Func(object):
	x = 10
	def __init__(self, value = None):
		self.x = value

	def getX(self):
		return self.x

	def __call__(self):
		return self.x + 10

f = Func(50)
f.getX()