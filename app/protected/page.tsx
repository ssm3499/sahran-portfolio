'use client';

import { useEffect, useState } from 'react';
import { useRouter }          from 'next/navigation';
import { supabase }           from '@/lib/supabaseClient';
import { useToast }           from '@/hooks/use-toast';

export default function ProtectedPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        toast({
          title:       'Access denied',
          description: 'Please sign in to view that page.',
          variant:     'error'
        });
        router.replace('/auth/signin');
      } else {
        setLoading(false);
      }
    });
  }, [router, toast]);

  if (loading) return <p className="text-center py-8">Checking session…</p>;

  return (
    <section className="text-center py-20">
      <h1 className="text-3xl font-bold">Protected Content</h1>
      <p className="mt-4">🚀 Only signed-in users can see this.</p>
    </section>
  );
}
