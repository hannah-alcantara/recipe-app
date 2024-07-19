from django.core.management.base import BaseCommand
from datasets import load_dataset
from recipes.models import Recipe

class Command(BaseCommand):
    help = 'Load recipes from Hugging Face dataset into the database'

    def handle(self, *args, **kwargs):
        # Load the dataset
        dataset = load_dataset('Hieu-Pham/kaggle_food_recipes')
        recipes = dataset['train']  # Use the appropriate split

        # Iterate and save recipes to the database
        for recipe in recipes:
            Recipe.objects.create(
                title=recipe['Title'],
                ingredients=recipe['Ingredients'],
                instructions=recipe['Instructions'],
                image_name=recipe['Image_Name'],
                cleaned_ingredients=recipe['Cleaned_Ingredients']
            )
            
        #     # Print out a sample of the dataset to inspect its structure
        # for i, recipe in enumerate(recipes):
        #     if i < 2:  # Print the first 5 recipes
        #         print(recipe)
        #     else:
        #         break

        self.stdout.write(self.style.SUCCESS('Successfully loaded recipes'))
