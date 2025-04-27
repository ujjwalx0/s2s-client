// app/blog/[page]/page.tsx (Dynamic Route for Pagination)

import { getAllPosts } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';

type Props = {
  params: { page: string }; // 'page' is a string from the URL
};

export default async function BlogListing({ params }: Props) {
  // Convert the page param to a number
  const page = parseInt(params.page) || 1; // Default to page 1 if no page is provided
  const { posts, pagination } = await getAllPosts(page); // Get posts for the current page

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">🚀 All Blogs</h1>

      {/* Display Blog Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          <p>No blogs available at the moment.</p>
        )}
      </div>

      {/* Pagination */}
      {pagination?.total > 0 && (
        <Pagination
          currentPage={page} // Current page from URL
          totalPages={pagination.pageCount} // Total pages from pagination info
        />
      )}
    </main>
  );
}
