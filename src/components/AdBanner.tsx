'use client';

import { useEffect } from 'react';

// ✅ Fix TS error for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Adsense load error:', e);
      }
    }, 100); // Add slight delay to improve TBT

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full flex justify-center my-8">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '100px' }}
        data-ad-client="ca-pub-9649093139404963"
        data-ad-slot="8976671382"
        data-ad-format="autorelaxed"
        data-full-width-responsive="true"
      />
    </div>
  );
}
