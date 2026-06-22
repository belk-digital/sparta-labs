'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ExternalLink, Shield, Save, Bell, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { Space_Grotesk } from 'next/font/google'
import { toast } from 'sonner'
import { UpdatePasswordDialog } from '@/components/account/SecurityDialogs'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export interface AccountSettingsProps {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    phone?: string | null;
  }
}

export function SettingsClient({ user }: AccountSettingsProps) {
  const [isPending, startTransition] = React.useTransition()
  const [marketingEmails, setMarketingEmails] = React.useState(true)
  const [orderSms, setOrderSms] = React.useState(true)
  const [passwordOpen, setPasswordOpen] = React.useState(false)

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const { updateProfile } = await import('./actions')
        const result = await updateProfile(formData)
        if (!result?.success) {
          toast.error(result?.error || 'Failed to update profile')
          return
        }
        toast.success('Profile updated successfully')
      } catch (error: any) {
        toast.error(error.message || 'An unexpected error occurred')
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col w-full max-w-4xl"
    >

      {/* Header */}
      <div className="flex flex-col gap-2 mb-10 border-b border-slate-200 pb-6">
        <h1 className={`text-3xl md:text-4xl text-ink font-bold tracking-tighter ${spaceGrotesk.className}`}>
          Account Settings
        </h1>
        <p className="text-sm text-[#8A8A8A]">Manage your personal information, security preferences, and notifications.</p>
      </div>

      <div className="flex flex-col gap-10">

        {/* Personal Info */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-ink flex items-center justify-center text-[#5984c4] shadow-md shadow-[#5984c4]/10">
              <Shield size={14} />
            </div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink">Personal Information</h2>
          </div>

          <form action={handleSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">First Name</Label>
                <Input name="firstName" id="firstName" defaultValue={user.firstName || ''} className="h-12 bg-slate-50 border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">Last Name</Label>
                <Input name="lastName" id="lastName" defaultValue={user.lastName || ''} className="h-12 bg-slate-50 border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label htmlFor="phone" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">Phone Number</Label>
                <Input name="phone" id="phone" type="tel" defaultValue={user.phone || ''} className="h-12 bg-slate-50 border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl" />
              </div>
              <div className="md:col-span-2 mt-4">
                <button disabled={isPending} className="flex items-center gap-2 bg-ink hover:bg-[#5984c4] rounded-xl text-white px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all disabled:opacity-50">
                  <Save size={14} />
                  {isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </motion.section>

        {/* Sign In & Security */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-ink flex items-center justify-center text-[#5984c4] shadow-md shadow-[#5984c4]/10">
              <Shield size={14} />
            </div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink">Sign In & Security</h2>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-[#5984c4] flex items-center justify-center shrink-0">
                <Shield size={18} />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-ink">Authentication managed securely</span>
                <p className="text-xs text-[#8A8A8A] leading-relaxed">
                  Your email (<strong className="text-ink font-semibold">{user.email}</strong>) and password are encrypted and managed securely.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setPasswordOpen(true)}
              className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-[#5984c4] hover:text-white border border-slate-200 rounded-xl text-ink px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all w-full sm:w-auto"
            >
              Update Password <ExternalLink size={13} />
            </button>
          </div>
        </motion.section>

        {/* Preferences */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-ink flex items-center justify-center text-[#5984c4] shadow-md shadow-[#5984c4]/10">
              <Globe size={14} />
            </div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink">Preferences</h2>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="language" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language" className="h-12 bg-slate-50 border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl text-sm">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200 rounded-xl shadow-xl">
                    <SelectItem value="en">English (US)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="currency" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currency" className="h-12 bg-slate-50 border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl text-sm">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200 rounded-xl shadow-xl">
                    <SelectItem value="usd">USD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Notifications */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-ink flex items-center justify-center text-[#5984c4] shadow-md shadow-[#5984c4]/10">
              <Bell size={14} />
            </div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-ink">Notifications</h2>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl flex flex-col gap-6">

            <div className="flex items-center justify-between gap-6 py-2">
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-sm font-bold text-ink">Marketing Emails</span>
                <span className="text-xs text-[#8A8A8A]">Receive updates on new products, research, and exclusive sales.</span>
              </div>
              <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setMarketingEmails(true)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-[0.1em] transition-all ${marketingEmails ? 'bg-[#5984c4] shadow-sm text-white' : 'text-slate-500 hover:text-ink'}`}
                >
                  On
                </button>
                <button
                  type="button"
                  onClick={() => setMarketingEmails(false)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-[0.1em] transition-all ${!marketingEmails ? 'bg-[#5984c4] shadow-sm text-white' : 'text-slate-500 hover:text-ink'}`}
                >
                  Off
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100" />

            <div className="flex items-center justify-between gap-6 py-2">
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-sm font-bold text-ink">Order SMS Updates</span>
                <span className="text-xs text-[#8A8A8A]">Get real-time text messages about your order shipments and deliveries.</span>
              </div>
              <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setOrderSms(true)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-[0.1em] transition-all ${orderSms ? 'bg-[#5984c4] shadow-sm text-white' : 'text-slate-500 hover:text-ink'}`}
                >
                  On
                </button>
                <button
                  type="button"
                  onClick={() => setOrderSms(false)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-[0.1em] transition-all ${!orderSms ? 'bg-[#5984c4] shadow-sm text-white' : 'text-slate-500 hover:text-ink'}`}
                >
                  Off
                </button>
              </div>
            </div>

          </div>
        </motion.section>

      </div>

      <UpdatePasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} />
    </motion.div>
  )
}
