'use client';
export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-gray-300">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text text-center">
        Privacy Policy
      </h1>

      <section className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed">
        <p>
          At <strong>Struggle to Success</strong>, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal data when you interact with our platform.
        </p>

        <h2 className="text-lg text-cyan-400 font-semibold">1. Information We Collect</h2>
        <p>We may collect personal information like name, email, or any details you voluntarily submit through forms or comments.</p>

        <h2 className="text-lg text-cyan-400 font-semibold">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside pl-4">
          <li>To improve content and user experience</li>
          <li>To respond to your inquiries</li>
          <li>To send newsletters or updates (if you subscribe)</li>
        </ul>

        <h2 className="text-lg text-cyan-400 font-semibold">3. Cookies & Tracking</h2>
        <p>We use cookies for analytics, performance, and personalization. You can disable cookies via your browser settings.</p>

        <h2 className="text-lg text-cyan-400 font-semibold">4. Third-Party Services</h2>
        <p>We may use services like Google Analytics, Google AdSense, etc. They have their own privacy policies, which we do not control.</p>

        <h2 className="text-lg text-cyan-400 font-semibold">5. Data Security</h2>
        <p>We implement standard security measures but cannot guarantee complete safety over the internet.</p>

        <h2 className="text-lg text-cyan-400 font-semibold">6. Contact Us</h2>
        <p>If you have any concerns regarding your privacy, email us at <span className="text-bold font-semibold">struggletosuccess@gmail.com</span>.</p>
      </section>
    </main>
  );
}
