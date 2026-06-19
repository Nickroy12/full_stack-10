import RecipeCard from '@/ui/RecipeCard'
import React from 'react'


const MyRecipe = async ({ recipes }) => {
  return (
    <div className="p-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          My Recipes ({recipes.length})
        </h2>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default MyRecipe