'use client';

import { useEffect } from 'react';

// ✅ TypeScript fix
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense error', e);
    }
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9649093139404963"
        data-ad-slot="8976671382" // ✅ Slot ID yaha use karo
        data-ad-format="autorelaxed"
      />
    </div>
  );
}
