'use client';

import React from 'react';
import { Toaster, toast as hotToast } from 'react-hot-toast';

/** Mount this once at the root of your app (in layout.tsx) */
export function ToastContainer() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '0.5rem',
        },
      }}
    />
  );
}

/**
 * Hook that returns a single toast() function
 * Usage:
 *   const { toast } = useToast();
 *   toast({ title: 'Success', description: 'It worked!', variant: 'success' });
 */
export function useToast() {
  function toast({
    title,
    description,
    variant = 'default',
  }: {
    title: string;
    description?: string;
    variant?: 'success' | 'error' | 'default';
  }) {
    const content = (
      <div className="space-y-1">
        <p className="font-semibold">{title}</p>
        {description && <p className="text-sm opacity-80">{description}</p>}
      </div>
    );

    if (variant === 'success') {
      hotToast.success(content);
    } else if (variant === 'error') {
      hotToast.error(content);
    } else {
      hotToast(content);
    }
  }

  return { toast };
}
