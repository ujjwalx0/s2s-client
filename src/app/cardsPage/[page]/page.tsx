import { getAllPosts } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params; // ✅ await here
  const pageNumber = parseInt(page, 10) || 1;

  const { posts, pagination } = await getAllPosts(pageNumber);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white min-h-screen">
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-orange-500 text-transparent bg-clip-text">
          IAS/IPS Aspirants की Real Struggle Stories 🚀
        </h1>
        <p className="text-zinc-400 text-md sm:text-lg mt-4 max-w-2xl mx-auto">
          Padho un logon ke baare mein jo zero se hero bane – jinke sapne bade the aur iraade aur bhi bade. These are not just stories, they're journeys of grit, failure, and comeback!
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
        {posts.length > 0 ? (
          posts.map((post: any) => <BlogCard key={post.id} post={post} />)
        ) : (
          <p className="text-center col-span-full text-zinc-500 text-lg">Koi story available nahi hai is waqt. 🙏</p>
        )}
      </div>

      {pagination?.total > 0 && (
        <div className="mt-16">
          <Pagination currentPage={pageNumber} totalPages={pagination.pageCount} />
        </div>
      )}
    </main>
  );
}
