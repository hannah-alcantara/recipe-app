"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IngredientsList() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const [newIngredient, setNewIngredient] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ingredients.length > 0) {
      fetchRecipes(ingredients);
    } else {
      setRecipes([]);
    }
  }, [ingredients]);

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  //useMemo to reduce calls
  const fetchRecipes = async (ingredients) => {
    try {
      setLoading(true);
      const results = await axios.post(
        `${process.env.REACT_APP_API_URL}/recipes/filter/`,
        {
          ingredients,
        }
      );
      setLoading(false);
      setRecipes(results.data);
      console.log(results.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  return (
    <div className='flex w-full max-w-8xl mx-auto overflow-y-auto'>
      <div className='shadow-md bg-gray-100 min-h-screen px-8 md:px-6 py-12 mr-8 w-1/3'>
        <h2 className='text-xl font-bold mb-4'>Ingredients</h2>
        <div className='flex items-center mb-4'>
          <Input
            type='text'
            placeholder='Add an ingredient'
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddIngredient();
              }
            }}
            className='flex-1 mr-4'
          />
          <Button onClick={handleAddIngredient} disabled={loading}>
            {loading ? "Loading..." : "Add"}
          </Button>
        </div>
        <ul className='space-y-2'>
          {ingredients.map((ingredient, index) => (
            <li
              key={index}
              className='flex items-center justify-between bg-white rounded-md px-4 py-2'
            >
              <span>{ingredient}</span>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => handleRemoveIngredient(index)}
              >
                <XIcon className='w-4 h-4' />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Recipe List */}
      <div className='bg-card px-8 md:px-6 py-12 mr-8 flex-1'>
        <h2 className='text-xl font-bold mb-4'>Recipes</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {recipes.length === 0 ? (
            <p className='text-muted-foreground'>
              Add ingredients to see recipes!
            </p>
          ) : (
            recipes.map((recipe) => (
              <div key={recipe.id}>
                <Link to={`/recipes/${recipe.id}`}>
                  <div className='bg-background rounded-lg shadow-md overflow-hidden'>
                    <img
                      src='/placeholder.svg'
                      alt={recipe.image_name}
                      width={300}
                      height={200}
                      className='w-full h-48 object-cover'
                    />
                    <div className='p-4'>
                      <h3 className='text-lg font-bold mb-2'>{recipe.title}</h3>

                      {/* <p className='text-muted-foreground mb-4'>
                    {recipe.ingredients?.map((ingredient, index) => (
                      <span key={index} className='mr-2'>
                        {ingredient}
                      </span>
                    ))}
                  </p> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  );
}
