import { BlogPost } from '@/types/blog';

const PAGE_SIZE = 6;

function isValidArray(val: any): val is any[] {
  return Array.isArray(val);
}

export async function getAllPosts(page: number = 1) {
  try {
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/api/posts?` +
        `populate[coverImage][populate]=*&` +
        `populate[seo][populate]=*&` +
        `populate[author][populate]=avatar&` + // ✅ Author full data
        `sort[0]=publishedAt:desc&` +
        `filters[publishedAt][$notNull]=true&` +
        `pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`,
      {
        // ⏱️ Optional: Disable cache for always fresh content
        // cache: 'no-store',
      }
    );

    const data = await res.json();
    //console.log('📦 getAllPosts API Response:', JSON.stringify(data, null, 2));

    if (isValidArray(data?.data)) {
      return {
        posts: formatPosts(data.data),
        pagination: data.meta?.pagination || {
          page,
          pageSize: PAGE_SIZE,
          pageCount: 0,
          total: 0,
        },
      };
    }

    console.warn('⚠️ No posts found or unexpected structure');
    return {
      posts: [],
      pagination: { page, pageSize: PAGE_SIZE, pageCount: 0, total: 0 },
    };
  } catch (error) {
    console.error('❌ Error in getAllPosts:', error);
    return {
      posts: [],
      pagination: { page, pageSize: PAGE_SIZE, pageCount: 0, total: 0 },
    };
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/api/posts?` +
        `filters[slug][$eq]=${slug}&` +
        `populate[coverImage][populate]=*&` +
        `populate[galleryImages][populate]=*&` +
        `populate[seo][populate]=*&` +
        `populate[author][populate]=avatar`
    );

    const data = await res.json();
    //console.log('📦 getPostBySlug API Response:', data);

    if (isValidArray(data?.data) && data.data[0]) {
      return formatPost(data.data[0]);
    }

    console.warn('⚠️ Post not found for slug:', slug);
    return null;
  } catch (error) {
    console.error('❌ Error fetching post by slug:', error);
    return null;
  }
}

export async function getPostsByTag(tag: string, page = 1) {
  try {
    const url = `${process.env.STRAPI_API_URL}/api/posts?` +
      `filters[tags][name][$eq]=${tag}&` +
      `populate[coverImage][populate]=*&` +
      `populate[seo][populate]=*&` +
      `populate[author][populate]=avatar&` +
      `sort[0]=publishedAt:desc&` +
      `pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`;

    const res = await fetch(url);
    const data = await res.json();
    //console.log('📦 getPostsByTag API Response:', JSON.stringify(data, null, 2));

    if (isValidArray(data?.data)) {
      return {
        posts: formatPosts(data.data),
        pagination: data.meta?.pagination || {
          page,
          pageSize: PAGE_SIZE,
          pageCount: 0,
          total: 0,
        },
      };
    }

    return {
      posts: [],
      pagination: { page, pageSize: PAGE_SIZE, pageCount: 0, total: 0 },
    };
  } catch (error) {
    console.error('❌ Error fetching posts by tag:', error);
    return {
      posts: [],
      pagination: { page, pageSize: PAGE_SIZE, pageCount: 0, total: 0 },
    };
  }
}

export async function searchPosts(query: string, page = 1) {
  try {
    const url = `${process.env.STRAPI_API_URL}/api/posts?` +
      `filters[$or][0][title][$containsi]=${query}&` +
      `filters[$or][1][content][$containsi]=${query}&` +
      `filters[$or][2][slug][$containsi]=${query}&` +
      `populate[coverImage][populate]=*&` +
      `populate[seo][populate]=*&` +
      `populate[author][populate]=avatar&` +
      `pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`;

    const res = await fetch(url);
    const data = await res.json();
    //console.log('📦 searchPosts API Response:', JSON.stringify(data, null, 2));

    if (isValidArray(data?.data)) {
      return {
        posts: formatPosts(data.data),
        pagination: data.meta?.pagination || {
          page,
          pageSize: PAGE_SIZE,
          pageCount: 0,
          total: 0,
        },
      };
    }

    return {
      posts: [],
      pagination: { page, pageSize: PAGE_SIZE, pageCount: 0, total: 0 },
    };
  } catch (error) {
    console.error('❌ Error in searchPosts:', error);
    return {
      posts: [],
      pagination: { page, pageSize: PAGE_SIZE, pageCount: 0, total: 0 },
    };
  }
}

// ---------------------------
// FORMATTERS
// ---------------------------

function formatPosts(posts: any[]): BlogPost[] {
  if (!Array.isArray(posts)) {
    console.warn('⚠️ formatPosts received invalid posts array:', posts);
    return [];
  }

  return posts.map(formatPost);
}

function getFullImageUrl(url: string | null | undefined) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${process.env.STRAPI_API_URL}${url}`;
}

function formatPost(post: any): BlogPost {
  const attrs = post?.attributes || post || {};
  const coverImageData = attrs?.coverImage?.data?.attributes || post.coverImage || {};
  const seo = attrs?.seo || post.seo || {};
  const slug = attrs?.slug || post.slug || '';

  const publishedAt = attrs?.publishedAt || post?.publishedAt || '';
  const updatedAt = attrs?.updatedAt || post?.updatedAt || '';
  const createdAt = attrs?.createdAt || post?.createdAt || '';
  const postedAt = attrs?.postedAt || post?.postedAt || null;

  const imageUrl = coverImageData?.formats?.medium?.url
    ? getFullImageUrl(coverImageData.formats.medium.url)
    : getFullImageUrl(coverImageData.url);

    const authorWrapper = attrs?.author;
    
    // Handle different possible shapes of author object
    const authorData =
      authorWrapper?.data?.attributes ??
      authorWrapper?.attributes ??
      authorWrapper ??
      null;
    
    // Format final author object with proper avatar extraction
    const avatarRaw = authorData?.avatar;
    
    const author = authorData
      ? {
          name: authorData.name,
          avatar: avatarRaw?.url
            ? {
                url: getFullImageUrl(avatarRaw.url),
                ...avatarRaw,
              }
            : null,
        }
      : null;

  return {
    id: post.id,
    documentId: post?.id?.toString(),
    title: attrs?.title || post.title || '',
    slug,
    excerpt: attrs?.excerpt || post.excerpt || '',
    content: attrs?.content || post.content || '',
    postedAt,
    createdAt,
    updatedAt,
    publishedAt,
    locale: attrs?.locale || post?.locale || 'en',
    coverImage: {
      ...coverImageData,
      formats: coverImageData?.formats || {},
    },
    seo: {
      id: seo?.id || 0,
      metaTitle: seo?.metaTitle || attrs?.title || '',
      metaDescription: seo?.metaDescription || attrs?.excerpt || '',
      metaKeywords: seo?.metaKeywords || '',
      canonicalURL: seo?.canonicalURL || `${process.env.BASE_URL}/blog/${slug}`,
      structuredData: seo?.structuredData || null,
    },
    localizations: attrs?.localizations?.data || post?.localizations || [],
    imageUrl,
    tags:
      attrs?.tags?.data?.map((tag: any) => tag.attributes.name) ||
      post.tags ||
      [],
    galleryImages:
      attrs?.galleryImages?.data?.map((img: any) => img.attributes) ||
      post.galleryImages ||
      [],
    youtubeUrl: attrs?.youtubeUrl || post?.youtubeUrl || null,
    youtubeTitle: attrs?.youtubeTitle || post?.youtubeTitle || null,
    imageTitle: attrs?.imageTitle || post?.imageTitle || null,
    allowComments:
      attrs?.allowComments ?? post?.allowComments ?? null,
    author,
  };
}

