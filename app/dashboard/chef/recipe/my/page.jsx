import { getRecipe } from '@/lib/api/recipe'
import React from 'react'
import { Edit, Trash2, MoreVertical } from 'lucide-react'
import MyRecipe from './MyRecipe'
import { getUserSession } from '@/lib/core/sessions'

const Page = async () => {
  const user = await getUserSession()
  const myRecipe = await getRecipe(user.id)
  
 
 
  

  const recipes = Array.isArray(myRecipe) ? myRecipe : [myRecipe]

  return (
   <MyRecipe recipes={recipes} user={user}/>
  )
}

export default Page