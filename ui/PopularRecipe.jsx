'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 110, damping: 15 } 
  },
}

const PopularRecipe = ({ topLikedRecipes = [] }) => {
  return (
    <div className="p-4 max-w-6xl mx-auto bg-black text-zinc-100">
      <h2 className="text-xl font-bold mb-6 border-l-4 border-emerald-600 pl-3">
        Most Liked Recipes
      </h2>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {topLikedRecipes.map((recipe) => (
          <motion.div
            key={recipe.id || recipe._id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="h-full"
          >
            <Link 
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
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                      No Img
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-semibold text-base text-zinc-100 group-hover:text-emerald-400 transition-colors duration-150 truncate">
                    {recipe.name}
                  </span>
                  <span className="text-xs capitalize text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                    {recipe.category || 'Category'}
                  </span>
                </div>
              </div>

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
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default PopularRecipe