import React from 'react'

const PricingCards = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Choose Your Cooking Plan
        </h2>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          Unlock more recipe slots and share your culinary masterpieces with the world.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* FREE TIER */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm flex flex-col h-full relative">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Free</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Perfect for getting started.</p>
            <p className="mt-4 flex items-baseline text-zinc-900 dark:text-zinc-50">
              <span className="text-4xl font-extrabold tracking-tight">$0</span>
              <span className="ml-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">/forever</span>
            </p>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6 mb-8 flex-grow">
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>3 Credits</strong> (Upload up to 3 recipes)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Standard community support</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Public recipe viewing</span>
              </li>
            </ul>
          </div>

          <a 
            href="/dashboard"
            className="w-full text-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-200"
          >
            Current Plan
          </a>
        </div>

        {/* PRO TIER (POPULAR / GRADIENT ACTION) */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-8 shadow-xl shadow-emerald-500/10 dark:shadow-emerald-950/30 flex flex-col h-full relative text-white md:scale-105 border-2 border-emerald-400 dark:border-emerald-500">
          <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-yellow-400 text-zinc-900 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
            Most Popular
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold">Pro</h3>
            <p className="mt-2 text-sm text-emerald-100">For active home chefs and foodies.</p>
            <p className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold tracking-tight">$19.00</span>
              <span className="ml-1 text-sm font-semibold text-emerald-100">/month</span>
            </p>
          </div>

          <div className="border-t border-emerald-400/40 pt-6 mb-8 flex-grow">
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="font-bold text-yellow-300">✓</span>
                <span><strong>10 Credits</strong> (Upload up to 10 recipes)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="font-bold text-yellow-300">✓</span>
                <span>Priority queue processing</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="font-bold text-yellow-300">✓</span>
                <span>Ad-free browsing experience</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="font-bold text-yellow-300">✓</span>
                <span>Advanced recipe search filters</span>
              </li>
            </ul>
          </div>

          <a 
            href="/checkout/pro"
            className="w-full text-center bg-white text-emerald-600 rounded-xl px-4 py-3 text-sm font-bold shadow-md hover:bg-zinc-50 transition-all duration-200 transform active:scale-[0.99]"
          >
            Upgrade to Pro
          </a>
        </div>

        {/* PREMIUM TIER */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm flex flex-col h-full relative">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Premium</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Ultimate access for culinary experts.</p>
            <p className="mt-4 flex items-baseline text-zinc-900 dark:text-zinc-50">
              <span className="text-4xl font-extrabold tracking-tight">$49</span>
              <span className="ml-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">/month</span>
            </p>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6 mb-8 flex-grow">
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Unlimited Credits</strong> (Post any recipe)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Verified Chef Badge on profile</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Premium analytics & analytics insights</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>24/7 VIP Dedicated Support</span>
              </li>
            </ul>
          </div>

          <a 
            href="/checkout/premium"
            className="w-full text-center rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-4 py-3 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-200"
          >
            Go Premium
          </a>
        </div>

      </div>
    </div>
  )
}

export default PricingCards