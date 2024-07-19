from django.db import models

class Recipe(models.Model):
  title = models.CharField(max_length=200, null=True, blank=True)
  ingredients = models.TextField(null=True, blank=True)
  instructions = models.TextField(null=True, blank=True)
  image_name = models.CharField(max_length=200, null=True, blank=True)
  cleaned_ingredients = models.TextField(null=True, blank=True)

  def __str__(self):
    return self.title


