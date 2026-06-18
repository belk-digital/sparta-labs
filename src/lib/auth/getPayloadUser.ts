import { getPayload } from 'payload'
import config from '@payload-config'
import type { User } from '@/payload-types'
import { cache } from 'react'
import { headers } from 'next/headers'

export const getPayloadUser = cache(async (): Promise<User | null> => {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  return (user as User) || null
})
