"use client";

import React, { useState } from 'react';
import { updateStatus } from '@/lib/action/status'; 
import { useRouter } from 'next/navigation';

export default function ReportButton({ recipeId, currentStatus }) {
  const router = useRouter();
  const [isReporting, setIsReporting] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // মডাল ওপেন/ক্লোজ করার স্টেট

  const isAlreadyReported = currentStatus === 'report' || currentStatus === 'reported';

  const handleReportSubmit = async () => {
    setIsReporting(true);
    try {
      await updateStatus(recipeId, { status: 'report' });
      setIsOpen(false); // মডাল বন্ধ হবে
      router.refresh(); // পেজ রিফ্রেশ করে নতুন স্ট্যাটাস দেখানোর জন্য
    } catch (error) {
      console.error("Failed to report recipe:", error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <>
      {/* মূল রিপোর্ট বাটন (Green-600 থিমের সাথে সামঞ্জস্যপূর্ণ) */}
      <button 
        onClick={() => {
          if (!isAlreadyReported) setIsOpen(true);
        }}
        disabled={isAlreadyReported}
        className={`inline-flex items-center justify-center p-2.5 rounded-xl text-sm transition border
          ${isAlreadyReported
            ? "bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50 cursor-not-allowed"
            : "bg-background hover:bg-gray-50  dark:hover:bg-gray-700/80 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 border-gray-200 dark:border-gray-700"
          } disabled:opacity-60`}
        title={isAlreadyReported ? "Already Reported" : "Report an issue"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill={isAlreadyReported ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a1.125 1.125 0 0 0 .917-1.096V4.669c0-.721-.58-1.302-1.3-1.192l-3.376.518a9 9 0 0 1-5.717-.741l-.109-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
        </svg>
      </button>

      {/* কাস্টম গ্রিন থিম কনফার্মেশন মডাল */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* ব্যাকড্রপ (ডার্ক ওভারলে) */}
          <div className="fixed inset-0  backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)}></div>
          
          {/* মডাল বক্স (Light: bg-white, Dark: bg-gray-800) */}
          <div className="relative bg-background rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-200">
            
            {/* মডাল কন্টেন্ট */}
            <div className="flex items-start gap-4">
              {/* গ্রিন থিম আইকন বক্স */}
              <div className="p-3 bg-green-500 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-full shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white dark:text-gray-100">
                  Report this recipe?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Are you sure you want to flag this recipe? Administrators will check and review this recipe for accuracy.
                </p>
              </div>
            </div>

            {/* অ্যাকশন বাটনসমূহ */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-50 dark:border-gray-700/50">
              {/* ক্যানসেল বাটন */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isReporting}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60 rounded-xl transition"
              >
                Cancel
              </button>
              
              {/* কনফর্ম বাটন (bg-green-600) */}
              <button
                type="button"
                onClick={handleReportSubmit}
                disabled={isReporting}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-green-400 dark:disabled:bg-green-800/50 rounded-xl shadow-md shadow-green-600/10 transition"
              >
                {isReporting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                    Reporting...
                  </>
                ) : (
                  "Confirm Report"
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}