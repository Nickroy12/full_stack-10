"use client";

import Image from "next/image";
import { Eye, Star, RotateCcw } from "lucide-react"; // RotateCcw আইকনটি ব্যবহার করা হয়েছে রিসেট করার জন্য
import Link from "next/link";
import { updateStatus } from "@/lib/action/status";
import { useRouter } from "next/navigation";

export default function RecipeTable({ recipes = [] }) {
  const router = useRouter();

  // ১. সাধারণ ফিচার টগল (Featured <-> Usual)
  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "featured" ? "usual" : "featured";
    try {
      const result = await updateStatus(id, { status: nextStatus });
      console.log(result, 'updated result');
      router.refresh(); 
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  // ২. রিপোর্ট থেকে আবার ইউজুয়াল (Usual) করার ফাংশন
  const handleDismissReport = async (id) => {
    try {
      const result = await updateStatus(id, { status: 'usual' });
      console.log(result, 'Report dismissed, back to usual');
      router.refresh();
    } catch (error) {
      console.error("Failed to dismiss report:", error);
    }
  };

  return (
    <div className="w-full overflow-x-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
            <th className="p-4 w-24">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Cuisine</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center w-32">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
          {recipes.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-zinc-400">
                No recipes found.
              </td>
            </tr>
          ) : (
            recipes.map((recipe) => {
              const recipeId = typeof recipe._id === "object" ? recipe._id.$oid : recipe._id;
              const status = recipe.status?.toLowerCase() || "usual";
              const isReported = status === "report" || status === "reported";

              return (
                <tr key={recipeId} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                  
                  {/* Recipe Image */}
                  <td className="p-4">
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shrink-0">
                      <Image
                        src={recipe.image || "/placeholder-recipe.jpg"} 
                        alt={recipe.name || "Recipe Image"}
                        fill
                        sizes="56px"
                        className="object-cover"
                        priority={false}
                      />
                    </div>
                  </td>

                  {/* Name & Category */}
                  <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100">
                    <div className="flex flex-col">
                      <span className="text-zinc-900 dark:text-zinc-50 font-semibold">{recipe.name}</span>
                      <span className="text-xs text-zinc-400 font-normal capitalize mt-0.5">
                        {recipe.category || recipe.type || "Snacks"}
                      </span>
                    </div>
                  </td>

                  {/* Cuisine Type */}
                  <td className="p-4">
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium capitalize">
                      {recipe.cuisine || recipe.cuisineType || "General"}
                    </span>
                  </td>

                  {/* Status Indicator */}
                  <td className="p-4 capitalize">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border
                      ${isReported
                        ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20" 
                        : status === "featured" 
                        ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20" 
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-transparent"
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  {/* Operational Controls */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      {/* 1. Show Details View */}
                      <Link
                        href={`/recipes/details/${recipeId}`}
                        title="View Details"
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                      >
                        <Eye size={18} />
                      </Link>

                      {/* 2. Admin Action Button (কন্ডিশনাল চেঞ্জ) */}
                      {isReported ? (
                        // যদি রিপোর্ট থাকে, তবে Usual করার জন্য রিসেট বাটন দেখাবে
                        <button
                          onClick={() => handleDismissReport(recipeId)}
                          title="Dismiss report & make usual"
                          className="text-red-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        >
                          <RotateCcw size={18} />
                        </button>
                      ) : (
                        // স্বাভাবিক অবস্থায় স্টার বাটন দেখাবে
                        <button
                          onClick={() => handleToggleStatus(recipeId, status)}
                          title={status === "featured" ? "Remove from featured" : "Mark as featured"}
                          className={`transition-colors ${
                            status === "featured" 
                              ? "text-amber-500" 
                              : "text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400"
                          }`}
                        >
                          <Star 
                            size={18} 
                            fill={status === "featured" ? "currentColor" : "none"} 
                        />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}