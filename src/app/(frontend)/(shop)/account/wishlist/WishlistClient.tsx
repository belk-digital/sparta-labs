'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Heart } from 'lucide-react'
import { EmptyState } from '@/components/shared/EmptyState'
import { Space_Grotesk } from 'next/font/google'
import { useWishlistStore } from '@/lib/wishlist/store'
import { useEffect, useState } from 'react'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  descriptor: string;
  price: string;
}

export interface AccountWishlistProps {
  items: WishlistItem[];
}

export function WishlistClient({ items: serverItems }: AccountWishlistProps) {
  const { items: localItems, removeItem } = useWishlistStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const displayItems = mounted ? localItems : []

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
            My Wishlist
          </h1>
          <p className="text-sm text-[#8A8A8A]">You have {displayItems.length} items saved for later.</p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-ink hover:bg-[#5984c4] text-white rounded-xl px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all w-full sm:w-auto shadow-sm">
          <ShoppingBag size={14} />
          Move All to Cart
        </button>
      </div>

      <AnimatePresence>
        {displayItems.length > 0 ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {displayItems.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col w-full bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-[#5984c4] hover:shadow-lg hover:shadow-[#5984c4]/10 transition-all duration-500"
              >

                {/* Image Area */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F5F5F7]">
                  <Link href={`/products/${product.slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                  </Link>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      removeItem(product.id)
                    }}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#8A8A8A] hover:text-red-500 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-sm"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Info Area */}
                <div className="flex flex-col flex-1 p-5">
                  <Link href={`/products/${product.slug}`}>
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#5984c4] mb-1.5 block">
                      {/* @ts-ignore */}
                      {product.descriptor || 'Product'}
                    </span>
                    <h3 className={`text-lg font-bold text-ink mb-1 tracking-tight group-hover:text-[#5984c4] transition-colors ${spaceGrotesk.className}`}>
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-4 flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                    <span className={`text-lg font-bold text-ink tracking-tighter ${spaceGrotesk.className}`}>
                      {/* @ts-ignore */}
                      {product.price || product.priceRange || ''}
                    </span>
                    <button className="bg-slate-100 hover:bg-[#5984c4] text-ink hover:text-white rounded-xl px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.1em] transition-all shrink-0">
                      Add to Cart
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
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
              icon={Heart}
              title="Your wishlist is empty"
              description="Save items you want to buy later by clicking the heart icon on any product page."
              action={
                <Link href="/shop" className="inline-flex items-center justify-center bg-ink hover:bg-[#5984c4] text-white rounded-xl px-8 py-4 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors shadow-sm shadow-[#5984c4]/10">
                  Start Browsing
                </Link>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
