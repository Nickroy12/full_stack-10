"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  FileText,
  CreditCard,
  Settings,
  StickyNotePlus,
  CookingPot,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

// Unified Navigation Links
const navLinks = [
  { icon: Home, href: "/dashboard/chef/recipe", name: "Dashboard", exact: true },
  { icon: StickyNotePlus, href: "/dashboard/chef/recipe/new", name: "Add recipe" },
  { icon: CookingPot, href: "/dashboard/chef/recipe/my", name: "My recipe" },
  { icon: FileText, href: "/dashboard/chef/recipe/Favourite", name: "Favour recipe" },
  { icon: CreditCard, href: "/dashboard/billing", name: "Billing" },
  { icon: Settings, href: "/dashboard/profile", name: "Profile" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const userImage = session?.user?.image;

  const SidebarContent = () => (
    <div className="flex flex-col h-full w-full text-foreground">
      {/* Profile Section */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
        {userImage ? (
          <Image
            src={userImage}
            width={40}
            height={40}
            alt="profile"
            className="rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
          />
        ) : (
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {session?.user?.name?.charAt(0) || "U"}
          </div>
        )
        }

        <div className="text-sm space-y-1 min-w-0">
          <p className="font-semibold truncate text-zinc-800 dark:text-zinc-200">
            {session?.user?.name || "User"}
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs truncate">
            {session?.user?.email}
          </p>
        </div>
      </div >

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto" >
        {
          navLinks.map((item) => {
            const Icon = item.icon;

            // FIX: If exact is true, only match exact string. 
            // If false, match exact or check if it's a deep sub-route (appending a slash avoids false prefixes)
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  }`}
              >
                <Icon size={18} className={active ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400 dark:text-zinc-500"} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })
        }
      </nav >
    </div >
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 p-4  bg-background" >
        <button onClick={() => setOpen(true)} className="text-zinc-800 dark:text-zinc-200" >
          <Menu size={24} />
        </button>
      </div >

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 border-r border-zinc-200 dark:border-zinc-800 bg-background" >
        <SidebarContent />
      </aside >

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"
          } `}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 dark:bg-black/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
            } `}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-screen w-72 bg-background border-r border-zinc-200 dark:border-zinc-800 text-foreground transform transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"
            } `}
        >
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800" >
            <h2 className="text-zinc-800 dark:text-zinc-200 font-semibold" > Menu </h2>
            <button onClick={() => setOpen(false)} className="text-zinc-600 dark:text-zinc-400" >
              <X size={22} />
            </button>
          </div >

          <SidebarContent />
        </div >
      </div >
    </>
  );
}