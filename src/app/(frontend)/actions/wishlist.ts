'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'

export async function toggleWishlistInPayload(productId: string | number, isAdding: boolean, providedVariantSku?: string, providedPriceSnapshot?: number) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { user } = await payload.auth({ headers: await headers() })
    if (!user) return { success: false, error: 'Not authenticated' }

    const wishlists = await payload.find({
      collection: 'wishlists',
      where: { user: { equals: user.id } },
      limit: 1,
      overrideAccess: true,
    })

    let priceSnapshot = 0
    if (isAdding) {
      if (providedPriceSnapshot !== undefined) {
        priceSnapshot = providedPriceSnapshot
      } else {
        try {
          const product = await payload.findByID({ collection: 'products', id: productId })
          if (product) priceSnapshot = product.salePrice || product.price || 0
        } catch (err) {
          console.warn('Could not fetch product price for snapshot', err)
        }
      }
    }

    let wishlist = wishlists.docs[0]

    if (!wishlist) {
      if (!isAdding) return { success: true }
      await payload.create({
        collection: 'wishlists',
        data: {
          user: user.id,
          items: [{
            product: (!isNaN(Number(productId)) ? Number(productId) : productId) as any,
            variantSku: providedVariantSku || 'default',
            quantity: 1,
            addedAt: new Date().toISOString(),
            priceSnapshot,
          }],
        },
        overrideAccess: true,
      })
      return { success: true }
    }

    const currentItems = wishlist.items || []
    let newItems = [...currentItems]

    if (isAdding) {
      const exists = currentItems.some(item => {
        const pId = typeof item.product === 'object' ? item.product?.id : item.product
        return String(pId) === String(productId) && (item.variantSku || 'default') === (providedVariantSku || 'default')
      })
      if (!exists) {
        newItems.push({
          product: (!isNaN(Number(productId)) ? Number(productId) : productId) as any,
          variantSku: providedVariantSku || 'default',
          quantity: 1,
          addedAt: new Date().toISOString(),
          priceSnapshot,
        })
      }
    } else {
      newItems = currentItems.filter(item => {
        const pId = typeof item.product === 'object' ? item.product?.id : item.product
        return String(pId) !== String(productId)
      })
    }

    if (newItems.length === 0) {
      await payload.delete({ collection: 'wishlists', id: wishlist.id, overrideAccess: true })
    } else {
      await payload.update({
        collection: 'wishlists',
        id: wishlist.id,
        data: { items: newItems as any },
        overrideAccess: true,
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Error toggling wishlist in payload:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}
