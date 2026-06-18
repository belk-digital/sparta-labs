import React from 'react'
import { Container } from '@/components/ui/container'
import { Skeleton, ProductCardSkeleton } from '@/components/ui/skeleton'

export default function ShopLoading() {
  return (
    <div className="w-full bg-cream min-h-screen">
      <Container size="page" className="pt-12 pb-12">
        {/* Top Toolbar Skeleton */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 bg-white/95 border border-border-subtle p-3 sm:p-4 rounded-2xl shadow-sm">
          {/* Top Row: Buttons */}
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Skeleton className="h-10 w-24 rounded-full" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-24 hidden md:block" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-[240px] rounded-full hidden sm:block" />
              <div className="relative">
                <Skeleton className="h-10 w-[140px] rounded-full" />
              </div>
            </div>
          </div>
          
          {/* Active Filters Row */}
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>
        </div>

        {/* Results Area (Full Width Grid) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="flex h-full w-full">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
