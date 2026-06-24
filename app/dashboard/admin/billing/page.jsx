import { getAllSubscription } from '@/lib/api/subscription'
import React from 'react'

const Page = async () => {
  const subscription = await getAllSubscription()
  
  console.log(subscription, "subscb")

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Subscription Details
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage and view all active user subscriptions and transactions.
        </p>
      </div>

      {/* Table Container with modern UI styling */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Email
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Plan ID
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Trans ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {subscription && subscription.length > 0 ? (
                subscription.map((sub) => (
                  <tr key={sub._id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Email Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {sub.email}
                    </td>
                    
                    {/* Plan ID Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {sub.plansId}
                      </span>
                    </td>
                    
                    {/* Created At Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sub.createdAt ? new Date(sub.createdAt).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      }) : 'N/A'}
                    </td>
                    
                    {/* Trans ID Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-400 select-all">
                      {sub._id}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
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