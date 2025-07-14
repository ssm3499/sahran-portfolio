// app/api/leads/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

type LeadPayload = {
  name:    string;
  email:   string;
  message: string;
};

export async function POST(request: Request) {
  // 1) Parse & type‐assert the incoming JSON
  const data = (await request.json()) as LeadPayload;

  // 2) Runtime check to ensure correct types
  if (
    typeof data.name !== 'string' ||
    typeof data.email !== 'string' ||
    typeof data.message !== 'string'
  ) {
    return new Response('Invalid payload', { status: 400 });
  }

  // 3) Insert into your "leads" table
  const { error } = await supabase
    .from('leads')
    .insert([{ name: data.name, email: data.email, message: data.message }]);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
