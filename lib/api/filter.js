import { authHeader } from "../core/server";

// @/lib/api/getRecipe.js
export const getFilteredRecipes = async (page = 1, limit = 6, categories = "") => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"; 
  
  let url = `${baseUrl}/api/recipe/filter?page=${page}&limit=${limit}`;
  if (categories) {
    url += `&categories=${encodeURIComponent(categories)}`;
  }

  // no-store ensures the server fetches fresh data on every request
  const res = await fetch(url, {
    headers:await authHeader()
  }, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch recipes");
  
  return res.json();
};