import React from 'react'
import AddRecipeForm from './AddRecipe'
import { getUserSession } from '@/lib/core/sessions'
import { getAllRecipe } from '@/lib/api/getRecipe'
import { HeartCrack } from 'lucide-react'
import Link from 'next/link'
import { getRecipe } from '@/lib/api/recipe'

// Object configuration matched directly from your image snippet
const plan = {
  name: 'Free',
  maxApplicationsPerMonth: 3
}

const CreateRecipe = async () => {
  const user = await getUserSession()
  const recipes = await getRecipe(user.id)

 
 

  const uploadCount = recipes.length
  console.log(uploadCount , "upload");
  const maxLimit = plan.maxApplicationsPerMonth // Derived dynamically from the plan object
  const hasReachedLimit = uploadCount >= maxLimit

  // 2. High-converting, adaptive Upgrade UI when limit is met
  if (hasReachedLimit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-xl mx-auto px-6 py-12 text-center transition-colors duration-300">
        
        {/* Premium Badge & Count Indicator using CSS Circles */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 p-0.5 shadow-lg shadow-green-500/20 dark:shadow-green-500/10">
          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white dark:bg-zinc-950 text-3xl">
            <HeartCrack />
          </div>
          {/* Floating dynamic count bubble */}
          <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md ring-4 ring-white dark:ring-zinc-950">
            {uploadCount}
          </span>
        </div>

        {/* Informative Header Text */}
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
          Recipe Limit Reached
        </h2>
        
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed">
          You\'ve reached your <span className="lowercase">{plan.name}</span> tier limit of <span className="font-semibold text-zinc-900 dark:text-zinc-100">{maxLimit} recipes</span>. Upgrade today to unlock unlimited room for your culinary masterpieces!
        </p>

        {/* CTA Interactive Elements */}
        <div className="w-full space-y-3">
          {/* Primary Premium Action */}
          <Link
            href={"/pricing"}
            className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 hover:from-emerald-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 transition-all duration-200 transform active:scale-[0.99]"
          >
            <span className="group-hover:animate-pulse">⭐</span> Upgrade Plan
          </Link>

          {/* Secondary Action to Dashboard Recipes List */}
          <Link 
            href={"/dashboard/chef/recipe/my"}
            className="flex w-full items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-5 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 focus:outline-none transition-colors duration-200"
          >
            Manage Existing Recipes
          </Link>
        </div>
      </div>
    )
  }

  // 3. Render standard submission flow if under quota limits
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Passing data directly to the form handler */}
      <AddRecipeForm user={user} uploadCount={uploadCount} maxLimit={maxLimit} />
    </div>
  )
}

export default CreateRecipe