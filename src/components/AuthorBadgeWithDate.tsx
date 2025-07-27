// components/AuthorBadgeWithDate.tsx

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  name: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

const AuthorBadgeWithDate = ({ name, avatarUrl, createdAt, updatedAt }: Props) => {
  const [published, setPublished] = useState('');
  const [updated, setUpdated] = useState('');

  useEffect(() => {
    const format = (iso: string) =>
      new Date(iso).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

    setPublished(format(createdAt));
    if (createdAt !== updatedAt) setUpdated(format(updatedAt));
  }, [createdAt, updatedAt]);

  return (
    <div className="flex items-start gap-4 mt-4">
      {/* Left: Avatar + Name */}
      <div className="flex flex-col items-center">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-base font-semibold">
            {name?.[0] ?? '?'}
          </div>
        )}
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">{name}</span>
      </div>

      {/* Right: Dates */}
      <div className="flex flex-col justify-center text-sm text-gray-700 dark:text-gray-300">
        <p>📢 Published: {published}</p>
        {updated && <p>🔄 Updated: {updated}</p>}
      </div>
    </div>
  );
};

export default AuthorBadgeWithDate;
