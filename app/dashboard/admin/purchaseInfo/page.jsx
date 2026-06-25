export const dynamic = "force-dynamic";
import { getAllPayment } from '@/lib/api/payment'
import React from 'react'

const PurchaseInfoAdminPage = async () => {
  const payments = await getAllPayment()

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Managing all global customer payments and recipe orders.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-sm transition-colors duration-200">
            <span className="text-gray-500 dark:text-gray-400">Total Transactions: </span>
            <span className="font-bold text-gray-900 dark:text-white">{payments?.length || 0}</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Customer Email</th>
                  <th className="py-4 px-6">Recipe / Item</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-300">
                {!payments || payments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-400 dark:text-gray-500">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  payments.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/70 dark:hover:bg-gray-700/30 transition-colors">
                      {/* Order ID */}
                      <td className="py-4 px-6 font-mono text-xs text-gray-500 dark:text-gray-400 max-w-[120px] truncate" title={item._id}>
                        {item._id}
                      </td>
                      
                      {/* Customer Email */}
                      <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                        {item.email || "N/A"}
                      </td>
                      
                      {/* Item Title */}
                      <td className="py-4 px-6">
                        <span className="bg-gray-100 dark:bg-gray-700 text-foreground text-xs px-2.5 py-1 rounded-md font-medium">
                          {item.title}
                        </span>
                      </td>
                      
                      {/* Date */}
                      <td className="py-4 px-6 text-gray-500 dark:text-gray-400">
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      
                      {/* Amount */}
                      <td className="py-4 px-6 text-right font-semibold text-green-600 dark:text-green-400">
                        ${parseFloat(item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PurchaseInfoAdminPage