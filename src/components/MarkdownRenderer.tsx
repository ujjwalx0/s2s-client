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
    <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto text-black bg-white">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-6 mt-12">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold border-l-4 pl-4 border-gray-300 mt-10 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium mt-8 mb-3">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-medium mt-6 mb-3">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="mb-6 text-base leading-relaxed">{children}</p>
          ),
          li: ({ children }) => (
            <li className="mb-2 ml-6 list-disc text-base">{children}</li>
          ),
          code: ({ children }) => (
            <code className="bg-gray-200 text-sm text-black px-2 py-1 rounded">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-white text-sm font-mono p-6 rounded-xl overflow-x-auto my-8">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 hover:opacity-80"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => {
            if (!src || typeof src !== 'string') return null;
            return (
              <div className="relative w-full mx-auto my-8" style={{ height: 'auto' }}>
                <Image
                  src={src}
                  alt={alt || ''}
                  width={800}
                  height={500}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  className="rounded-xl shadow-lg"
                />
              </div>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-400 bg-gray-100 italic pl-6 py-4 my-6 rounded-md text-gray-700">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-12 border-gray-300" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
