import time
from celery import Celery

app = Celery('taskqueue', broker='redis://localhost:6379/0', backend='redis://localhost:6378/0')

@app.task
def add(a, b):
	time.sleep(10)
	return a + b

@app.task
def sum2(value):
	time.sleep(10)
	return sum(value)
