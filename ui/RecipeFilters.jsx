"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const categoriesList = ["Beef", "Chicken", "Dessert", "Vegetarian"]; // আপনার ডাটাবেজের ক্যাটাগরি লিস্ট

export default function RecipeFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState(searchParams.get("search") || "");
  const [selectedCats, setSelectedCats] = useState(
    searchParams.get("categories") ? searchParams.get("categories").split(",") : []
  );

  // ফিল্টার চেঞ্জ হলে URL আপডেট করার ফাংশন
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchText) params.set("search", searchText);
    if (selectedCats.length > 0) params.set("categories", selectedCats.join(","));
    params.set("page", "1"); // ফিল্টার চেঞ্জ হলে সবসময় ১ম পেজে নিয়ে যাবে

    router.push(`?${params.toString()}`);
  }, [searchText, selectedCats, router]);

  // চেকবক্স হ্যান্ডলার
  const handleCategoryChange = (cat) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter((c) => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg space-y-4">
      {/* সার্চ ইনপুট */}
      <input
        type="text"
        placeholder="Search recipes..."
        className="w-full p-2 border border-gray-300 rounded"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* ক্যাটাগরি চেকবক্সসমূহ */}
      <div className="flex flex-wrap gap-4 items-center">
        <span className="font-semibold">Categories:</span>
        {categoriesList.map((cat) => (
          <label key={cat} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCats.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              className="rounded text-orange-500"
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>
    </div>
  );
}