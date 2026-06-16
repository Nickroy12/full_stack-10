'use client'
import React, { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Features", href: "#features" },
    { label: "Customers", href: "#customers" },
    { label: "Pricing", href: "#pricing" },
    { label: "Company", href: "#company" },
  ];

  return (
    <>
      <nav className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Desktop Layout: Using grid ensures absolute centering */}
          <div className="hidden md:grid grid-cols-3 items-center h-16">
            
            {/* Left Column: Logo */}
            <div className="flex justify-start">
              <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
                CUSTOM<span className="text-blue-600">UI</span>
              </span>
            </div>
            
            {/* Center Column: Desktop Menu Links */}
            <div className="flex justify-center gap-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right Column: CTA Actions */}
            <div className="flex justify-end items-center gap-4">
              <a 
                href="#login" 
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                Login
              </a>
              <a
                href="#signup"
                className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Sign Up
              </a>
            </div>
          </div>

          {/* Fallback Mobile Layout: Standard Flexbox split */}
          <div className="flex md:hidden items-center justify-between h-16">
            <div>
              <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
                CUSTOM<span className="text-blue-600">UI</span>
              </span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 focus:outline-none z-50"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Dimmed Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Right Side Slide-in Panel */}
      <div 
        id="mobile-menu"
        className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm h-full bg-white dark:bg-zinc-900 z-40 md:hidden shadow-2xl border-l border-zinc-200 dark:border-zinc-800 p-6 pt-24 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-lg font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
            <a 
              href="#login" 
              onClick={() => setIsOpen(false)}
              className="text-center text-base font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white py-2"
            >
              Login
            </a>
            <a
              href="#signup"
              onClick={() => setIsOpen(false)}
              className="text-center text-base font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </>
  );
};