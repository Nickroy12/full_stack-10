import { getAllRecipe } from '@/lib/api/getRecipe'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PopularRecipe from '@/ui/PopularRecipe'

const Popular = async () => {
  // Fetch all recipes
  const recipes = await getAllRecipe()

  // Sort by likesCount descending and take the top 2
  const topLikedRecipes = recipes
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, 6)

  return (
      <PopularRecipe topLikedRecipes={topLikedRecipes} />
  )
}

export default Popular