// src/app/blog/[slug]/page.tsx

import { getAllPosts, getPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import ShareAndCopyLinks from '@/components/ShareAndCopyLinks';
import SwiperModal from '@/components/SwiperModal';

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
      keywords: '',
      openGraph: {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found.',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
      },
    };
  }

  const imageUrl = post.coverImage?.formats?.large?.url || post.coverImage?.url || '';

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || '',
    keywords: post.seo?.metaKeywords || '',
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || '',
      images: [
        {
          url: imageUrl.startsWith('http') ? imageUrl : `${process.env.STRAPI_API_URL}${imageUrl}`,
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
      images: [
        imageUrl.startsWith('http') ? imageUrl : `${process.env.STRAPI_API_URL}${imageUrl}`,
      ],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const imageUrl = post.coverImage?.formats?.large?.url || post.coverImage?.url;
  const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : `${process.env.STRAPI_API_URL}${imageUrl}`;

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Unknown Date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Unknown Date';
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const createdDate = formatDate(post.createdAt);
  const updatedDate = formatDate(post.updatedAt);
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;

  const images = [];

  if (post.coverImage?.url) {
    images.push({
      url: fullImageUrl,
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

  const calculateReadingTime = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const readingTime = calculateReadingTime(post.content || '');

  return (
    <main className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl max-w-5xl mx-auto my-10">
      {/* Images */}
      {images.length > 1 ? (
        <SwiperModal images={images} />
      ) : images.length === 1 ? (
        <div className="w-full max-w-3xl mx-auto mb-7 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-400 shadow-2xl">
          <div className="relative aspect-[21/10] flex justify-center items-center">
            <img
              src={images[0].url}
              alt={images[0].alt || ''}
              className="object-contain w-full h-full transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>
      ) : null}

      {/* Title and Share */}
      <div className="flex justify-between items-start flex-wrap gap-y-4 mb-6">
        <h1 className="text-4xl font-extrabold w-full md:w-auto text-black">{post.title}</h1>
        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
          <ShareAndCopyLinks postUrl={postUrl} />
        </div>
      </div>

      {/* Dates */}
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-gray-500 text-sm">🛠️ Created: {createdDate}</p>
        {post.updatedAt !== post.createdAt && (
          <p className="text-gray-500 text-sm">🔄 Updated: {updatedDate}</p>
        )}
        <div className="flex justify-end mt-4">
          <div className="backdrop-blur-sm bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-1.5 rounded-full shadow-lg border border-white/10 flex items-center gap-2 text-sm font-semibold">
            ⏱️ {readingTime}
          </div>
        </div>
      </div>

      {/* Tags */}
      {post.seo?.metaKeywords && (
        <div className="flex flex-wrap gap-2 mb-8">
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

      {/* Markdown Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold border-l-4 border-blue-300 pl-3 py-2 my-6">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>,
            p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
            li: ({ children }) => <li className="list-disc list-inside">{children}</li>,
            code: ({ children }) => <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded">{children}</code>,
            pre: ({ children }) => <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto my-6">{children}</pre>,
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              <img
                src={src || ''}
                alt={alt || ''}
                className="w-full h-auto object-cover rounded-lg shadow-md max-w-[600px] mx-auto mb-6"
              />
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-400 italic pl-4 text-gray-600 my-4">{children}</blockquote>
            ),
            hr: () => <hr className="my-8 border-gray-300" />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* YouTube Video */}
      {post.youtubeUrl && (
        <section className="mt-16 px-4 sm:px-[5%] md:px-[10%] lg:px-[15%]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-600 text-center">
            🎥 {post.youtubeTitle || 'Watch Video'}
          </h2>
          <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={post.youtubeUrl.includes('youtu.be/')
                ? `https://www.youtube.com/embed/${post.youtubeUrl.split('youtu.be/')[1]?.split('?')[0]}`
                : post.youtubeUrl}
              title={post.youtubeTitle || post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </section>
      )}
    </main>
  );
}
