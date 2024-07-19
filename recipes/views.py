from .serializers import RecipeSerializer
# from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import Recipe 
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

@api_view(['GET', 'POST'])
def recipe_list(request, format=None):

  if request.method == 'GET':
    #get all recipes
    recipes = Recipe.objects.all()[:10]
    #serialize them
    serializer = RecipeSerializer(recipes, many=True)
    #return json
    return Response(serializer.data)
  
  if request.method == 'POST':
    serializer = RecipeSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

# Individual Recipes
@api_view(['GET', 'POST', "DELETE"])
def recipe_detail(request, id, format=None):

  try:
    recipe = Recipe.objects.get(pk=id)
  except Recipe.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'GET':
    serializer = RecipeSerializer(recipe)
    return Response(serializer.data)
  elif request.method == 'POST':
    serializer = RecipeSerializer(recipe, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
  elif request.method == 'DELETE':
    recipe.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# Filter ingredients
@api_view(['POST'])
def recipe_filter(request):
  ingredients = request.data.get('ingredients', [])
          
  if not ingredients:
    return Response({'error': 'No ingredients provided'}, status=status.HTTP_400_BAD_REQUEST)
  
  query = Q()
  for ingredient in ingredients:
    query &= Q(ingredients__icontains=ingredient)

  recipes = Recipe.objects.filter(query).distinct()[:200]

  serializer = RecipeSerializer(recipes, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)



