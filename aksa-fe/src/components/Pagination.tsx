export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: number[] = [];
    const maxShown = 5;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxShown - 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <nav
      className="flex items-center flex-wrap justify-between pt-4"
      aria-label="Pagination"
    >
      <span className="text-sm text-foreground">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </span>
      <ul className="inline-flex items-center -space-x-px text-sm h-8">
        <li>
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 h-8 border border-gray-300 rounded-l-lg disabled:opacity-50"
          >
            Previous
          </button>
        </li>
        {getPages().map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 h-8 border border-gray-300 ${
                page === currentPage ? "bg-primary text-white" : ""
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 h-8 border border-gray-300 rounded-r-lg disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
