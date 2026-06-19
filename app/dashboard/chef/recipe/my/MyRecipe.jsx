import { getRecipe } from '@/lib/api/recipe'
import React from 'react'
import Image from 'next/image'
import { Edit, Trash2, MoreVertical } from 'lucide-react'

const MyRecipe = async ({ recipes , user }) => {
  console.log(user , "adv");
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
          <div 
            key={recipe._id} 
            className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            {/* Recipe Image Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Category Badge */}
              <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 shadow-sm capitalize backdrop-blur-sm z-10">
                {recipe.category}
              </span>
            </div>

            {/* Content & Actions */}
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-2 mb-4">
                {/* Name */}
                <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1 capitalize">
                  {recipe.name}
                </h3>
                
                {/* More Action Button */}
                <button 
                  className="p-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  title="More details"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Row: Icons & Secondary info */}
              <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Difficulty: {recipe.difficulty}
                </span>

                <div className="flex items-center gap-1">
                  {/* Edit Button (Changed blue to Emerald Green) */}
                  <button 
                    className="p-2 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    title="Edit recipe"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  {/* Delete Button */}
                  <button 
                    className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    title="Delete recipe"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyRecipe