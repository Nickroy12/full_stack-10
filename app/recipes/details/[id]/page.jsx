import { getRecipeById } from '@/lib/api/recipe'
import { getUserSession } from '@/lib/core/sessions'
import LikeButton from '@/ui/LikeButton'
import React from 'react'

const DetailsPage = async ({ params }) => {
  const { id } = await params
  const recipe = await getRecipeById(id)
  const user = await getUserSession()

  // user সেশন null বা undefined হলেও যেন ক্র্যাশ না করে সেজন্য অপশনাল চেইনিং ব্যবহার করা হয়েছে
  const initialHasLiked = recipe?.likedBy && user?.id ? recipe.likedBy.includes(user.id) : false;

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-500 font-semibold dark:text-red-400">
        Recipe not found!
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Top Section: Hero Card (Image + Quick Info + Actions) */}
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
          
          {/* Image Container */}
          <div className="relative w-full md:w-1/2 h-64 sm:h-80 md:h-auto min-h-[350px]">
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize tracking-wide shadow">
              {recipe.status}
            </span>
          </div>

          {/* Details Content Container */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs uppercase font-medium">
                  {recipe.category}
                </span>
                <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs uppercase font-medium">
                  {recipe.cuisineType} Cuisine
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 capitalize mb-4">
                {recipe.name}
              </h1>
              
              {/* Quick Stats Row using Flex */}
              <div className="flex flex-row justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200 dark:border-gray-700 last:border-0">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Prep Time</span>
                  <span className="text-base font-black text-green-600 dark:text-green-400">{recipe.prepTime}m</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200 dark:border-gray-700 last:border-0">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Likes</span>
                  <span className="text-base font-black text-green-600 dark:text-green-400">{recipe.likesCount}</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center last:border-0">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Difficulty</span>
                  <span className="text-base font-black text-green-600 dark:text-green-400 capitalize">{recipe.difficulty}</span>
                </div>
              </div>
            </div>

            {/* ACTION COMPONENT: Like, Purchase, Report */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
              {/* Like Button */}
              <LikeButton 
                recipeId={id} 
                initialLikes={recipe.likesCount || 0} 
                userId={user?.id || null}
                initialHasLiked={initialHasLiked}
              />

              {/* Purchase Button */}
              <button 
                className="flex-[2] inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm transition shadow-md shadow-green-600/20 dark:shadow-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                Get Premium Recipe
              </button>

              {/* Report Button */}
              <button 
                className="inline-flex items-center justify-center p-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl text-sm transition"
                title="Report an issue"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a1.125 1.125 0 0 0 .917-1.096V4.669c0-.721-.58-1.302-1.3-1.192l-3.376.518a9 9 0 0 1-5.717-.741l-.109-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Section: Ingredients & Instructions (Flex Layout) */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Ingredients Box */}
          <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-green-600 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-600"></span> Ingredients
            </h2>
            <ul className="flex flex-col gap-3 text-gray-600 dark:text-gray-300 text-sm">
              {recipe.ingredients?.split('\n').map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Box */}
          <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-green-600 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-600"></span> How to Cook
            </h2>
            <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {recipe.instructions?.split('\n').map((step, index) => {
                if (step.startsWith('Step')) {
                  return (
                    <h3 key={index} className="text-sm font-bold text-green-600 dark:text-green-400 pt-3 first:pt-0 flex items-center gap-1">
                      {step}
                    </h3>
                  )
                }
                return (
                  <p key={index} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                    {step}
                  </p>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DetailsPage;