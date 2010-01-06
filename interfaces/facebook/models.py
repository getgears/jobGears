from jobgears.users.models import User
from django.db import models


class FacebookUser(models.Model):
    user = models.OneToOneField(User)

