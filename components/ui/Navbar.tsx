// components/ui/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Home, ChevronDown, Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  // on mount: load theme + session & subscribe to auth events
  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-blue-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">SM</span>
          </div>
        </Link>

        {/* Center Title */}
        <div className="absolute inset-x-0 flex justify-center pointer-events-none">
          <span className="text-xl font-semibold">Sahran Merchant</span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Home dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <Home className="h-5 w-5" />
                <span className="hidden sm:inline">Home</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/projects">Projects</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {mounted
              ? theme === 'light'
                ? <Moon className="h-5 w-5" />
                : <Sun  className="h-5 w-5" />
              : null}
          </Button>

          {/* Auth button */}
          {session ? (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
