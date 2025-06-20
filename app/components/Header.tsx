'use client';

import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  className?: string;
}


export default function Header({ className = '' }: HeaderProps) {
  return (
    <header 
      className={`fixed top-6 left-6 z-50 ${className}`}
      role="banner"
    >
      <div className="w-40 h-40 rounded-full flex items-center justify-center bg-transparent mix-blend-difference backdrop-blur-sm">
        <Image
          src="/scrll-logo.svg"
          alt="SCRLL Logo"
          width={60}
          height={60}
          className="w-full h-full"
          priority
        />
      </div>
    </header>
  );
}
