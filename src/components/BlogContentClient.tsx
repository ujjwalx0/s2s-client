// ✅ File: components/BlogContentClient.tsx (Client Component)
'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useMemo } from 'react';

const ClientSwiperModal = dynamic(() => import('@/components/ClientSwiperModal'), { ssr: false });
const ShareAndCopyLinks = dynamic(() => import('@/components/ShareAndCopyLinks'), { ssr: false });
const MarkdownRenderer = dynamic(() => import('@/components/MarkdownRenderer'), { ssr: false });
const AuthorBadgeWithDate = dynamic(() => import('@/components/AuthorBadgeWithDate'));

interface Props {
  post: any;
  images: { url: string; alt: string }[];
  readingTime: string;
}

export default function BlogContentClient({ post, images, readingTime }: Props) {
  const renderGallery = useMemo(() => {
    if (images.length > 1) {
      return <ClientSwiperModal images={images} />;
    }
    if (images.length === 1) {
      return (
        <div className="w-full max-w-2xl mx-auto mb-7 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-400 shadow-2xl">
          <div className="relative aspect-[16/10] bg-black">
            <Image
              src={images[0].url}
              alt={images[0].alt || ''}
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-xl"
              priority
            />
          </div>
        </div>
      );
    }
    return null;
  }, [images]);

  return (
    <>
      {renderGallery}

      <div className="flex justify-between items-center gap-4 mb-6">
        <div className="w-auto mt-4">
          <ShareAndCopyLinks slug={post.slug} />
        </div>
        <div className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm font-semibold shadow-md">
          ⏱️ {readingTime}
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-start gap-y-2 mb-4">
        <AuthorBadgeWithDate
          name={post.author?.name || 'Unknown'}
          avatarUrl={post.author?.avatar?.url || null}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
        />
      </div>

      {post.seo?.metaKeywords && (
        <div className="flex flex-wrap gap-4 mb-8">
          {post.seo.metaKeywords.split(',').map((tag: string) => (
            <span
              key={tag.trim()}
              className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      <MarkdownRenderer content={post.content || ''} />

      {post.youtubeUrl && (
        <section className="mt-8 px-4 sm:px-[5%] md:px-[10%] lg:px-[15%]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-600 text-center">
            🎥 {post.youtubeTitle || 'Watch Video'}
          </h2>
          <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={
                post.youtubeUrl.includes('youtu.be/')
                  ? `https://www.youtube.com/embed/${post.youtubeUrl
                      .split('youtu.be/')[1]
                      ?.split('?')[0]}`
                  : post.youtubeUrl
              }
              title={post.youtubeTitle || post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </section>
      )}
    </>
  );
}
