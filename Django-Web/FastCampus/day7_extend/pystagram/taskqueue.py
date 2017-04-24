import time
from celery import Celery

app = Celery(__name__, broker='redis://localhost:6379/0', backend='redis://localhost:6378/0')

@app.task
def add(a, b):
	time.sleep(5)
	return a + b

@app.task
def sum(values):
	result = values + values
	return result

@app.task
def sum2(values):
	result = sum(values)
	return result