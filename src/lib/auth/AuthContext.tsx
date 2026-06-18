'use client'

import { createContext, useContext } from 'react'
import type { User } from '@/payload-types'

interface AuthContextValue {
  user: User | null
}

const AuthContext = createContext<AuthContextValue>({ user: null })

export function AuthProvider({ user, children }: { user: User | null; children: React.ReactNode }) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
