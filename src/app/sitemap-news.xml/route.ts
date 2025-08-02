import { getAllPosts } from '@/lib/api';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://struggletosuccess.in';

export async function GET() {
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

  // Filter posts published in last 2 days for Google News (optional)
  // You can extend this or remove to include more posts as per Google News guidelines
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const recentPosts = allPosts.filter(post => new Date(post.publishedAt) > twoDaysAgo);

  const items = recentPosts.map(post => {
    const pubDate = new Date(post.publishedAt || post.createdAt).toISOString();
    return `
      <url>
        <loc>${BASE_URL}/stories/${post.slug}</loc>
        <news:news>
          <news:publication>
            <news:name>StruggleToSuccess</news:name>
            <news:language>en</news:language>
          </news:publication>
          <news:publication_date>${pubDate}</news:publication_date>
          <news:title><![CDATA[${post.title}]]></news:title>
        </news:news>
        <lastmod>${pubDate}</lastmod>
      </url>
    `;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${items.join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
