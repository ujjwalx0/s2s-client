import { getAllPosts } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';

type Props = {
  params: { page: string }; // 'page' is a string from the URL
};

export default async function BlogListing({ params }: Props) {
  const resolvedParams = await params; // ✅ await params first
  const page = parseInt(resolvedParams.page) || 1; // ✅ now safe to access

  const { posts, pagination } = await getAllPosts(page);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">🚀 All Blogs</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          <p>No blogs available at the moment.</p>
        )}
      </div>

      {pagination?.total > 0 && (
        <Pagination
          currentPage={page}
          totalPages={pagination.pageCount}
        />
      )}
    </main>
  );
}
