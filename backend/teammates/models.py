from django.db import models


class Teammate(models.Model):
    name = models.CharField(max_length=200)
    college = models.CharField(max_length=200)
    skills = models.TextField()
    looking_for = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
