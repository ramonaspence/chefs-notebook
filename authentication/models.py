from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

app_name = 'authentication'


class User(AbstractUser):
    pass



# http://docs.djangoproject.com/en/3.0/topics/auth/customizing/#referencing-the-user-model
