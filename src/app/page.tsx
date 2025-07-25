// src/app/page.tsx

import { getAllPosts } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import ContactSection from '@/components/ContactSection';

export const metadata = {
  title: 'Struggle to Success | Real Stories, Real Inspiration',
  description:
    'Explore powerful stories of individuals who turned their struggles into success. From IAS aspirants to real-life changemakers — get inspired today!',
  openGraph: {
    title: 'Struggle to Success | Real Stories, Real Inspiration',
    description:
      'Explore powerful stories of individuals who turned their struggles into success. From IAS aspirants to real-life changemakers — get inspired today!',
    url: 'https://struggletosuccess.in',
    siteName: 'Struggle to Success',
    images: [
      {
        url: 'https://struggletosuccess.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Struggle to Success Cover Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://struggletosuccess.in',
  },
};

export default async function Home() {
  const pageNumber = 1;

  // ✅ Same as cardsPage: get pagination data too
  const { posts, pagination } = await getAllPosts(pageNumber);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* 🔥 HERO SECTION */}
      <section className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl p-12 text-center text-white shadow-xl mb-24 overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl z-0"></div>
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Struggle to Success
          </h1>
          <p className="text-lg sm:text-xl font-medium max-w-3xl mx-auto mb-6 text-white/90">
            Real journeys. Honest stories. From UPSC aspirants to fearless changemakers — discover voices that matter.
          </p>
          <a
            href="/cardsPage/1"
            className="inline-block px-8 py-3 bg-white text-indigo-600 font-semibold text-base rounded-full hover:bg-neutral-200 transition shadow-md"
          >
            🌟 Explore Stories
          </a>
        </div>
      </section>

      {/* 📰 BLOG LISTING */}
      <section className="mb-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Latest Blogs
          </h2>
          <a
            href="/cardsPage/1"
            className="text-indigo-600 font-medium hover:underline text-sm"
          >
            View All →
          </a>
        </div>

        {posts?.length === 0 ? (
          <p className="text-neutral-600 dark:text-neutral-300">No blog posts found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* 📬 CONTACT SECTION */}
      <ContactSection />
    </main>
  );
}
