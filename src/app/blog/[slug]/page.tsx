import { getPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import ShareAndCopyLinks from '@/components/ShareAndCopyLinks';
import Image from 'next/image';
import ClientSwiperModal from '@/components/ClientSwiperModal';
import AdBanner from '@/components/AdBanner';
import AuthorBadgeWithDate from '@/components/AuthorBadgeWithDate';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
      openGraph: {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      },
      twitter: {
        card: 'summary',
      },
    };
  }

  const imageUrl =
    post.coverImage?.formats?.large?.url || post.coverImage?.url || '';
  const fullImageUrl = imageUrl.startsWith('http')
    ? imageUrl
    : `${process.env.STRAPI_API_URL}${imageUrl}`;

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || '',
    keywords: post.seo?.metaKeywords || '',
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || '',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || '',
      images: [fullImageUrl],
    },
  };
}

const calculateReadingTime = (text: string) => {
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const coverImageUrl =
    post.coverImage?.formats?.large?.url || post.coverImage?.url || '';
  const fullCoverImageUrl = coverImageUrl.startsWith('http')
    ? coverImageUrl
    : `${process.env.STRAPI_API_URL}${coverImageUrl}`;

  const readingTime = calculateReadingTime(post.content || '');

  const images = [];
  if (post.coverImage?.url) {
    images.push({
      url: fullCoverImageUrl,
      alt: post.title,
    });
  }
  if (Array.isArray(post.galleryImages)) {
    images.push(
      ...post.galleryImages.map((img: any) => ({
        url: img.url.startsWith('http') ? img.url : `${process.env.STRAPI_API_URL}${img.url}`,
        alt: img.alternativeText || '',
      }))
    );
  }

  
  return (
    <main className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl max-w-5xl mx-auto mb-2 pt-0">
      <div className="mb-6 mt-0 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-snug tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-2" />
      </div>

      {images.length > 1 ? (
        <ClientSwiperModal images={images} />
      ) : images.length === 1 ? (
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
      ) : null}

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

      {/* Optimized Markdown content */}
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

      {/* <div className="mt-4">
        <AdBanner />
      </div> */}
    </main>
  );
}