import React, { Suspense } from 'react';
import { fetchPosts } from '@/lib/fetchPosts';
import { Post, AnimationDirection, GradientVariant } from '@/types/post';
import ScrollLayout from '@/components/ScrollLayout';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import ScrollingTextRow from '@/components/ScrollingTextRow';
import { Inter } from 'next/font/google';


const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});


function getGradientVariant(index: number): GradientVariant {
  const variants: GradientVariant[] = [
    'pink', 'teal', 'blue', 'green', 
    'yellow', 'purple', 'red', 'magenta'
  ];
  return variants[index % variants.length];
}


function getAnimationDirection(index: number): AnimationDirection {
  return index % 2 === 0 ? 'left' : 'right';
}


async function TextRows() {
  const allPosts = await fetchPosts();

  const posts = allPosts.slice(0, 7);

  return (
    <>
      {posts.map((post, index) => (
        <ScrollingTextRow
          key={`${post.id}-${index}`}
          text={post.title}
          direction={getAnimationDirection(index)}
          gradientVariant={getGradientVariant(index)}
          index={index}
        />
      ))}
    </>
  );
}


function Spacer({ height = 'h-screen' }: { height?: string }) {
  return <div className={`${height} bg-black`} />;
}


export default function HomePage() {
  return (
    <div className={`${inter.className} min-h-screen bg-black text-white overflow-x-hidden`}>
      <ScrollLayout enableSmoothScroll={true}>
       
        <Header />

        
        <main className="relative">
          
          <Spacer height="h-screen" />
          
        
          <section className="text-rows-container" aria-label="Animated text content">
            <Suspense fallback={<Loading message="Loading creative content..." />}>
              <TextRows />
            </Suspense>
          </section>
          
          
          <Spacer height="h-screen" />
        </main>
      </ScrollLayout>
    </div>
  );
}


export const metadata = {
  title: 'SCRLL - Smooth Scroll Text Animation',
  description: 'Creative front-end technical challenge featuring smooth scroll text animations powered by WordPress API data.',
  keywords: 'smooth scroll, text animation, GSAP, Next.js, creative frontend, technical challenge',
  authors: [{ name: 'Fred' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  openGraph: {
    title: 'SCRLL - Smooth Scroll Text Animation',
    description: 'Creative front-end technical challenge featuring smooth scroll text animations.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SCRLL - Smooth Scroll Text Animation',
    description: 'Creative front-end technical challenge featuring smooth scroll text animations.',
  },
  robots: {
    index: true,
    follow: true,
  }
};
