"use client"

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const MasterChef = () => {
  return (
    <div className='w-full w-10/12 bg-white mx-auto px-4 py-12 md:py-20 overflow-hidden'>
       <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          
          {/* Left Side: Image Container with Entry & Hover Animation */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center md:justify-start"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
             <motion.div 
               className="relative   cursor-pointer"
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

          {/* Right Side: Content Section with Staggered Slide-Up */}
          <motion.div 
            className="w-full md:w-1/2 space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
             <span className="inline-block text-green-600 font-semibold uppercase tracking-widest text-sm bg-green-50 px-3 py-1 rounded-full animate-pulse">
                Meet Our Master Chef
             </span>
             
             <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                Cooking with Passion, <br />
                Serving with Love
             </h2>
             
             <p className="text-gray-600 leading-relaxed text-base md:text-lg">
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
                    className="flex items-center gap-3 text-gray-700 cursor-pointer"
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                     <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-bold text-sm">
                        ✓
                     </span>
                     <span>{text}</span>
                  </motion.li>
                ))}
             </ul>

             {/* Animated Button */}
             <div className="pt-4">
                <motion.button 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3.5 rounded-full shadow-lg hover:shadow-green-200 shadow-green-100 transition-colors duration-200"
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
  )
}

export default MasterChef