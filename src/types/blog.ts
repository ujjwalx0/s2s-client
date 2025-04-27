import { CoverImage } from './image';
import { SEO } from './seo';
import { GalleryImage } from './gallery';

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  postedAt: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  coverImage: CoverImage;
  seo: SEO;
  imageUrl: string | null;
  tags: string[];
  localizations: any[]; 
  galleryImages: GalleryImage[];
  youtubeUrl?: string | null;
  allowComments?: boolean | null;
  youtubeTitle?: string | null;
  imageTitle?: string | null;
}
