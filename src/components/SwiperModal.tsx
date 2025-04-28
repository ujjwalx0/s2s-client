'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Image = {
  url: string;
  alt?: string;
};

type Props = {
  images: Image[];
};

export default function SwiperModal({ images }: Props) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-2xl overflow-hidden shadow-xl border border-gray-200"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex justify-center items-center bg-gray-50">
              <img
                src={img.url}
                alt={img.alt || ''}
                className="object-contain max-h-[450px] w-auto h-auto rounded-2xl transition-all duration-300 hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
