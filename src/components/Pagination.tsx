// components/Pagination.tsx

import Link from 'next/link';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

const Pagination = ({ currentPage, totalPages, basePath = '/cardsPage' }: PaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <Link
        href={isFirstPage ? "#" : `${basePath}/${currentPage - 1}`}
        className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all ${
          isFirstPage ? 'cursor-not-allowed opacity-50' : ''
        }`}
        aria-disabled={isFirstPage}
      >
        Previous
      </Link>

      <span className="text-lg font-medium text-gray-700">
        {currentPage} / {totalPages}
      </span>

      <Link
        href={isLastPage ? "#" : `${basePath}/${currentPage + 1}`}
        className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all ${
          isLastPage ? 'cursor-not-allowed opacity-50' : ''
        }`}
        aria-disabled={isLastPage}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
