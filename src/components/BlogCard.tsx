'use client';

import Link from 'next/link';
import type { FC } from 'react';

type BlogPost = {
  title: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
  tags?: string[];
  publishedAt?: string;
  content?: string;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const stripMarkdown = (text: string): string =>
  text
    .replace(/[*_~`>#+-]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .trim();

const BlogCard: FC<{ post: BlogPost }> = ({ post }) => {
  const date = post.publishedAt ? formatDate(post.publishedAt) : '';
  const readingTime = Math.max(Math.ceil((post.content?.length || 400) / 800), 1);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="w-full h-full flex flex-col overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 transition-all duration-200"
>
      {/* Thumbnail */}
      {post.imageUrl && (
        <div className="w-full h-[150px] sm:h-[180px] overflow-hidden rounded-md">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-fit"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="mt-3">
        {/* Title */}
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-neutral-700 dark:text-neutral-400 mt-2 line-clamp-3">
          {stripMarkdown(post.excerpt || '')}
        </p>

        {/* Metadata */}
        <div className="mt-2 flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <time dateTime={post.publishedAt} className="text-xs">{date}</time>
          {/* Adding watch emoji and reading time */}
          <span className="flex items-center">
            🕒 {readingTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
