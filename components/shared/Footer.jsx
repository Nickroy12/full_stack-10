'use client';

import React from "react";
import Link from "next/link";
// Lucide icons for UI elements
import { ChefHat, Heart } from "lucide-react";
// React Icons for social media brands
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: "Home", href: "/" },
      { label: "Browse Recipes", href: "/recipes" },
      { label: "Trending Recipes", href: "/trending" },
      { label: "Chefs", href: "/chefs" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Feedback", href: "/feedback" },
    ],
  };

  return (
    <footer className="w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Section: Brand & Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Identity Column */}
          <div className="flex flex-col space-y-4">
            <Link href={'/'} className="font-bold text-xl tracking-tight flex items-center text-zinc-900 dark:text-white">
              <ChefHat className="mr-2 text-green-600" /> Ranna<span className="text-green-600">Banna</span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Publish your recipes, discover delicious meals, and share your culinary magic with food lovers all around the world.
            </p>
            
            {/* Social Icons using react-icons/fa */}
            <div className="flex items-center gap-4 text-zinc-400 dark:text-zinc-500">
              <a href="#" aria-label="Facebook" className="hover:text-green-600 dark:hover:text-green-500 transition-colors">
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-green-600 dark:hover:text-green-500 transition-colors">
                <FaTwitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-green-600 dark:hover:text-green-500 transition-colors">
                <FaInstagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Youtube" className="hover:text-green-600 dark:hover:text-green-500 transition-colors">
                <FaYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-zinc-600 hover:text-green-600 dark:text-zinc-400 dark:hover:text-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-zinc-600 hover:text-green-600 dark:text-zinc-400 dark:hover:text-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-zinc-600 hover:text-green-600 dark:text-zinc-400 dark:hover:text-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Meta */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            &copy; {currentYear} RannaBanna. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> for Food Lovers.
          </p>
        </div>

      </div>
    </footer>
  );
};