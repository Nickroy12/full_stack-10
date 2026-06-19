"use client"

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const MasterChef = () => {
  return (
    // 1. This outer wrapper handles the full-width background color
    <div className='w-full bg-white dark:bg-zinc-950 transition-colors duration-300'>
       
       {/* 2. This inner container handles the max-width restriction, centering, and padding */}
       <div className='max-w-6xl mx-auto px-4 py-12 md:py-20 overflow-hidden'>
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
             
             {/* Left Side: Image Container */}
             <motion.div 
               className="w-full md:w-1/2 flex justify-center md:justify-start"
               initial={{ opacity: 0, x: -60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, ease: "easeOut" }}
             >
                <motion.div 
                  className="relative cursor-pointer"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                   <Image 
                     src='/masterchef.png' 
                     width={400} 
                     height={400} 
                     alt="Our Master Chef" 
                     className="object-cover rounded-xl"
                     priority 
                   />
                </motion.div>
             </motion.div>

             {/* Right Side: Content Section */}
             <motion.div 
               className="w-full md:w-1/2 space-y-6"
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
             >
                <span className="inline-block text-green-600 dark:text-green-400 font-semibold uppercase tracking-widest text-sm bg-green-50 dark:bg-green-950/40 px-3 py-1 rounded-full animate-pulse">
                   Meet Our Master Chef
                </span>
                
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-zinc-100 leading-tight">
                   Cooking with Passion, <br />
                   Serving with Love
                </h2>
                
                <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-base md:text-lg">
                   Our Master Chef brings over a decade of world-class culinary experience straight to your table. Combining authentic flavors, farm-fresh ingredients, and flawless techniques, every single dish is crafted to perfection.
                </p>

                {/* Key Features List */}
                <ul className="space-y-4">
                   {[
                     "10+ Years of International Culinary Experience",
                     "100% Fresh, Organic & Hygienic Ingredients",
                     "Exclusive Signature Recipes & Custom Menus"
                   ].map((text, index) => (
                     <motion.li 
                       key={index}
                       className="flex items-center gap-3 text-gray-700 dark:text-zinc-300 cursor-pointer"
                       whileHover={{ x: 8 }}
                       transition={{ type: "spring", stiffness: 300, damping: 15 }}
                     >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold text-sm">
                           ✓
                        </span>
                        <span>{text}</span>
                     </motion.li>
                   ))}
                </ul>

                {/* Animated Button */}
                <div className="pt-4">
                   <motion.button 
                     className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium px-8 py-3.5 rounded-full shadow-lg shadow-green-100 dark:shadow-none transition-all duration-200"
                     whileHover={{ y: -4, scale: 1.02 }}
                     whileTap={{ scale: 0.95 }}
                     transition={{ type: "spring", stiffness: 400, damping: 10 }}
                   >
                      Explore Our Menu
                   </motion.button>
                </div>
             </motion.div>

          </div>
       </div>
    </div>
  )
}

export default MasterChef