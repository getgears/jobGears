from jobgears.users.models import *


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.OneToOneField('User')

