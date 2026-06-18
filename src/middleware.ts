import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Placeholder middleware — Clerk removed, Neon Auth (Stack Auth) wired in Phase 2
export default function middleware(req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
