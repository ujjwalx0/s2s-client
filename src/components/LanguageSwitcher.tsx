// components/LanguageSwitcher.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const [locale, setLocale] = useState('en');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    setLocale(newLocale);
    router.push(`/${newLocale}`); // Assuming locales are top-level routes
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="p-2 border rounded-md shadow-sm"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
    </select>
  );
};

export default LanguageSwitcher;
