'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';

interface Props {
  content: string;
}

const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  return (
    <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto text-gray-900 dark:text-white">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-snug tracking-tight mb-6 mt-12">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold border-l-4 pl-4 border-gray-300 dark:border-gray-600 mt-10 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium mt-8 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base sm:text-lg font-medium mt-6 mb-3">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-6 text-base sm:text-lg leading-relaxed">
              {children}
            </p>
          ),
          li: ({ children }) => (
            <li className="mb-2 ml-6 list-disc text-base sm:text-lg">
              {children}
            </li>
          ),
          code: ({ children }) => (
            <code className="bg-gray-200 dark:bg-gray-800 text-sm text-black dark:text-white px-2 py-1 rounded">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-black text-white text-sm font-mono p-6 rounded-xl shadow-md overflow-x-auto my-8">
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
                className="underline text-blue-600 dark:text-blue-400 hover:opacity-80 transition"
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
                  className="rounded-xl shadow-lg"
                  priority={false}
                />
              </div>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 italic pl-6 py-4 my-6 rounded-md text-gray-700 dark:text-gray-300">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-12 border-gray-300 dark:border-gray-600" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
