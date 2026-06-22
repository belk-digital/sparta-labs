'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Package, LifeBuoy, TrendingUp, Heart, Calendar, MapPin, Wallet, Users, BarChart3 } from 'lucide-react'
import { Space_Grotesk } from 'next/font/google'
import { motion, Variants } from 'framer-motion'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export interface AccountOverviewProps {
  stats: {
    ordersPlaced: number;
    wishlistCount: number;
    maxxPoints: number;
    memberSince: string;
  };
  recentOrders: {
    id: string;
    orderNumber: string;
    date: string;
    status: string;
    total: number;
  }[];
  defaultAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  } | null;
  affiliateStatus?: 'none' | 'pending' | 'approved' | 'rejected' | 'suspended';
}

export function AccountOverviewClient({ stats, recentOrders, defaultAddress, affiliateStatus = 'none' }: AccountOverviewProps) {
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-amber-500'
      case 'Shipped': return 'bg-blue-500'
      case 'Placed': return 'bg-blue-500'
      case 'Delivered': return 'bg-emerald-500'
      case 'Cancelled': case 'Returned': return 'bg-red-500'
      default: return 'bg-[#8A8A8A]'
    }
  }

  return (
    <motion.div
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-12"
    >

      {/* Stats Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Maxx Points', value: Number(stats.maxxPoints.toFixed(2)), icon: Wallet, accent: 'text-[#5984c4]' },
          { label: 'Orders Placed', value: stats.ordersPlaced, icon: Package, accent: 'text-ink' },
          { label: 'Wishlist Items', value: stats.wishlistCount, icon: Heart, accent: 'text-ink' },
          { label: 'Member Since', value: stats.memberSince, icon: Calendar, accent: 'text-ink' },
        ].map((stat, i) => (
          <motion.div key={stat.label} variants={itemVars} className="group relative bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#5984c4] hover:shadow-lg hover:shadow-[#5984c4]/10 transition-all duration-500 overflow-hidden">
            <div className="absolute top-4 right-4 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500">
              <stat.icon size={48} />
            </div>
            <div className="relative z-10 flex flex-col gap-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A8A8A]">{stat.label}</span>
              <span className={`text-3xl xl:text-4xl leading-none font-bold tracking-tighter ${stat.accent} ${spaceGrotesk.className}`}>{stat.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-12 items-start">

        {/* Recent Orders */}
        <motion.div variants={itemVars} className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink">Recent Orders</h3>
            <Link href="/account/orders" className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5984c4] hover:text-[#4a6b9c] transition-colors flex items-center gap-1.5">
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {recentOrders.length > 0 ? recentOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-200 rounded-xl hover:border-[#5984c4]/50 hover:shadow-md hover:shadow-[#5984c4]/10 transition-all duration-300 gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink">Order #{order.id}</span>
                  <span className="text-xs text-[#8A8A8A]">{order.date}</span>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColor(order.status)}`} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#4A4A4A]">{order.status}</span>
                  </div>
                  <span className={`text-sm font-bold text-ink ${spaceGrotesk.className}`}>${order.total.toFixed(2)}</span>
                  <Link href={`/account/orders/${order.id}`} className="bg-ink text-white px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] hover:bg-[#5984c4] transition-colors hidden sm:block">
                    Details
                  </Link>
                </div>
              </motion.div>
            )) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 flex flex-col items-center text-center gap-3">
                <Package size={24} className="text-[#5984c4]" />
                <p className="text-sm text-[#8A8A8A]">No orders yet</p>
                <Link href="/shop" className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink hover:text-[#5984c4] transition-colors">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={itemVars} className="flex flex-col gap-10">

          {/* Default Address */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink">Default Address</h3>
              <Link href="/account/addresses" className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A8A8A] hover:text-ink transition-colors">
                Edit
              </Link>
            </div>

            {defaultAddress ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col text-sm text-[#4A4A4A] leading-relaxed">
                <span className="text-ink font-bold uppercase tracking-[0.12em] text-[11px] mb-3 flex items-center gap-2">
                  <MapPin size={12} className="text-[#5984c4]" />
                  {defaultAddress.name}
                </span>
                <div className="flex flex-col gap-0.5 text-[#8A8A8A] text-xs">
                  <span>{defaultAddress.street}</span>
                  <span>{defaultAddress.city}, {defaultAddress.state} {defaultAddress.zip}</span>
                  <span>{defaultAddress.country}</span>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 flex flex-col items-center text-center gap-3">
                <MapPin size={20} className="text-[#5984c4]" />
                <p className="text-sm text-[#8A8A8A]">No address saved yet.</p>
                <Link href="/account/addresses" className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink hover:text-[#5984c4] transition-colors">
                  Add Address
                </Link>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink">Quick Links</h3>
            <div className="flex flex-col gap-2">

              {affiliateStatus === 'approved' && (
                <Link href="/affiliates/dashboard" className="flex items-center justify-between p-4 rounded-xl bg-ink text-white hover:bg-[#1A1A1A] transition-all duration-300 group shadow-md shadow-[#5984c4]/5">
                  <div className="flex items-center gap-3">
                    <BarChart3 size={14} className="text-[#5984c4]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em]">Affiliate Dashboard</span>
                  </div>
                  <ArrowRight size={14} className="text-[#5984c4] group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              {affiliateStatus === 'none' && (
                <Link href="/affiliates" className="flex items-center justify-between p-4 rounded-xl bg-ink text-white hover:bg-[#1A1A1A] transition-all duration-300 group shadow-md shadow-[#5984c4]/5">
                  <div className="flex items-center gap-3">
                    <Users size={14} className="text-[#5984c4]" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em]">Earn 15% Commission</span>
                      <span className="text-[9px] text-white/40 mt-0.5">Join the Partner Program</span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-[#5984c4] group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              <Link href="/track" className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 hover:border-[#5984c4]/50 hover:shadow-md hover:shadow-[#5984c4]/10 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <TrendingUp size={14} className="text-[#8A8A8A] group-hover:text-ink transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#4A4A4A] group-hover:text-ink transition-colors">Track Order</span>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-ink group-hover:translate-x-1 transition-all" />
              </Link>

              <Link href="/contact" className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 hover:border-[#5984c4]/50 hover:shadow-md hover:shadow-[#5984c4]/10 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <LifeBuoy size={14} className="text-[#8A8A8A] group-hover:text-ink transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#4A4A4A] group-hover:text-ink transition-colors">Contact Us</span>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-ink group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  )
}
