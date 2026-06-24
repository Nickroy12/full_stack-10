import { getAllSubscription } from '@/lib/api/subscription'
import React from 'react'

const Page = async () => {
  const subscription = await getAllSubscription()
  
  console.log(subscription, "subscb")

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto min-h-screen transition-colors duration-200">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Subscription Details
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage and view all active user subscriptions and transactions.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden transition-colors duration-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 table-auto">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Email
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Plan ID
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Trans ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
              {subscription && subscription.length > 0 ? (
                subscription.map((sub) => (
                  <tr key={sub._id} className="hover:bg-gray-50/70 bg-background dark:hover:bg-gray-800/40 transition-colors">
                    {/* Email Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {sub.email}
                    </td>
                    
                    {/* Plan ID Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60">
                        {sub.plansId}
                      </span>
                    </td>
                    
                    {/* Created At Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {sub.createdAt ? new Date(sub.createdAt).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      }) : 'N/A'}
                    </td>
                    
                    {/* Trans ID Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400 dark:text-gray-500 select-all">
                      {sub._id}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    No subscriptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page