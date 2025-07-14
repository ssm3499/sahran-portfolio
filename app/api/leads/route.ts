// app/api/leads/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const res = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Google Script returned ${res.status}: ${text}`);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[/api/leads] error:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
