import { getRecipe } from '@/lib/api/recipe'
import React from 'react'
import { Edit, Trash2, MoreVertical } from 'lucide-react'
import MyRecipe from './MyRecipe'

const Page = async () => {
  const userId = 'user_67890abcde'
  const myRecipe = await getRecipe(userId)
  
  // আপনার প্রোভাইড করা ডেটা যদি একটি অ্যারে হয়, তাহলে `myRecipe` ব্যবহার করবেন।
  // এখানে উদাহরণের জন্য একটি ডিফেন্স ব্যাকআপ রাখা হলো।
  const recipes = Array.isArray(myRecipe) ? myRecipe : [myRecipe]

  return (
   <MyRecipe recipes={recipes}/>
  )
}

export default Page