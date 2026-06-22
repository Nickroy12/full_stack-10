import { getAllRecipe } from '@/lib/api/getRecipe'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PopularRecipe from '@/ui/PopularRecipe'

const Popular = async () => {
  // Fetch all recipes
  const recipes = await getAllRecipe()


  const allowedRecipes = recipes.filter((recipe) => {
    const status = recipe.status?.toLowerCase();
    return status !== "report" && status !== "reported";
  });


  const topLikedRecipes = [...allowedRecipes]
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, 6)

  return (
    <PopularRecipe topLikedRecipes={topLikedRecipes} />
  )
}

export default Popular