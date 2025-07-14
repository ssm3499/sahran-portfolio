'use client';

import { useState } from 'react';
import { useForm }    from 'react-hook-form';
import { z }          from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button }   from '@/components/ui/button';
import { Input }    from '@/components/ui/input';
import { Label }    from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

import { User, Mail, MessageCircle } from 'lucide-react';

// 1) Validation schema
const leadSchema = z.object({
  name:    z.string().nonempty('Name is required'),
  email:   z.string().nonempty('Email is required').email('Invalid email'),
  message: z.string().nonempty('Message is required'),
});
type LeadFormValues = z.infer<typeof leadSchema>;

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<LeadFormValues>({ resolver: zodResolver(leadSchema) });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LeadFormValues) => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      toast({ title: 'Success', description: 'Your message has been sent!', variant: 'success' });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Something went wrong.', variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      flex justify-center py-16 px-4

      bg-white text-blue-950         /* light mode */
      dark:bg-blue-950 dark:text-white   /* dark mode */
    ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-center">Contact Me</h1>

        {/* Name */}
        <div>
          <Label htmlFor="name">Name</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-current/50" />
            <Input
              id="name"
              {...register('name')}
              placeholder="Your name"
              className={`
                pl-10
                bg-blue-950/5 hover:bg-blue-950/10 dark:bg-white/5 dark:hover:bg-white/10
                text-current
                border-none focus:ring-2 focus:ring-blue-400
                transition ${errors.name ? 'ring-red-400' : ''}
              `}
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-current/50" />
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="you@example.com"
              className={`
                pl-10
                bg-blue-950/5 hover:bg-blue-950/10 dark:bg-white/5 dark:hover:bg-white/10
                text-current
                border-none focus:ring-2 focus:ring-blue-400
                transition ${errors.email ? 'ring-red-400' : ''}
              `}
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message">Message</Label>
          <div className="relative mt-1">
            <MessageCircle className="absolute left-3 top-3 text-current/50" />
            <Textarea
              id="message"
              rows={5}
              {...register('message')}
              placeholder="Your message..."
              className={`
                pl-12 pt-2
                bg-blue-950/5 hover:bg-blue-950/10 dark:bg-white/5 dark:hover:bg-white/10
                text-current
                border-none focus:ring-2 focus:ring-blue-400
                transition ${errors.message ? 'ring-red-400' : ''}
              `}
            />
          </div>
          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className={`
            w-full py-3
            bg-blue-950/10 hover:bg-blue-950/20 dark:bg-white/10 dark:hover:bg-white/20
            text-current
            rounded-md
            transition
          `}
        >
          {loading ? 'Sending…' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}
