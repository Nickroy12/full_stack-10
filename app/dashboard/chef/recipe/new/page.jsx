import React from 'react'
import AddRecipeForm from './AddRecipe'
import { getUserSession } from '@/lib/core/sessions'
import { getRecipe } from '@/lib/api/recipe'


const CreateRecipe = async() => {
  const user = await getUserSession()
  const dis = await getRecipe()

  console.log(dis , "deas")

  return (
    <AddRecipeForm user={user}/>
  )
}

export default CreateRecipe