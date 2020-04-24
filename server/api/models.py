from django.db import models
from authentication.models import User

class Timezone(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='timezones')
    name = models.CharField(max_length=20, blank=True, null=True)
    name_of_city = models.CharField(max_length=20, blank=True, null=True)
    difference_to_GMT = models.IntegerField()

    def __str__(self):
        return self.name

