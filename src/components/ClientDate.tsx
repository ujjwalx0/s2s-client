'use client';
import { useEffect, useState } from 'react';

export default function ClientDate({ iso }: { iso: string }) {
  const [localDate, setLocalDate] = useState('');

  useEffect(() => {
    const date = new Date(iso);
    const formatted = date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        //timeZoneName: 'short',
      });
      
    setLocalDate(formatted);
  }, [iso]);

  return <>{localDate}</>;
}
