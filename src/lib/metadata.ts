import { getPostBySlug } from '@/lib/api';

export async function generateBlogMetadata(slug: string) {
    const locale="en";
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This post could not be found.',
      image: '/default-image.jpg',
    };
  }

  const imageUrl = post.coverImage?.formats?.large?.url || post.coverImage?.url || '/default-image.jpg';
  const fullImageUrl = imageUrl.startsWith('/')
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`
    : imageUrl;

  return {
    title: post.title,
    description: post.excerpt || '',
    image: fullImageUrl,
  };
}
