import React from 'react'
import { Container } from '@/components/ui/container'
import { AccountSidebar } from '@/components/account/AccountSidebar'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

import { getPayloadUser } from '@/lib/auth/getPayloadUser'
import { getPayload } from 'payload'
import config from '@payload-config'

export const metadata = {
  title: 'My Account | The Looksmaxxing Lab',
}

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getPayloadUser()
  const userName = user?.firstName || user?.email?.split('@')[0] || 'User'
  const maxxPoints = user?.maxxPoints || 0

  let affiliateStatus: 'none' | 'pending' | 'approved' | 'rejected' | 'suspended' = 'none'
  if (user) {
    const payload = await getPayload({ config })
    const { docs: affiliates } = await payload.find({
      collection: 'affiliates',
      where: { user: { equals: user.id } },
      limit: 1,
      overrideAccess: true,
    })
    if (affiliates.length > 0) {
      affiliateStatus = affiliates[0].status || 'pending'
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] selection:bg-[#5984c4]/20">
      {/* Dark Hero Banner */}
      <div className="bg-ink pt-28 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(89,132,196,0.15)_0%,transparent_60%)]" />
        <Container size="page" className="relative z-10">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5984c4]">Account Portal</span>
            <h1 className={`text-4xl md:text-6xl font-bold tracking-tighter text-white ${spaceGrotesk.className}`}>
              My Account
            </h1>
          </div>
        </Container>
      </div>

      <Container size="page" className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
          <div className="h-full relative lg:-mt-20 z-20">
            <AccountSidebar userName={userName} maxxPoints={maxxPoints} affiliateStatus={affiliateStatus} />
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>
      </Container>
    </div>
  )
}
