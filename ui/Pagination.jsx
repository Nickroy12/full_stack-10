"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
      >
        Previous
      </button>

      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
}