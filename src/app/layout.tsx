import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Primary Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* PNG icons for different sizes */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Browserconfig for Windows */}
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Theme Color for mobile */}
        <meta name="theme-color" content="#ffffff" />

        {/* SEO and PWA Enhancements */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Struggle To Success" />
        <meta name="apple-mobile-web-app-title" content="Struggle To Success" />
        <meta name="msapplication-TileColor" content="#ffffff" />
      </head>
      <body suppressHydrationWarning={true}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
