'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import ShareAndCopyLinks from '@/components/ShareAndCopyLinks';
import AuthorBadgeWithDate from '@/components/AuthorBadgeWithDate';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import AdBanner from '@/components/AdBanner';

const ClientSwiperModal = dynamic(
  () => import('@/components/ClientSwiperModal'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-2xl mx-auto mb-7 overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
        <div className="relative aspect-[16/10] bg-gray-100 animate-pulse" />
      </div>
    ),
  }
);

interface ImageType {
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface AuthorType {
  name?: string | null;
  avatar?: {
    url?: string | null;
  } | null;
}

interface BlogContentProps {
  post: {
    title: string;
    slug: string;
    content: string;
    coverImage?: ImageType | null;
    galleryImages?: ImageType[] | null;
    youtubeUrl?: string | null;
    youtubeTitle?: string | null;
    seo?: {
      metaKeywords?: string | null;
    } | null;
    author?: AuthorType | null;
    createdAt: string;
    updatedAt: string;
  };
  readingTime: string;
}

export default function BlogContent({ post, readingTime }: BlogContentProps) {
  // Filter out null/undefined images and map to proper format
  const images = [
    ...(post.coverImage?.url ? [{
      url: post.coverImage.url,
      alt: post.title,
      width: post.coverImage.width ?? undefined,
      height: post.coverImage.height ?? undefined
    }] : []),
    ...(post.galleryImages 
      ? post.galleryImages
          .filter(img => img?.url)
          .map(img => ({
            url: img.url,
            alt: img.alternativeText || '',
            width: img.width ?? undefined,
            height: img.height ?? undefined
          }))
      : [])
  ];


  return (
    <main className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl max-w-5xl mx-auto mb-2 pt-0">
      <div className="mb-6 mt-2 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-snug tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-2" />
      </div>

      {images.length > 1 ? (
        <ClientSwiperModal images={images} />
      ) : images.length === 1 ? (
        <div className="w-full max-w-2xl mx-auto mb-7 overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
          <div className="relative aspect-[16/10] bg-gray-100">
            <Image
              src={images[0].url}
              alt={images[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              quality={85}
              priority
              className="object-contain rounded-xl"
            />
          </div>
        </div>
      ) : null}

      <div className="flex justify-between items-center gap-4 mb-6">
        <ShareAndCopyLinks slug={post.slug} />
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm font-semibold shadow-md">
          ⏱️ {readingTime}
        </div>
      </div>

      <AuthorBadgeWithDate
        name={post.author?.name || 'Unknown'}
        avatarUrl={post.author?.avatar?.url || null}
        createdAt={post.createdAt}
        updatedAt={post.updatedAt}
      />

      {post.seo?.metaKeywords && (
        <div className="flex flex-wrap gap-4 mb-8">
          {post.seo.metaKeywords.split(',').map((tag) => (
            <span
              key={tag.trim()}
              className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      <MarkdownRenderer content={post.content} />

      {post.youtubeUrl && (
        <section className="mt-8 px-4 sm:px-[5%]">
          <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
            🎥 {post.youtubeTitle || 'Watch Video'}
          </h2>
          <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-gray-100">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${
                post.youtubeUrl.includes('youtu.be/')
                  ? post.youtubeUrl.split('youtu.be/')[1]?.split('?')[0]
                  : post.youtubeUrl.split('v=')[1]?.split('&')[0]
              }`}
              title={post.youtubeTitle || post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </section>
      )}

   
    </main>
  );
}