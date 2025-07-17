'use client';

import SwiperModal from './SwiperModal';

type Image = {
  url: string;
  alt?: string;
};

export default function ClientSwiperModal({ images }: { images: Image[] }) {
  if (!images || images.length < 2) return null;
  return <SwiperModal images={images} />;
}
