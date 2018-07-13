# Documentation found at https://docs.locust.io/en/stable/writing-a-locustfile.html

from locust import HttpLocust, TaskSet, task
import random
import string

random1 = ''.join([random.choice(string.ascii_letters + string.digits) for x in range(32)])
random2 = ''.join([random.choice(string.ascii_letters + string.digits) for x in range(32)])
random3 = ''.join([random.choice(string.ascii_letters + string.digits) for x in range(32)])

class MyTaskSet(TaskSet):

    @task(4)
    def hello1(self):
        self.client.get("/api/" + random1)

    @task(3)
    def hello2(self):
        self.client.get("/api/" + random2)

    @task(2)
    def hello3(self):
        self.client.get("/api/" + random3)

    @task(1)
    def health(self):
        self.client.get("/health")

class MyLocust(HttpLocust):
    task_set = MyTaskSet