'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, ChevronRight, Filter, Package } from 'lucide-react'
import { EmptyState } from '@/components/shared/EmptyState'
import { motion, AnimatePresence } from 'framer-motion'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export interface OrderItem {
  id: string;
  date: string;
  status: string;
  total: number;
  itemCount: number;
}

export interface AccountOrdersProps {
  orders: OrderItem[];
}

const statusStyles = (status: string) => {
  switch (status) {
    case 'Processing': return { dot: 'bg-amber-500', bg: 'bg-amber-50 border-amber-200 text-amber-700 rounded-full' }
    case 'Shipped': case 'Placed': return { dot: 'bg-blue-500', bg: 'bg-blue-50 border-blue-200 text-blue-700 rounded-full' }
    case 'Delivered': return { dot: 'bg-emerald-500', bg: 'bg-emerald-50 border-emerald-200 text-emerald-700 rounded-full' }
    case 'Cancelled': case 'Returned': return { dot: 'bg-red-500', bg: 'bg-red-50 border-red-200 text-red-700 rounded-full' }
    default: return { dot: 'bg-[#8A8A8A]', bg: 'bg-gray-50 border-gray-200 text-gray-700 rounded-full' }
  }
}

export function OrdersClient({ orders }: AccountOrdersProps) {
  const [filter, setFilter] = useState('all')

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(o => o.status.toLowerCase() === filter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col w-full"
    >

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-2">
          <h1 className={`text-3xl md:text-4xl text-ink font-bold tracking-tighter ${spaceGrotesk.className}`}>
            Order History
          </h1>
          <p className="text-sm text-[#8A8A8A]">Track, manage, and return your recent purchases.</p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1">
          <div className="pl-3 hidden sm:flex items-center justify-center">
            <Filter size={13} className="text-[#8A8A8A]" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[160px] bg-transparent border-none shadow-none focus:ring-0 text-[10px] font-bold uppercase tracking-[0.1em] text-ink">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 rounded-xl shadow-xl shadow-black/5">
              <SelectItem value="all" className="text-[10px] font-bold uppercase tracking-[0.1em]">All Orders</SelectItem>
              <SelectItem value="processing" className="text-[10px] font-bold uppercase tracking-[0.1em]">Processing</SelectItem>
              <SelectItem value="delivered" className="text-[10px] font-bold uppercase tracking-[0.1em]">Delivered</SelectItem>
              <SelectItem value="returned" className="text-[10px] font-bold uppercase tracking-[0.1em] text-red-500">Returned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredOrders.length > 0 ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            {filteredOrders.map((order, i) => {
              const styles = statusStyles(order.status)
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-[#5984c4] hover:shadow-lg hover:shadow-[#5984c4]/10 transition-all duration-300 gap-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 flex-1">
                    <div className="flex flex-col gap-1.5 min-w-[130px]">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A8A8A]">Order Placed</span>
                      <span className="text-sm font-medium text-ink">{order.date}</span>
                      <span className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-widest mt-0.5">#{order.id}</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A8A8A] hidden md:block">Status</span>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 border ${styles.bg} self-start`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                        <span className="text-[9px] font-bold uppercase tracking-[0.1em]">{order.status}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-3 md:mt-0 md:ml-auto">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A8A8A] hidden md:block text-right">Total</span>
                      <div className="flex items-end gap-2 md:justify-end">
                        <span className={`text-xl md:text-2xl font-bold text-ink tracking-tight ${spaceGrotesk.className}`}>
                          ${order.total.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-[#8A8A8A] mb-1">({order.itemCount} items)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center shrink-0 mt-3 md:mt-0">
                    <Link href={`/account/orders/${order.id}`} className="w-full md:w-auto bg-slate-100 group-hover:bg-[#5984c4] text-ink group-hover:text-white px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap text-center">
                      View Details
                    </Link>
                  </div>
                </motion.div>
              )
            })}

            {/* Pagination */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 pt-8 gap-4">
              <span className="text-xs text-[#8A8A8A]">
                Showing <span className="font-bold text-ink">1</span> to <span className="font-bold text-ink">{filteredOrders.length}</span> of <span className="font-bold text-ink">{filteredOrders.length}</span> results
              </span>
              <div className="flex items-center gap-2">
                <button disabled className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-[#8A8A8A] border border-slate-200 cursor-not-allowed">
                  <ChevronLeft size={15} />
                </button>
                <button disabled className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 text-[#8A8A8A] border border-slate-200 cursor-not-allowed">
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full bg-white rounded-3xl border border-dashed border-slate-300 p-12"
          >
            <EmptyState
              icon={Package}
              title="No orders found"
              description="You haven't placed any orders that match this filter."
              action={
                <Link href="/shop" className="inline-flex items-center justify-center bg-ink hover:bg-[#5984c4] text-white rounded-xl px-8 py-4 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors">
                  Start Shopping
                </Link>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
