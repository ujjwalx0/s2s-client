import { getAllPosts, getPostBySlug, getPostsByTag } from '@/lib/api';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import BlogCard from '@/components/BlogCard';
import { BlogPost } from '@/types';
import Link from 'next/link';
import ShareAndCopyLinks from '@/components/ShareAndCopyLinks';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || '',
    keywords: post.seo?.metaKeywords || '',
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const imageUrl = post.coverImage?.formats?.large?.url || post.coverImage?.url;
  const fullImageUrl = imageUrl?.startsWith('/')
    ? `${process.env.STRAPI_API_URL}${imageUrl}`
    : imageUrl;

  const publishedDate = post.publishedAt && !isNaN(Date.parse(post.publishedAt))
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Unknown Date';

  const updatedDate =
    post.updatedAt && post.updatedAt !== post.publishedAt
      ? new Date(post.updatedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : null;

  const relatedPostsData = post.seo?.metaKeywords
    ? await getPostsByTag(post.seo.metaKeywords.split(',')[0]?.trim())
    : { posts: [], pagination: {} };

  const relatedPosts = relatedPostsData.posts.filter(p => p.slug !== post.slug);
  const { posts: morePosts } = await getAllPosts(1);
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;
  return (
    <main className="bg-white p-6 rounded-xl  max-w-[900px] mx-auto my-8">
      {/* Responsive Cover Image */}
      {fullImageUrl && (
  <>
    <input type="checkbox" id="image-modal" className="peer hidden" />

    {/* Thumbnail */}
    <label
      htmlFor="image-modal"
      className="block max-w-md mx-auto mb-6 cursor-pointer transition hover:scale-105"
    >
      <img
        src={fullImageUrl}
        alt={post.title}
        className="w-full h-70 object-contain rounded"
      />
    </label>

    {/* Modal */}
    <div className="fixed inset-0 z-50 hidden peer-checked:flex items-center justify-center bg-black/80">
      <label htmlFor="image-modal" className="absolute inset-0 cursor-pointer" />
      <img
        src={fullImageUrl}
        alt={post.title}
        className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl z-10"
      />
      <label
        htmlFor="image-modal"
        className="absolute top-5 right-6 text-white text-3xl font-bold cursor-pointer z-20"
      >
        ✕
      </label>
    </div>
  </>
)}


      <div className="flex justify-between items-start flex-wrap gap-y-4 mb-6">
        <h1 className="text-4xl font-extrabold w-full md:w-auto text-black">{post.title}</h1>
         <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
    <ShareAndCopyLinks postUrl={postUrl} />
  </div>
        {updatedDate && updatedDate !== publishedDate && (
          <span className="text-sm text-right text-gray-400 w-full md:w-auto">
            🛠️ Updated on: {updatedDate}
          </span>
        )}


      </div>
 


      <div className="flex justify-between items-center mb-8 flex-wrap gap-y-4">
        <p className="text-gray-500 text-sm w-full md:w-auto">📅 Published: {publishedDate}</p>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {post.seo?.metaKeywords?.split(',').map(tag => (
            <span
              key={tag.trim()}
              className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Markdown Content - Styled and Containerized */}
      <div className="bg-white p-6 rounded-xl max-w-[900px] mx-auto my-8">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-black mt-8 mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-black border-l-4 border-blue-300 pl-3 py-2 my-6">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold mt-6 mb-2 text-black">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
              ),
              li: ({ children }) => (
                <li className="list-disc list-inside text-gray-700">{children}</li>
              ),
              code: ({ children }) => (
                <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded">{children}</code>
              ),
              pre: ({ children }) => (
                <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto my-6">{children}</pre>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 transition"
                >
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
                <blockquote className="border-l-4 border-blue-400 italic pl-4 text-gray-600 my-4">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="my-8 border-gray-300" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* YouTube Section */}
      {post.youtubeUrl && (
        <section className="mt-16 px-4 sm:px-[5%] md:px-[10%] lg:px-[15%]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-600 text-center">
            🎥 {post.youtubeTitle || 'Watch Video'}
          </h2>
          <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={
                post.youtubeUrl.includes('youtu.be/')
                  ? `https://www.youtube.com/embed/${post.youtubeUrl.split('youtu.be/')[1]?.split('?')[0]}`
                  : post.youtubeUrl
              }
              title={post.youtubeTitle || post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </section>
      )}

      {/* Gallery Images Section */}
      {post.galleryImages && post.galleryImages.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">
            🖼️ {post.imageTitle || 'Gallery'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {post.galleryImages.map((img, index) => (
              <div key={index} className="rounded overflow-hidden shadow">
                <img
                  src={`${process.env.STRAPI_API_URL}${img.url}`}
                  alt={img.alternativeText || `Gallery image ${index + 1}`}
                  className="w-full h-auto object-cover rounded"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">🔗 Related Posts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost: BlogPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}

      {/* More Blogs Section */}
      <section className="mt-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">🆕 Recently Updated Blogs</h2>
          <Link
            href="/cardsPage/1"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {morePosts
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            )
            .slice(0, 3)
            .map((post: BlogPost) => (
              <BlogCard key={post.slug} post={post} />
            ))}
        </div>
      </section>
    </main>
  );
}
