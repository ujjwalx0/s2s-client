import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/api';

const BASE_URL = 'https://struggletosuccess.in';

async function getAllBlogUrls(): Promise<MetadataRoute.Sitemap> {
  let page = 1;
  let allPosts: any[] = [];
  let hasMore = true;

  while (hasMore) {
    const { posts, pagination } = await getAllPosts(page);
    allPosts = allPosts.concat(posts);

    if (page >= pagination.pageCount) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allPosts.map((post): MetadataRoute.Sitemap[number] => ({
    url: `${BASE_URL}/stories/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt || post.createdAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogUrls = await getAllBlogUrls();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  return [...staticUrls, ...blogUrls];
}
