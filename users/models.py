from django.db import models


class User(models.Model):
    active = models.BooleanField(default=True, null=False)
    registered_on = models.DateField(auto_now_add=True)
    email = models.EmailField()
    language = models.CharField(max_length=5, default='en_US')

