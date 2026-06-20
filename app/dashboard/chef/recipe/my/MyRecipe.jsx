import RecipeCard from '@/ui/RecipeCard'
import Link from 'next/link'
import React from 'react'

const MyRecipe = async ({ recipes }) => {
  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          My Recipes
        </h2>
      </div>

      {/* Conditional Rendering */}
      {recipes && recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.reverse().map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      ) : (
        /* UI Alert Card with Emerald Gradient Button */
        <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 text-amber-500 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-1">
            No Recipes Found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
            You haven't created any recipes yet. Let's add your first delicious dish!
          </p>
          
          {/* Emerald to Green Gradient Button */}
          <Link 
            href="/dashboard/chef/recipe/new" 
            className="px-6 py-2.5 font-medium text-white bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200 text-sm"
          >
            Create First
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyRecipe