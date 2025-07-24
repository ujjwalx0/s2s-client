import { getPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import ShareAndCopyLinks from '@/components/ShareAndCopyLinks';
import Image from 'next/image';
import ClientSwiperModal from '@/components/ClientSwiperModal';

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

const formatDate = (dateString?: string | null) => {
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

  const createdDate = formatDate(post.createdAt);
  const updatedDate = formatDate(post.updatedAt);
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
    <main className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl max-w-5xl mx-auto my-6">
      <div className="mb-6 mt-2 text-center">
  <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-4">
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

      <div className="flex justify-between items-start flex-wrap gap-y-4 mb-6">
        {/* <h1 className="text-4xl font-extrabold w-full md:w-auto text-black">{post.title}</h1> */}
        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
          <ShareAndCopyLinks slug={post.slug} />
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <p className="text-gray-700 text-sm">🛠️ Created: {createdDate}</p>
        {post.updatedAt !== post.createdAt && (
          <p className="text-gray-700 text-sm">🔄 Updated: {updatedDate}</p>
        )}
        <div className="flex justify-end mt-4">
          <div className="backdrop-blur-sm bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-1.5 rounded-full shadow-lg border border-white/10 flex items-center gap-2 text-sm font-semibold">
            ⏱️ {readingTime}
          </div>
        </div>
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

      <div className="prose prose-lg dark:prose-invert max-w-5xl w-full px-4 sm:px-6 lg:px-8 mx-auto text-gray-800 dark:text-gray-200">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-5xl font-bold mt-12 mb-6 tracking-tight leading-tight border-b pb-2 border-gray-300 dark:border-gray-600">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl font-semibold mt-10 mb-4 border-l-4 pl-4 border-gray-300 dark:border-gray-600">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl font-medium mt-8 mb-3">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-5 text-lg leading-relaxed">{children}</p>
            ),
            li: ({ children }) => (
              <li className="mb-2 ml-6 list-disc text-base">{children}</li>
            ),
            code: ({ children }) => (
              <code className="bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 px-2 py-1 rounded text-sm">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-gray-900 text-white text-sm font-mono p-6 rounded-xl shadow-md overflow-x-auto my-8">
                {children}
              </pre>
            ),
            a: ({ href, children }) => {
              const safeHref = typeof href === 'string' && href.startsWith('http') ? href : '#';
              return (
                <a
                  href={safeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition"
                >
                  {children}
                </a>
              );
            },
            img: ({ src, alt }) => {
              if (!src || typeof src !== 'string' || !src.startsWith('http')) return null;
              return (
                <div className="relative w-full max-w-3xl mx-auto my-8 h-[300px] sm:h-[400px] md:h-[450px]">
                  <Image
                    src={src}
                    alt={alt || ''}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                    style={{ objectFit: 'contain' }}
                    className="rounded-xl shadow-xl"
                    priority={false}
                  />
                </div>
              );
            },
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-400 dark:border-gray-500 bg-gray-50 dark:bg-gray-800/50 italic pl-6 py-4 my-6 rounded-md text-gray-700 dark:text-gray-300">
                {children}
              </blockquote>
            ),
            hr: () => <hr className="my-12 border-gray-300 dark:border-gray-600" />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {post.youtubeUrl && (
        <section className="mt-16 px-4 sm:px-[5%] md:px-[10%] lg:px-[15%]">
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
    </main>
  );
}