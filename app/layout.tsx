'use client';

import './globals.css';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from '@/hooks/use-toast';
import Navbar from '@/components/ui/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <body className="
          min-h-screen

          bg-white text-blue-950       /* light: white bg, blue text */
          dark:bg-blue-950 dark:text-white  /* dark: blue bg, white text */
        ">
          <ToastContainer />
          <Navbar />
          <main className="py-8">
            <div className="max-w-6xl mx-auto px-4">{children}</div>
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}
