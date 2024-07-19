from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
  ingredients = serializers.SerializerMethodField()

  def get_ingredients(self, instance: Recipe) -> list:
    ingredients_str = instance.cleaned_ingredients.strip('[]')
    ingredients_list = ingredients_str.split("', '")
    ingredients_list = [ingredients.strip("'") for ingredients in ingredients_list]
    return ingredients_list
    # return instance.ingredients.split(',')

  class Meta:
    model = Recipe
    fields = ['id', 'title', 'ingredients', 'instructions', 'image_name']
