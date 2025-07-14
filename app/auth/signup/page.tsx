'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // only extract `error` since we don’t use `data`
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'error' });
    } else {
      toast({
        title:       'Success',
        description: 'Check your email for the confirmation link.',
        variant:     'success',
      });
      router.push('/auth/signin');
    }

    setLoading(false);
  }

  return (
    <div className="flex justify-center py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Sign Up
        </h1>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? 'Signing up…' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
}
