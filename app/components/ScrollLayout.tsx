'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Dynamic import for Lenis to avoid SSR issues
let Lenis: any = null;
if (typeof window !== 'undefined') {
  import('@studio-freight/lenis').then((module) => {
    Lenis = module.default;
  });
}

interface ScrollLayoutProps {
  children: ReactNode;
  enableSmoothScroll?: boolean;
}

/**
 * ScrollLayout Component
 * Manages smooth scrolling behavior and GSAP ScrollTrigger integration
 */
export default function ScrollLayout({ 
  children, 
  enableSmoothScroll = true 
}: ScrollLayoutProps) {
  const lenisRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    if (enableSmoothScroll && Lenis && typeof window !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        normalizeWheel: true,
        autoResize: true,
      });

      lenisRef.current = lenis;

      // Connect Lenis with GSAP ScrollTrigger
      lenis.on('scroll', (e: any) => {
        ScrollTrigger.update();
      });

      // Update ScrollTrigger on Lenis scroll
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      // Disable lag smoothing for better performance
      gsap.ticker.lagSmoothing(0);

      console.log('Lenis smooth scroll initialized');
    }

    // Handle window resize
    const handleResize = () => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      // Stop animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Destroy Lenis instance
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }

      // Remove GSAP ticker
      gsap.ticker.remove(() => {});

      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Remove event listeners
      window.removeEventListener('resize', handleResize);

      console.log('🧹 ScrollLayout cleanup completed');
    };
  }, [enableSmoothScroll]);

  return (
    <div 
      className="scroll-container"
      data-lenis-prevent={!enableSmoothScroll}
    >
      {children}
    </div>
  );
}
