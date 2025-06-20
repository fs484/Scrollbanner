import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: "SCRLL - Smooth Scroll Text Animation",
  description: "Creative front-end technical challenge featuring smooth scroll text animations powered by WordPress API data.",
  keywords: ["smooth scroll", "text animation", "GSAP", "Next.js", "creative frontend", "technical challenge"],
  authors: [{ name: "Fred" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  openGraph: {
    title: "SCRLL - Smooth Scroll Text Animation",
    description: "Creative front-end technical challenge featuring smooth scroll text animations.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SCRLL - Smooth Scroll Text Animation",
    description: "Creative front-end technical challenge featuring smooth scroll text animations.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
       
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://frontendtest.pleasecheck.me" />
      </head>
      <body className="antialiased min-h-screen bg-black text-white">
     
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}
