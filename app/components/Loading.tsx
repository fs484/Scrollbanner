'use client';

import React from 'react';

interface LoadingProps {
  message?: string;
  className?: string;
}


export default function Loading({ 
  message = 'Loading content...', 
  className = '' 
}: LoadingProps) {
  return (
    <div className={`fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-80 ${className}`}>
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-white text-lg font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}


export function LoadingSpinner({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    default: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4'
  };

  return (
    <div className={`inline-block border-gray-600 border-t-white rounded-full animate-spin ${sizeClasses[size]}`} />
  );
}
