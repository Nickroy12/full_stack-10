
import { getFilteredRecipes } from "@/lib/api/filter";
import RecipeCard from "@/ui/RecipeCard";
import FilterDropdown from "@/ui/RecipeFilters";

import Link from "next/link";
import React from "react";

const CATEGORY_OPTIONS = ["Main", "Curry", "Spicy", "Dessert", "Snacks"];

const recipePage = async ({ searchParams }) => {
  const params = await searchParams;
  
  const currentPage = parseInt(params.page) || 1;
  const currentCategory = params.category || "";
  const limit = 6;

  // Fetch data directly on the server
  const data = await getFilteredRecipes(currentPage, limit, currentCategory);

  // Filter out reported items on the server
  const visibleRecipes = data.recipes.filter((recipe) => {
    const status = recipe.status?.toLowerCase();
    return status !== "report" && status !== "reported";
  });

  return (
    <div className="w-10/12 mx-auto p-4">
      <h2 className="text-center text-4xl font-bold pb-3">All Recipes</h2>

      {/* Filter Options Container */}
      <div className="flex justify-end mb-6 gap-2 items-center">
        <label className="text-sm font-medium">Filter by:</label>
        
        {/* 2. Replaced the list of Link tags with your Dropdown */}
        <FilterDropdown categories={CATEGORY_OPTIONS} />
      </div>

      {/* Grid Content */}
      {visibleRecipes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No recipes available at the moment.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            {currentPage > 1 ? (
              <Link
                href={`?page=${currentPage - 1}${currentCategory ? `&category=${currentCategory}` : ""}`}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
              >
                Previous
              </Link>
            ) : (
              <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-md text-sm cursor-not-allowed">
                Previous
              </span>
            )}

            <span className="text-sm font-medium">
              Page {currentPage} of {data.totalPages || 1}
            </span>

            {currentPage < data.totalPages ? (
              <Link
                href={`?page=${currentPage + 1}${currentCategory ? `&category=${currentCategory}` : ""}`}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
              >
                Next
              </Link>
            ) : (
              <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-md text-sm cursor-not-allowed">
                Next
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default recipePage;