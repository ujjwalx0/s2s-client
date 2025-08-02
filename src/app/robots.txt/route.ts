import { NextResponse } from 'next/server';

const BASE_URL = 'https://struggletosuccess.in';

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

User-agent: Mediapartners-Google
Disallow:

Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-news.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
