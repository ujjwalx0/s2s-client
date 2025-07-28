// components/BlogInteractiveParts.tsx
'use client';

import React from 'react';
import ShareAndCopyLinks from '@/components/ShareAndCopyLinks';
import ClientSwiperModal from '@/components/ClientSwiperModal';

interface Props {
  slug: string;
  readingTime: string;
  youtubeUrl?: string;
  youtubeTitle?: string;
  title: string;
}

// Swiper sub-component for rendering image carousels interactively
interface SwiperProps {
  images: Array<{ url: string; alt: string }>;
}

export function Swiper({ images }: SwiperProps) {
  return <ClientSwiperModal images={images} />;
}

export default function BlogInteractiveParts({
  slug,
  readingTime,
  youtubeUrl,
  youtubeTitle,
  title,
}: Props) {
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-6">
        <div className="w-auto mt-4">
          <ShareAndCopyLinks slug={slug} />
        </div>
        <div className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm font-semibold shadow-md">
          ⏱️ {readingTime}
        </div>
      </div>
      {youtubeUrl && (
        <section className="mt-8 px-4 sm:px-[5%] md:px-[10%] lg:px-[15%]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-600 text-center">
            🎥 {youtubeTitle || 'Watch Video'}
          </h2>
          <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={
                youtubeUrl.includes('youtu.be/')
                  ? `https://www.youtube.com/embed/${youtubeUrl
                      .split('youtu.be/')[1]
                      ?.split('?')[0]}`
                  : youtubeUrl
              }
              title={youtubeTitle || title}
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
