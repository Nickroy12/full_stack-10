import { getSubscription } from "@/lib/api/subscription";
import { getUserSession } from "@/lib/core/sessions";
import React from "react";

const ChefBilling = async () => {
  const user = await getUserSession();

  // ইউজার লগইন না থাকলে অ্যালার্ট (ডার্ক মোড ফ্রেন্ডলি)
  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto mt-10">
        <div className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-400 p-4 rounded shadow-sm">
          <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">
            Please login first to view your billing history.
          </p>
        </div>
      </div>
    );
  }

  const bill = await getSubscription(user.email);

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen transition-colors duration-300">
      {/* হেডার সেকশন */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Billing History</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and view your premium chef subscriptions.</p>
      </div>

      {bill && bill.length > 0 ? (
        // টেবিল কন্টেইনার (ডার্ক মোডে ব্যাকগ্রাউন্ড ও বর্ডার চেঞ্জ হবে)
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/75 dark:bg-gray-700/50 text-sm font-semibold text-gray-600 dark:text-gray-300">
                <th className="px-6 py-4 w-16">#</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-300">
              {bill.map((item, index) => {
                const isActive = (item.status || "Active").toLowerCase() === "active";
                
                return (
                  <tr key={item._id || index} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-400 dark:text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      <span className="capitalize">{item.plansId?.replace('_', ' ') || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.email}</td>
                    <td className="px-6 py-4 text-right">
                      {/* ডাইনামিক স্ট্যাটাস ব্যাজ */}
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border ${
                          isActive
                            ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-800 dark:text-green-400"
                            : "bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                        }`}
                      >
                        <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {item.status || "Active"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* ফাকা স্টেট (No Subscription Found) */
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center bg-white dark:bg-gray-800 shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">No subscriptions</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">You haven't subscribed to any premium plan yet.</p>
        </div>
      )}
    </div>
  );
};

export default ChefBilling;