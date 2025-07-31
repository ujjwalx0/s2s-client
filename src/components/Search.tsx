'use client'; 

import { useState } from 'react';
import { searchPosts } from '../lib/api';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim() === '') return;

    setLoading(true);
    const data = await searchPosts(searchTerm, currentPage);
    setResults(data.posts);
    setTotalPages(data.pagination.pageCount);
    setLoading(false);
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    const data = await searchPosts(searchTerm, page);
    setResults(data.posts);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          className="w-full p-3 pl-10 text-gray-700 bg-gray-200 rounded-md"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="absolute right-2 top-2 text-blue-500">
          🔍
        </button>
      </form>

      {loading && <div className="mt-4 text-center">Loading...</div>}

      {results.length > 0 && (
        <div className="mt-4 space-y-4">
          {results.map((post) => (
            <div key={post.id} className="border-b py-2">
              <h3 className="text-lg font-semibold text-blue-600">
                <a href={`/stories/${post.slug}`}>{post.title}</a>
              </h3>
              <p>{post.excerpt}</p>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && !loading && searchTerm && (
        <div className="mt-4 text-center">No results found for "{searchTerm}"</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
