'use client';

import { useState }    from 'react';
import { useRouter }   from 'next/navigation';
import { supabase }    from '@/lib/supabaseClient';
import { useToast }    from '@/hooks/use-toast';
import { Button }      from '@/components/ui/button';
import { Input }       from '@/components/ui/input';
import { Label }       from '@/components/ui/label';
import Link            from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Supabase login
    const { error: supaError } = await supabase.auth.signInWithPassword({ email, password });

    if (supaError) {
      toast({
        title:       'Login failed',
        description: supaError.message,
        variant:     'error'
      });
    } else {
      toast({
        title:       'Welcome back!',
        description: 'You have signed in successfully.',
        variant:     'success'
      });
      router.push('/protected');
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="max-w-md mx-auto space-y-4 p-6 bg-white/10 dark:bg-black/20 rounded-lg"
    >
      <h1 className="text-2xl font-bold text-center">Sign In</h1>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Signing in…' : 'Sign In'}
      </Button>

      <p className="text-sm text-center">
        Don’t have an account?{' '}
        <Link href="/auth/signup" className="underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
