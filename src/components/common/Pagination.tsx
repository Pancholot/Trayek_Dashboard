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
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={`w-8 h-8 flex items-center justify-center border rounded 
            ${
              currentPage === i + 1
                ? "bg-blue-light-Trayek text-white"
                : "bg-gray-300 text-black"
            }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
