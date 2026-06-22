'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Space_Grotesk } from 'next/font/google'
import { LayoutDashboard, Package, MapPin, Heart, Settings, LogOut, Wallet, BarChart3, Users } from 'lucide-react'
import { motion } from 'framer-motion'

import { useAuth } from '@/lib/auth/AuthContext'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { useState } from 'react'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

const NAV_ITEMS = [
  { name: 'Overview', href: '/account', icon: LayoutDashboard },
  { name: 'Orders', href: '/account/orders', icon: Package },
  { name: 'Addresses', href: '/account/addresses', icon: MapPin },
  { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { name: 'Settings', href: '/account/settings', icon: Settings },
]

export function AccountSidebar({
  userName = 'User',
  maxxPoints = 0,
  affiliateStatus = 'none'
}: {
  userName?: string
  maxxPoints?: number
  affiliateStatus?: 'none' | 'pending' | 'approved' | 'rejected' | 'suspended'
}) {
  const pathname = usePathname() || ''
  const { user } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <aside className="w-full h-fit flex flex-col gap-6 lg:sticky lg:top-28 z-10">
      {/* User Card */}
      <div className="bg-ink rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-[#5984c4]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(89,132,196,0.15)_0%,transparent_60%)]" />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#5984c4]/20 border border-[#5984c4]/30 flex items-center justify-center text-[#5984c4] text-lg font-bold uppercase">
              {userName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">Welcome Back</span>
              <h2 className={`text-lg font-bold text-white tracking-tight ${spaceGrotesk.className}`}>
                {userName}
              </h2>
            </div>
          </div>

          {/* Maxx Points */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 mt-1">
            <div className="flex items-center gap-3">
              <Wallet size={16} className="text-[#5984c4]" />
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">Maxx Points</span>
                <span className="text-lg font-bold text-white leading-none mt-0.5">{Number(maxxPoints.toFixed(2))}</span>
              </div>
            </div>
            <span className="text-xs text-[#5984c4] font-medium">${maxxPoints.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/account'
            ? pathname.endsWith('/account')
            : pathname.includes(item.href)

          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex items-center justify-center lg:justify-start gap-3 shrink-0 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300
                ${isActive
                  ? 'text-white'
                  : 'text-slate-500 hover:text-ink hover:bg-[#5984c4]/5'
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-ink rounded-xl z-0 shadow-md shadow-[#5984c4]/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={15} className={`relative z-10 ${isActive ? 'text-[#5984c4]' : 'text-slate-400'}`} />
              <span className="relative z-10">{item.name}</span>
            </Link>
          )
        })}

        {affiliateStatus === 'approved' && (
          <Link
            href="/affiliates/dashboard"
            className="relative flex items-center justify-center lg:justify-start gap-3 shrink-0 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 text-[#5984c4] hover:bg-[#5984c4]/10 group"
          >
            <BarChart3 size={15} className="text-[#5984c4]" />
            <span>Affiliate</span>
          </Link>
        )}

        <div className="hidden lg:block w-full h-px bg-[#E0D5C2]/60 my-3" />

        {/* Sign out */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center justify-center lg:justify-start gap-3 shrink-0 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.12em] text-[#8A8A8A] hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 group">
              <LogOut size={15} className="text-[#8A8A8A] group-hover:text-red-500 transition-colors duration-300" />
              <span className="relative z-10">Sign out</span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white border-0 p-8 rounded-2xl shadow-2xl">
            <DialogHeader>
              <DialogTitle className={`text-2xl font-bold tracking-tight text-[#0A0A0A] ${spaceGrotesk.className}`}>
                Sign Out
              </DialogTitle>
              <DialogDescription className="text-sm text-[#8A8A8A] mt-2">
                Are you sure you want to sign out of your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6 sm:justify-end">
              <DialogClose asChild>
                <button className="px-6 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] text-ink bg-slate-100 hover:bg-slate-200 transition-colors w-full sm:w-auto text-center">
                  Cancel
                </button>
              </DialogClose>
              <button
                onClick={async () => {
                  await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
                  router.push('/')
                  router.refresh()
                }}
                className="px-6 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] text-white bg-red-600 hover:bg-red-700 transition-colors w-full sm:w-auto text-center"
              >
                Yes, Sign Out
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </nav>

      {/* Affiliate Promo */}
      {affiliateStatus === 'none' && (
        <div className="hidden lg:flex flex-col gap-4 bg-ink border border-white/10 p-5 rounded-2xl w-full relative overflow-hidden shadow-lg shadow-[#5984c4]/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(89,132,196,0.15)_0%,transparent_60%)]" />
          <div className="relative z-10 flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#5984c4]">Partner Program</span>
            <p className="text-[11px] text-white/60 leading-relaxed font-medium">
              Earn <strong className="text-white font-bold">15% commission</strong> by referring researchers.
            </p>
          </div>
          <Link href="/affiliates" className="relative z-10 bg-[#5984c4] text-white hover:bg-[#4a6b9c] rounded-xl px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 text-center">
            Apply Now
          </Link>
        </div>
      )}

      {affiliateStatus === 'pending' && (
        <div className="hidden lg:flex flex-col gap-3 bg-[#F2EDE4] border border-[#E0D5C2] p-5 rounded-2xl w-full">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A8A8A]">Partner Program</span>
          <p className="text-[11px] text-[#4A4A4A] leading-relaxed font-medium">
            Your application is currently under review.
          </p>
        </div>
      )}
    </aside>
  )
}
