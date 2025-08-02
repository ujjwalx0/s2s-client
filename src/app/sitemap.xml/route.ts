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

  const blogUrls = allPosts
    .filter(post => post?.slug)
    .map(post => {
      const lastMod = new Date(post.updatedAt || post.publishedAt || post.createdAt || new Date()).toISOString();
      return `
        <url>
          <loc>${BASE_URL}/stories/${post.slug}</loc>
          <lastmod>${lastMod}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
    });

  const staticUrls = [
    '',
    'about',
    'stories',
    'contact',
  ].map(path => {
    return `
      <url>
        <loc>${BASE_URL}/${path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${path === '' ? 'weekly' : 'monthly'}</changefreq>
        <priority>${path === '' ? 1.0 : 0.7}</priority>
      </url>
    `;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls.join('')}
  ${blogUrls.join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
