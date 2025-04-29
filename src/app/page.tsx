import { getAllPosts } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import ContactSection from '@/components/ContactSection';

type Props = {
  params: { page: string };
};

// Use the async function to properly handle params in the component
export default async function Home({ params }: Props) {
  const pageNumber = parseInt(params.page, 10) || 1; // Ensuring default page 1 if no page param is available
  const { posts } = await getAllPosts(pageNumber);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* 🚀 Hero Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 rounded-2xl p-10 text-center shadow-sm mb-20">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
          Struggle to Success
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
          Real journeys. True struggles. Honest conversations. From IAS dreams to fearless doers — explore what lies beyond books.
        </p>
        <a
          href="/cardsPage/1"
          className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-medium text-base rounded-full hover:bg-indigo-700 transition"
        >
          Explore Stories →
        </a>
      </section>

      {/* 📰 Latest Blogs */}
      <section className="mb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Latest Blogs
          </h2>
          <a
            href="/cardsPage/1"
            className="text-indigo-600 font-medium hover:underline"
          >
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.slice(0, 8).map((post: any) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 🏷️ Categories - Uncomment when dynamic */}
      {/* 
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
          Explore by Topics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/category/${category.slug}`}
              className="block bg-gray-200 dark:bg-neutral-800 px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-gray-300 dark:hover:bg-neutral-700 transition"
            >
              {category.name}
            </a>
          ))}
        </div>
      </section>
      */}

      {/* 📣 Call to Action */}
      <ContactSection />
    </main>
  );
}
