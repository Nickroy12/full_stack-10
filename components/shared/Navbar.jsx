'use client';

import { signOut, useSession } from "@/lib/auth-client";
import ThemeToggle from "@/ui/ThemeToogle";

import { ChefHat, Loader2, LogOut, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { FaSpoon } from "react-icons/fa6";
import { toast } from "react-toastify";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile drawer state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop avatar dropdown state
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const dropdownRef = useRef(null);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Browse Recipes", href: "/recipes" },
    { label: "Feature Recipe", href: "/feature" },
  ];

  const dashboardLinks = {
    chef: '/dashboard/chef/recipe',
    admin: '/dashboard/admin/state'
  };

  // ইউজারের রোল অনুযায়ী ডাইনামিক লিঙ্ক নির্ধারণ (ডিফল্ট /dashboard)
  const userRole = session?.user?.role;
  const targetDashboardLink = dashboardLinks[userRole] || '/dashboard';

  const isActive = (path) => pathname === path;

  // Helper function to extract initials
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
     await signOut(); 
     toast.error("Signing out...");
  };

  return (
    <>
      <nav className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Desktop Layout */}
          <div className="hidden md:grid grid-cols-3 items-center h-16">
            
            {/* Left Column: Logo */}
            <div className="flex justify-start">
              <Link href={'/'} className="font-bold text-xl tracking-tight flex items-center text-zinc-900 dark:text-white transition-opacity hover:opacity-90">
                <ChefHat className="mr-2 h-6 w-6 text-green-600 dark:text-green-500" /> Ranna<span className="text-green-600 dark:text-green-500">Banna</span>
              </Link>
            </div>
            
            {/* Center Column: Desktop Menu Links */}
            <div className="flex justify-center gap-8">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-sm font-medium transition-colors relative py-1 ${
                      active
                        ? "text-green-600 dark:text-green-500 font-semibold"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 dark:bg-green-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Column: CTA Actions / Auth State */}
            <div className="flex justify-end items-center gap-4">
              <ThemeToggle />
              
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
              ) : session ? (
                /* Authenticated View: Avatar Dropdown (Desktop) */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-green-600 border-2 border-green-600 text-white flex items-center justify-center text-sm font-bold shadow-sm overflow-hidden relative">
                      {session.user?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={session.user.image} 
                          alt={session.user?.name || "Avatar"} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getInitials(session.user?.name)
                      )}
                    </div>
                    <FaSpoon className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu Container */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-950  dark:border-zinc-800 rounded-xl shadow-lg py-1 z-50 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800/60">
                        <p className="text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">Signed in as</p>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">{session.user?.name || "User"}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{session.user?.email}</p>
                      </div>
                      
                      {/* ডাইনামিক ড্যাশবোর্ড লিঙ্ক */}
                      <Link
                        href={targetDashboardLink}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                        Dashboard
                      </Link>
                      
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      >
                        <Settings className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                        Profile
                      </Link>
                      
                      <hr className="border-zinc-100 dark:border-zinc-800 my-1" />
                      
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Unauthenticated View (Desktop) */
                <>
                  <Link
                    href={"/auth/login"} 
                    className={`text-sm font-medium transition-colors ${
                      isActive("/auth/login")
                        ? "text-green-600 dark:text-green-500 font-semibold"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="text-sm font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Layout Header */}
          <div className="flex md:hidden items-center justify-between h-16">
            <div>
              <Link href={'/'} className="font-bold text-xl flex tracking-tight text-zinc-900 dark:text-white">
                <ChefHat className="mr-2 text-green-600" /> Ranna<span className="text-green-600">Banna</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 focus:outline-none z-50 transition-colors"
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
        {/* Quick Dark Mode Switch inside Mobile Drawer */}
        <div className="absolute top-4 left-6">
          <ThemeToggle />
        </div>

        <div className="flex flex-col space-y-3">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  active
                    ? "text-green-600 dark:text-green-500 bg-green-50/50 dark:bg-green-950/10 font-semibold"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          
          <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            {isPending ? (
              <div className="flex justify-center py-2">
                <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
              </div>
            ) : session ? (
              /* Authenticated Layout (Mobile Fly-out Panel) */
              <div className="flex flex-col gap-1">
                <div className="px-3 py-2 text-base font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800/50 pb-4 mb-2">
                  <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center text-base font-bold shadow-sm shrink-0 overflow-hidden relative">
                    {session.user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={session.user.image} 
                        alt={session.user?.name || "Avatar"} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getInitials(session.user?.name)
                    )}
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">Logged in as</p>
                    <p className="truncate max-w-[180px] font-semibold text-zinc-800 dark:text-zinc-200">{session.user?.name || "User"}</p>
                  </div>
                </div>

                {/* ডাইনামিক ড্যাশবোর্ড লিঙ্ক (মোবাইল) */}
                <Link
                  href={targetDashboardLink}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5 text-zinc-400" />
                  Dashboard
                </Link>

                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Settings className="h-5 w-5 text-zinc-400" />
                  Profile
                </Link>

                <hr className="border-zinc-100 dark:border-zinc-800 my-2" />

                <button 
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 rounded-lg flex items-center gap-3 transition-colors text-left"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            ) : (
              /* Unauthenticated View (Mobile Links) */
              <div className="flex flex-col gap-3">
                <Link 
                  href={'/auth/login'} 
                  onClick={() => setIsOpen(false)}
                  className={`text-center text-base font-medium py-2.5 rounded-xl transition-colors border border-zinc-200 dark:border-zinc-800 ${
                    isActive("/auth/login")
                      ? "text-green-600 dark:text-green-500 font-semibold bg-zinc-50 dark:bg-zinc-800"
                      : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-base font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};