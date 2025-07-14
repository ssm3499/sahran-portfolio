// app/auth/signup/page.tsx
'use client';

import { useState }      from 'react';
import { useRouter }     from 'next/navigation';
import { supabase }      from '@/lib/supabaseClient';
import { useToast }      from '@/hooks/use-toast';
import { Button }        from '@/components/ui/button';
import { Input }         from '@/components/ui/input';
import { Label }         from '@/components/ui/label';

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();           // ← only `toast`
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // call Supabase signUp (rename its error)
    const { error: supabaseError } = await supabase.auth.signUp({ email, password });

    if (supabaseError) {
      // red error toast
      toast({
        title:       'Sign-up failed',
        description: supabaseError.message,
        variant:     'error'
      });
    } else {
      // green success toast
      toast({
        title:       'Check your email',
        description: 'A confirmation link has been sent.',
        variant:     'success'
      });
      router.push('/auth/signin');
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="
        max-w-md mx-auto space-y-4 p-6
        bg-white/10 dark:bg-black/20
        rounded-lg
      "
    >
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>

      {/* Email */}
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

      {/* Password */}
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

      {/* Submit */}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Signing up…' : 'Sign Up'}
      </Button>
    </form>
  );
}
