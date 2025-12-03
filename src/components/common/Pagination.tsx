import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) {
  const PAGE_WINDOW = 10;

  let windowStart = Math.max(1, currentPage - 4);
  let windowEnd = windowStart + PAGE_WINDOW - 1;

  if (windowEnd > totalPages) {
    windowEnd = totalPages;
    windowStart = Math.max(1, windowEnd - PAGE_WINDOW + 1);
  }

  const pages = [];
  for (let i = windowStart; i <= windowEnd; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {/* Flecha izquierda */}
      {currentPage > 1 && (
        <button
          onClick={() => onChange(currentPage - 1)}
          className="p-2 bg-blue-light-Trayek rounded-md text-white"
        >
          <ArrowBigLeft className="w-5 h-5" />
        </button>
      )}

      {/* Rango de páginas */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`w-8 h-8 flex items-center justify-center border rounded 
            ${
              currentPage === page
                ? "bg-blue-light-Trayek text-white"
                : "bg-gray-300 text-black"
            }`}
        >
          {page}
        </button>
      ))}

      {/* Flecha derecha */}
      {currentPage < totalPages && (
        <button
          onClick={() => onChange(currentPage + 1)}
          className="p-2 bg-blue-light-Trayek rounded-md text-white"
        >
          <ArrowBigRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
