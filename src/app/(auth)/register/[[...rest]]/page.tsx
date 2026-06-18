'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) { setError('Passwords do not match'); return }

    setIsLoading(true)
    try {
      // 1. Create user account
      const registerRes = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const registerData = await registerRes.json()
      if (!registerRes.ok) {
        setError(registerData?.errors?.[0]?.message || 'Could not create account.')
        return
      }

      // 2. Auto-login after registration
      const loginRes = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      if (loginRes.ok) {
        router.push('/account')
        router.refresh()
      } else {
        router.push('/login')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-white selection:bg-black/10">

      {/* Left Column */}
      <div className="w-full lg:w-[45%] relative min-h-[30vh] lg:min-h-screen order-first lg:order-none flex flex-col justify-between p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 overflow-hidden">
        <Image src="https://res.cloudinary.com/denskvdyt/image/upload/v1781825980/sparta-peptide-lab-image_yp7lht.webp" alt="Laboratory" fill className="object-cover object-center z-0" priority unoptimized />
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-center w-full">
          <Link href="/" className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-white hover:opacity-80 transition-opacity drop-shadow-sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Return
          </Link>
          <div className="font-serif text-xl font-bold tracking-tighter text-white drop-shadow-sm">SPARTA</div>
        </div>

        <div className="relative z-10 flex flex-col justify-center h-full max-w-sm mt-12 lg:mt-0 drop-shadow-md">
          <h2 className="text-[10px] font-bold text-white/80 tracking-[0.25em] uppercase mb-6">Join The Lab</h2>
          <h1 className={`text-4xl lg:text-5xl leading-[1.1] font-bold tracking-tighter text-white mb-6 font-[family-name:var(--font-inter)]`}>
            Create an account to begin.
          </h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-[320px]">
            Register to manage your orders, view exclusive pricing, and explore premium research materials.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 lg:p-24 bg-white">
        <div className="w-full max-w-[420px] flex flex-col">
          <h1 className={`text-2xl font-bold tracking-tight text-black mb-1 font-[family-name:var(--font-inter)]`}>Create an account</h1>
          <p className="text-sm text-gray-500 mb-8">Join Sparta Labs today</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-800">Email Address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required autoComplete="email" placeholder="hello@example.com"
                className="border border-gray-200 focus:border-black focus:ring-1 focus:ring-black focus:outline-none h-14 text-black rounded-none placeholder:text-gray-400 px-4"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-800">Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                required autoComplete="new-password" placeholder="••••••••"
                className="border border-gray-200 focus:border-black focus:ring-1 focus:ring-black focus:outline-none h-14 text-black rounded-none placeholder:text-gray-400 px-4"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-800">Confirm Password</label>
              <input
                type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                required autoComplete="new-password" placeholder="••••••••"
                className="border border-gray-200 focus:border-black focus:ring-1 focus:ring-black focus:outline-none h-14 text-black rounded-none placeholder:text-gray-400 px-4"
              />
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

            <button type="submit" disabled={isLoading}
              className="bg-black hover:bg-gray-900 text-white w-full h-14 text-xs font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center mt-2 disabled:opacity-60">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-8">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Already have an account? </span>
            <Link href="/login" className="text-[10px] text-black font-bold uppercase tracking-widest hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
