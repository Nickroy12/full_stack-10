import { getRecipe } from '@/lib/api/recipe'
import React from 'react'
import { Edit, Trash2, MoreVertical } from 'lucide-react'
import MyRecipe from './MyRecipe'
import { getUserSession } from '@/lib/core/sessions'

const Page = async () => {
  const user = await getUserSession()
  const myRecipe = await getRecipe(user.id)
  
 
 
  
  // আপনার প্রোভাইড করা ডেটা যদি একটি অ্যারে হয়, তাহলে `myRecipe` ব্যবহার করবেন।
  // এখানে উদাহরণের জন্য একটি ডিফেন্স ব্যাকআপ রাখা হলো।
  const recipes = Array.isArray(myRecipe) ? myRecipe : [myRecipe]

  return (
   <MyRecipe recipes={recipes} user={user}/>
  )
}

export default Page