'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollingTextRowProps, GradientVariant } from '@/types/post';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


function getExactColorSequence(index: number): string {
  const colors = [
    '#F972DB', // pink
    '#72F97F', // green  
    '#72C8F9', // blue
    '#F98A72', // orange
    '#72A0F9', // darker blue
    '#F6F972', // yellow
    '#72F9C8', // teal
  ];
  
  return colors[index % colors.length];
}


function getCrissCrossPattern(index: number) {
  const patterns = [
    { 
      // Pink 
      rotation: -8,
      startX: '-80%', 
      endX: '60%', 
      spacing: { top: 60, bottom: 40 },
      zIndex: 15
    },
    { 
      // Green 
      rotation: 12,
      startX: '10%', 
      endX: '-60%', 
      spacing: { top: 160, bottom: 60 },
      zIndex: 12
    },
    { 
      // Blue 
      rotation: 8,
      startX: '-70%', 
      endX: '70%', 
      spacing: { top: 50, bottom: 50 },
      zIndex: 18
    },
    { 
      // Orange 
      rotation: -2,
      startX: '70%', 
      endX: '-70%', 
      spacing: { top: 30, bottom: 70 },
      zIndex: 8
    },
    { 
      // Darker Blue
      rotation: -20,
      startX: '-65%', 
      endX: '65%', 
      spacing: { top: 290, bottom: 30 },
      zIndex: 16
    },
    { 
      // Yellow 
      rotation: 5,
      startX: '65%', 
      endX: '-65%', 
      spacing: { top: 25, bottom: 75 },
      zIndex: 8
    },
    { 
      // Teal
      rotation: -5,
      startX: '-75%', 
      endX: '75%', 
      spacing: { top: 180, bottom: 20 },
      zIndex: 14
    }
  ];
  
  return patterns[index % patterns.length];
}

export default function ScrollingTextRow({ 
  text, 
  direction, 
  gradientVariant, 
  index 
}: ScrollingTextRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!rowRef.current || !textRef.current) return;

    const row = rowRef.current;
    const textElement = textRef.current;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    const pattern = getCrissCrossPattern(index);
    
    
    gsap.set(textElement, { x: pattern.startX });

  
    const animation = gsap.to(textElement, {
      x: pattern.endX,
      ease: 'none',
      scrollTrigger: {
        trigger: row,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    animationRef.current = animation;

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === row) {
          trigger.kill();
        }
      });
    };
  }, [direction, text, index]);

  const pattern = getCrissCrossPattern(index);
  const color = getExactColorSequence(index);

  return (
    <div 
      className="w-full" 
      style={{ 
        paddingTop: `${pattern.spacing.top}px`, 
        paddingBottom: `${pattern.spacing.bottom}px`,
        overflow: 'visible'
      }}
    >
      <div 
        ref={rowRef}
        className="relative flex items-center overflow-hidden h-32"
        style={{ 
          backgroundColor: color,
          transform: `skewY(${pattern.rotation}deg)`,
          zIndex: pattern.zIndex,
          width: '150vw',
          marginLeft: '-25vw'
        }}
        data-direction={direction}
        data-index={index}
      >
        <div 
          ref={textRef}
          className="font-inter text-[clamp(3rem,8vw,10rem)] font-black uppercase whitespace-nowrap leading-[0.8] tracking-[-0.02em] px-[5vw] transform-gpu will-change-transform text-black"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          aria-label={`Animated text: ${text}`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
