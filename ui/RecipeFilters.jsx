// @/ui/FilterDropdown.js
"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterDropdown({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";

  const handleChange = (e) => {
    const val = e.target.value;
    if (val) {
      router.push(`?page=1&category=${val}`);
    } else {
      router.push(`?page=1`); // clears filter
    }
  };

  return (
    <select 
      value={currentCategory} 
      onChange={handleChange} 
      className="p-2 border rounded-md"
    >
      <option value="">All Categories</option>
      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
    </select>
  );
}