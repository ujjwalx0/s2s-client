// src/app/page.tsx

import { getAllPosts } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import ContactSection from '@/components/ContactSection';

export default async function Home() {
  const { posts } = await getAllPosts(1); // Default to page 1 for home

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

      <ContactSection />
    </main>
  );
}
