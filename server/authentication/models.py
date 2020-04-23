from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

# Create User Model.
class User(AbstractUser):
    ROLE_CHOICES = [
        ('USER', 'USER'),
        ('MANAGER', 'MANAGER'),
        ('ADMIN', 'ADMIN'),
    ]
    email = models.EmailField(_("User's Email Address"), unique=True)
    first_name = models.CharField(_("User's First Name"), max_length=20, blank=True, null=True)
    last_name = models.CharField(_("User's Last Name"), max_length=20, blank=True, null=True)
    role = models.CharField(_("Uers's Role"), max_length=10, choices=ROLE_CHOICES, default='USER')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    @property
    def fullname(self):
        return '{} {}'.format(self.first_name, self.last_name)
