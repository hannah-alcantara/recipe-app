import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  const fetchRecipe = async () => {
    try {
      const results = await axios.get(
        `${process.env.REACT_APP_API_URL}/recipes/${id}`
      );
      setRecipe(results.data);
      console.log("Recipe", results.data);
    } catch (error) {
      console.error("There was an error fetching the recipe!", error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (!recipe.title) return null;

  return (
    <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='space-y-8'>
        <div>
          <h1 className='text-4xl font-bold mb-8'>{recipe.title}</h1>
          <img
            src='/placeholder.svg'
            alt={recipe.image_name}
            className='w-full h-72 object-cover'
          />
        </div>
        <div className='space-y-8'>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>Ingredients</h2>
            <ul className='space-y-2 text-muted-foreground'>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>Instructions</h2>
            <div className='space-y-6'>
              <div className='space-y-4'></div>
              <ol>
                {recipe.instructions.split("\n").map((instruction, index) => (
                  <li key={index} className='text-muted-foreground py-4'>
                    <h3 className='text-lg font-bold text-black pb-2'>
                      Step {index + 1}
                    </h3>
                    {instruction}
                    <br />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
