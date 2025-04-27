import { getAllPosts } from '@/lib/api';
import BlogCard from '@/components/BlogCard';

type Props = {
  params: { page: string };
};

export default async function Home({ params }: Props) {
  const page = parseInt(params.page) || 1;
  const { posts, pagination } = await getAllPosts(page);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">

      {/* 🔥 Hero Section - BeyondBooks Vibe */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-xl p-10 text-center shadow-lg mb-12">
        <h1 className="text-5xl font-bold mb-4 leading-tight tracking-tight">
          BeyondBooks
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Real journeys. True struggles. Honest conversations. From IAS dreams to fearless doers — explore what lies beyond books.
        </p>
        <a
          href="/cardsPage/1"
          className="inline-block mt-4 px-6 py-3 bg-white text-indigo-700 font-semibold text-lg rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Explore Stories →
        </a>
      </section>

      {/* 🚀 Latest Blogs Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-3xl font-bold">Latest Blogs</h2>
          <a
            href="/cardsPage/1"
            className="text-indigo-600 font-medium hover:underline "
          >
            View All →
          </a>
        </div>

        {/* Container for Blog Cards */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.slice(0, 4).map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
