import { getAllRecipe } from '@/lib/api/getRecipe'
import { getPayment } from '@/lib/api/payment'
import { getUserSession } from '@/lib/core/sessions'
import Link from 'next/link'
import React from 'react'

const PurchaseInfoPage = async () => {
  // 1. Fetch user session
  const user = await getUserSession()
  
  // 2. Guard clause if user is not logged in
  if (!user || !user.email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-sm">
          <p className="text-red-500 font-medium mb-2">Access Denied</p>
          <p className="text-gray-600">Please log in to view your purchase information.</p>
        </div>
      </div>
    )
  }

  // 3. Fetch payment and recipe data
  const payments = await getPayment(user.email)
  const recipes = await getAllRecipe()

  // 4. Guard clause if the user has no purchases
  if (!payments || payments.length === 0) {
    return (
      <div className="flex min-h-screen w-10/12 mx-auto items-center justify-center bg-background p-4">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md border border-gray-100">
          <div className="text-4xl mb-3">🛒</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Purchases Yet</h2>
          <p className="text-gray-500 text-sm">
            You haven't purchased any recipes yet. Once you make a purchase, it will show up here!
          </p>
        </div>
      </div>
    )
  }

  // 5. Render list of purchases
  return (
    <div className="min-h-screen w-full bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Your Order History</h1>
          <p className="text-sm text-foreground mt-1">
            Showing all purchased recipes for <span className="font-semibold text-foreground">{user.email}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {payments.map((item) => {
            // Find the recipe that matches either by recipeId or by title
            const matchedRecipe = recipes?.find(
              (r) => r._id === item.recipeId || r.title === item.title
            )
            const recipeId = matchedRecipe?._id

            // Dynamic route path based on whether the recipe ID is found
            const cardHref = recipeId ? `/recipes/details/${recipeId}` : '#'

            return (
              <Link
                key={item._id}
                href={cardHref}
                className={`group bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between gap-6 transition-all duration-200 ${
                  recipeId 
                    ? 'hover:shadow-md hover:border-gray-200 cursor-pointer' 
                    : 'cursor-not-allowed opacity-90'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    {/* Title transitions slightly color-wise when card is hovered */}
                    <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors duration-150">
                      {item.title}
                    </h2>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 shrink-0">
                      Success
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-xs text-gray-500 border-t border-gray-50 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Order ID</span>
                      <span className="font-mono px-2 py-0.5 rounded border border-gray-100 max-w-[160px] truncate" title={item._id}>
                        {item._id}
                      </span>
                    </div>

                    {/* Recipe ID Display */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Recipe ID</span>
                      <span className="font-mono px-2 py-0.5 rounded border border-gray-100 max-w-[160px] truncate text-gray-600" title={recipeId || "Not Found"}>
                        {recipeId || "Not Found"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Date</span>
                      <span className="font-medium text-gray-700">
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Amount Paid</span>
                  <p className="text-xl font-black text-green-600">
                    ${parseFloat(item.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PurchaseInfoPage