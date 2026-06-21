import { getAllRecipe } from "@/lib/api/getRecipe";
import RecipeCard from "@/ui/RecipeCard";
import React from "react";

const recipePage = async () => {
  const recipes = await getAllRecipe();
  console.log(recipes.userId , "UserId");
  return (
    <div className="w-10/12 mx-auto p-4">
      <h2 className="text-center text-4xl font-bold  pb-3" >All Recipe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.reverse().map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default recipePage;
