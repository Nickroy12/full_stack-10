
import { getRecipe } from '@/lib/api/recipe';
import { getUserSession } from '@/lib/core/sessions';
import React from 'react'

const StatePage = async() => {
 const user = await getUserSession()
  const rawRecipe = await getRecipe(user.id);
  
  // নিশ্চিত করা হচ্ছে recipe যেন সবসময় একটি অ্যারে হয়
  const recipe = Array.isArray(rawRecipe) ? rawRecipe : [];
   
  const totalRecipe = recipe.length;

  // ১. status === 'featured' ফিল্টার করে তার লেংথ বের করা হলো
  const totalFeatured = recipe.filter(item => item?.status === 'featured').length;

  // ২. সব রেসিপির likesCount যোগ (sum) করা হলো
  const totalLikes = recipe.reduce((sum, item) => sum + (Number(item?.likesCount) || 0), 0);
  return (
    <div className="p-6 w-full bg-[#0c0c0e] min-h-screen text-gray-100">
      
      <div className="w-full mx-auto">
        <h2 className="text-center text-4xl font-bold  pb-3" > Statics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Card 1: Total Post */}
          <div className="bg-[#16161a] p-6 rounded-2xl flex flex-col justify-center items-center border border-gray-800 shadow-xl transition-all hover:border-gray-700">
            <p className="text-xs font-semibold  text-gray-400 uppercase tracking-wider">Total Post</p>
            <p className="text-3xl font-bold mt-2">{totalRecipe}</p>
          </div>

          {/* Card 2: Total Featured */}
          <div className="bg-[#16161a] p-6 rounded-2xl border flex flex-col justify-center items-center border-gray-800 shadow-xl transition-all hover:border-gray-700">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Featured</p>
            <p className="text-3xl font-bold mt-2">{totalFeatured}</p>
          </div>

          {/* Card 3: Total Likes */}
          <div className="bg-[#16161a] p-6 rounded-2xl border flex flex-col justify-center items-center border-gray-800 shadow-xl transition-all hover:border-gray-700">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Likes</p>
            {/* toLocaleString() বড় সংখ্যাকে কমা (যেমন: 1,234) দিয়ে সুন্দরভাবে দেখাবে */}
            <p className="text-3xl font-bold mt-2">{totalLikes.toLocaleString()}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default StatePage;