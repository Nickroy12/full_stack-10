export const dynamic = "force-dynamic";
import { getAllRecipe } from '@/lib/api/getRecipe'
import React from 'react'
import RecipeTable from './RecipeTable'

const AccessControlPage = async() => {
    const recipes = await getAllRecipe()
    // console.log(recipes , "reco");
  return (
    <div className='w-10/12 mx-auto'>
        <h2 className="text-center text-4xl font-bold  pb-3">Post ({recipes.length})</h2>
        <RecipeTable recipes={recipes}/>
    </div>
  )
}

export default AccessControlPage