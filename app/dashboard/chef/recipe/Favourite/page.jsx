import { getAllRecipe } from '@/lib/api/getRecipe'
import { getUserSession } from '@/lib/core/sessions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = async () => {
 
    const user = await getUserSession()
    const recipes = await getAllRecipe()

    
    const currentUserId = user?.id || user?._id 

  
    const myLikedRecipes = recipes?.filter((recipe) => 
        recipe.likedBy?.includes(currentUserId)
    ) || [];

    return (
        <div className="min-screen bg-black p-6 w-10/12 mx-auto text-zinc-100">
            <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-4">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    My Liked Recipes
                </h1>
                <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                    Total: {myLikedRecipes.length}
                </span>
            </div>
            
            {myLikedRecipes.length === 0 ? (
                <div className="text-center py-20 border border-neutral-800 bg-neutral-900/20 rounded-2xl">
                    <p className="text-neutral-500 text-sm">আপনি এখনও কোনো রেসিপিতে লাইক দেননি।</p>
                </div>
            ) : (
               
                <div className="grid grid-cols-1 gap-3">
                    {myLikedRecipes.map((recipe) => (
                        <Link key={recipe._id}
                           href={`/recipes/details/${recipe._id}`}
                            className="flex items-center justify-between border border-neutral-800 rounded-xl p-4 bg-neutral-900/50 hover:bg-neutral-900 transition-colors duration-200 shadow-lg group h-full"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                
                                <div className="relative w-24 h-16 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800 flex-shrink-0">
                                    {recipe.image ? (
                                        <Image 
                                            src={recipe.image} 
                                            alt={recipe.name} 
                                            width={140}
                                            height={140}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                                            No Img
                                        </div>
                                    )}
                                </div>
                                
                               
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="font-semibold text-base text-zinc-100 group-hover:text-emerald-400 transition-colors duration-150 truncate capitalize">
                                        {recipe.name}
                                    </span>
                                    <span className="text-xs capitalize text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                                        {recipe.category || 'Category'}
                                    </span>
                                </div>
                            </div>

                            {/* লাইক কাউন্ট ও অ্যানিমেটেড হার্ট আইকন */}
                            <div className="flex items-center gap-1.5 text-emerald-500 font-semibold text-sm md:text-base whitespace-nowrap pl-4 flex-shrink-0">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    fill="currentColor" 
                                    className="w-4 h-4 text-emerald-500 animate-pulse"
                                >
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                                <span>{recipe.likesCount || 0}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Page