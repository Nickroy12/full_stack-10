import { getAllRecipe } from "@/lib/api/getRecipe";
import RecipeCard from "@/ui/RecipeCard";
import React from "react";

const featurePage = async () => {
  const recipes = await getAllRecipe();
  console.log(recipes.userId , "UserId");

  // Filter recipes where the status is 'featured'
  const featuredRecipes = recipes.filter((recipe) => recipe.status === "featured");

  return (
    <div className="w-10/12 mx-auto p-4">
      <h2 className="text-center text-4xl font-bold text-zinc-950 pb-3" >Featured Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Reverse and map only the featured recipes */}
        {featuredRecipes.reverse().map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default featurePage;