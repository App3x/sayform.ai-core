import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth/lucia';

export async function middleware(request: NextRequest) {
  const authRequest = auth.handleRequest(request.method, request);
  const session = await authRequest.validate();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Continue to the next middleware or API route
  return NextResponse.next();
}