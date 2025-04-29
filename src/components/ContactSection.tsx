'use client';

import { useRouter } from 'next/navigation';

export default function ContactSection() {
  const router = useRouter();

  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mt-16 border border-gray-200">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Have a story to tell?</h2>
        <p className="text-lg text-gray-600 mb-6">Join us in inspiring others. Contribute your unique journey or perspective to BeyondBooks.</p>
        <button
          onClick={() => router.push('/contact')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
        >
          Contribute Now
        </button>
      </div>
    </section>
  );
}
