"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export const Hero = () => {
  // Animation variants for staggered child elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each child animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 20, delay: 0.3 },
    },
  };

  return (
    <section className="relative w-full bg-white dark:bg-zinc-900 overflow-hidden transition-colors">
      {/* Decorative background culinary grid/ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.15] dark:opacity-[0.08] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content wrapped with motion.div container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 sm:space-y-8 col-span-1 lg:col-span-7 text-center lg:text-left"
          >
            
            {/* Badge Pill */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/50">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">
                রান্না বান্না: Share Your Culinary Magic
              </span>
            </motion.div>

            {/* Main Catchy Heading */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Publish your recipes and <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                inspire food lovers.
              </span>
            </motion.h1>

            {/* Sub-paragraph description */}
            <motion.p variants={itemVariants} className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
              Join the ultimate cooking community at RANNA BANNA. Write, organize, and beautifully publish your homemade dishes for thousands of passionate foodies.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#publish"
                className="w-full sm:w-auto text-center px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 tracking-wide"
              >
                Publish a Recipe
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#explore"
                className="w-full sm:w-auto text-center px-8 py-3.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium rounded-xl transition-colors border border-transparent dark:border-zinc-700/50"
              >
                Explore Dishes
              </motion.a>
            </motion.div>

            {/* Simple Social Proof / Trust Metrics */}
            <motion.div variants={itemVariants} className="pt-6 sm:pt-8 border-t border-zinc-100 dark:border-zinc-800 max-w-md mx-auto lg:mx-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                Featured collection metrics
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-6 font-bold text-zinc-500 dark:text-zinc-400 text-sm">
                <span>10K+ RECIPES</span>
                <span>•</span>
                <span>500+ CHEFS</span>
                <span>•</span>
                <span>MILLIONS FED</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Animated Chef Image */}
          <motion.div 
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end relative"
          >
             <Image src={'/chef.png'} width={700} height={700} alt="chef" priority />
          </motion.div>

        </div>
      </div>
    </section>
  );
};