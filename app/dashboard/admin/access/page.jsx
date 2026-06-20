import { getAllRecipe } from '@/lib/api/getRecipe'
import React from 'react'
import RecipeTable from './RecipeTable'

const AccessControlPage = async() => {
    const recipes = await getAllRecipe()
  return (
    <div className='w-10/12 mx-auto'>
        <h2>AccessControlPage {recipes.length}</h2>
        <RecipeTable recipes={recipes}/>
    </div>
  )
}

export default AccessControlPage