import { getAllRecipe } from "@/lib/api/getRecipe";
import RecipeCard from "@/ui/RecipeCard";
import React from "react";

const recipePage = async () => {
  const recipes = await getAllRecipe();
  console.log(recipes.userId, "UserId");


  const visibleRecipes = recipes.filter((recipe) => {
    const status = recipe.status?.toLowerCase();
    return status !== "report" && status !== "reported";
  });

  return (
    <div className="w-10/12 mx-auto p-4">
      <h2 className="text-center text-4xl font-bold pb-3">All Recipe</h2>
      
      {visibleRecipes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No recipes available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {[...visibleRecipes].reverse().map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default recipePage;