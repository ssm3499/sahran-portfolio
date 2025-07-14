// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, MessageCircle } from 'lucide-react';

const leadSchema = z.object({
  name:    z.string().nonempty('Name is required'),
  email:   z.string().nonempty('Email is required').email('Invalid email'),
  message: z.string().nonempty('Message is required'),
});
type LeadFormValues = z.infer<typeof leadSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormValues>({ resolver: zodResolver(leadSchema) });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: LeadFormValues) {
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      toast({
        title:       'Success',
        description: 'Your message has been sent!',
        variant:     'success',
      });
    } catch (err: unknown) {
      const message = err instanceof Error
        ? err.message
        : 'Something went wrong.';
      toast({
        title:       'Error',
        description: message,
        variant:     'error',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Contact Me
        </h1>

        {/* Name */}
        <div>
          <Label htmlFor="name">Name</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              id="name"
              {...register('name')}
              placeholder="Your name"
              className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="you@example.com"
              className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message">Message</Label>
          <div className="relative mt-1">
            <MessageCircle className="absolute left-3 top-3 text-gray-400" />
            <Textarea
              id="message"
              rows={5}
              {...register('message')}
              placeholder="Your message..."
              className={`pl-12 ${errors.message ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? 'Sending…' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}
