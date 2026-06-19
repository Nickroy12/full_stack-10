import React from 'react'
import AddRecipeForm from './AddRecipe'
import { getUserSession } from '@/lib/core/sessions'




const CreateRecipe = async() => {
  const user = await getUserSession()
 

 

  return (
    <AddRecipeForm user={user}/>
  )
}

export default CreateRecipe