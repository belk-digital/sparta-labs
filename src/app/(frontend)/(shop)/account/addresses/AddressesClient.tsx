'use client'

import React, { useState } from 'react'
import { Plus, Edit2, Trash2, MapPin, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { motion } from 'framer-motion'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export interface AddressItem {
  id: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District Of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
]

export interface AccountAddressesProps {
  addresses: AddressItem[];
}

export function AddressesClient({ addresses }: AccountAddressesProps) {
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isPending, startTransition] = React.useTransition()

  const editingAddress = editingId ? addresses.find(a => a.id === editingId) : null
  const filteredStates = US_STATES.filter(state =>
    state.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.value.toLowerCase().includes(searchQuery.toLowerCase())
  )

  async function handleAddSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        if (editingId) {
          const { updateAddress } = await import('./actions')
          const result = await updateAddress(editingId, formData)
          if (!result?.success) {
            toast.error(result?.error || 'Failed to update address')
            return
          }
          toast.success('Address updated successfully')
        } else {
          const { addAddress } = await import('./actions')
          const result = await addAddress(formData)
          if (!result?.success) {
            toast.error(result?.error || 'Failed to save address')
            return
          }
          toast.success('Address saved successfully')
        }
        setOpen(false)
        setEditingId(null)
      } catch (error: any) {
        toast.error(error.message || 'An unexpected error occurred')
      }
    })
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      const { deleteAddress } = await import('./actions')
      await deleteAddress(id)
      toast.success('Address deleted successfully')
    })
  }

  function handleEdit(id: string) {
    setEditingId(id)
    setOpen(true)
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) {
      setTimeout(() => {
        setEditingId(null)
        setSearchQuery('')
      }, 300)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col w-full"
    >

      {/* Header */}
      <div className="flex flex-col gap-2 mb-10 border-b border-slate-200 pb-6">
        <h1 className={`text-3xl md:text-4xl text-ink font-bold tracking-tighter ${spaceGrotesk.className}`}>
          Saved Addresses
        </h1>
        <p className="text-sm text-[#8A8A8A]">Manage where your lab equipment and peptides are shipped.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Add New Address */}
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <button
              onClick={() => setEditingId(null)}
              className="h-full min-h-[280px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center gap-5 text-[#8A8A8A] hover:text-ink hover:border-[#5984c4] hover:bg-slate-100 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center group-hover:bg-[#5984c4] group-hover:text-white group-hover:border-[#5984c4] transition-all duration-300 shadow-sm">
                <Plus size={22} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Add New Address</span>
            </button>
          </DialogTrigger>

          {/* Address Modal */}
          <DialogContent className="sm:max-w-[600px] bg-white border-0 p-0 overflow-hidden rounded-3xl shadow-2xl">
            <form action={handleAddSubmit} key={editingId || 'new'}>
              <div className="p-8 border-b border-slate-200 bg-slate-50">
                <DialogHeader>
                  <DialogTitle className={`text-2xl font-bold tracking-tight text-ink ${spaceGrotesk.className}`}>
                    {editingId ? 'Edit Address' : 'Add a New Address'}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-[#8A8A8A] mt-2">
                    {editingId ? 'Update your shipping details below.' : 'Fill in your shipping details below.'}
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-8 overflow-y-auto max-h-[60vh] custom-scrollbar" data-lenis-prevent>
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">First Name</Label>
                    <Input name="firstName" id="firstName" defaultValue={editingAddress?.firstName || ''} required placeholder="First Name" className="h-12 bg-white border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">Last Name</Label>
                    <Input name="lastName" id="lastName" defaultValue={editingAddress?.lastName || ''} required placeholder="Last Name" className="h-12 bg-white border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl" />
                  </div>
                  <div className="col-span-2 flex flex-col gap-2">
                    <Label htmlFor="line1" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">Street Address</Label>
                    <Input name="line1" id="line1" defaultValue={editingAddress?.line1 || ''} required placeholder="Street Address" className="h-12 bg-white border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl" />
                  </div>
                  <div className="col-span-2 flex flex-col gap-2">
                    <Label htmlFor="line2" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">Apartment, suite, etc. (optional)</Label>
                    <Input name="line2" id="line2" defaultValue={editingAddress?.line2 || ''} placeholder="Apartment, suite, etc." className="h-12 bg-white border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="city" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">City</Label>
                    <Input name="city" id="city" defaultValue={editingAddress?.city || ''} required placeholder="City" className="h-12 bg-white border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="state" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">State</Label>
                    <Select name="state" defaultValue={editingAddress?.state || undefined}>
                      <SelectTrigger id="state" className="h-12 bg-white border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl text-sm">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200 rounded-xl shadow-xl max-h-[300px]">
                        <div className="p-2 sticky top-0 bg-white z-10 border-b border-slate-100 mb-1">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A8A8A] size-3.5" />
                            <Input
                              placeholder="Search states..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onKeyDown={(e) => e.stopPropagation()}
                              onClick={(e) => e.stopPropagation()}
                              className="h-8 pl-8 text-xs border-none bg-slate-50 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg"
                            />
                          </div>
                        </div>
                        {filteredStates.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                        {filteredStates.length === 0 && (
                          <div className="py-4 text-center text-[9px] text-[#8A8A8A] font-medium uppercase tracking-wider">No states found</div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="zip" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">ZIP Code</Label>
                    <Input name="zip" id="zip" defaultValue={editingAddress?.postalCode || ''} required placeholder="ZIP Code" className="h-12 bg-white border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone" className="text-[9px] text-[#8A8A8A] font-bold uppercase tracking-[0.12em]">Phone</Label>
                    <Input name="phone" id="phone" defaultValue={editingAddress?.phone || ''} required type="tel" placeholder="(555) 555-5555" className="h-12 bg-white border-slate-200 focus:border-[#5984c4] focus:ring-[#5984c4] rounded-xl" />
                  </div>
                  <div className="col-span-2 flex items-center space-x-3 mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <Checkbox name="isDefault" id="default" defaultChecked={editingAddress?.isDefault || false} className="border-slate-300 data-[state=checked]:bg-[#5984c4] data-[state=checked]:border-[#5984c4] rounded-md" />
                    <label htmlFor="default" className="text-sm font-medium leading-none text-[#4A4A4A]">
                      Set as default shipping address
                    </label>
                  </div>
                </div>
              </div>

              <DialogFooter className="p-8 border-t border-slate-200 bg-white flex sm:justify-end gap-3">
                <DialogClose asChild>
                  <button type="button" className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A8A8A] hover:text-ink transition-colors">
                    Cancel
                  </button>
                </DialogClose>
                <button disabled={isPending} type="submit" className="px-8 py-3 bg-ink text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.12em] hover:bg-[#5984c4] transition-all disabled:opacity-50">
                  {isPending ? 'Saving...' : 'Save Address'}
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Existing Addresses */}
        {addresses.map((address, i) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 + 0.1 }}
            className="relative p-7 border border-slate-200 rounded-2xl flex flex-col justify-between bg-white hover:border-[#5984c4] hover:shadow-lg hover:shadow-[#5984c4]/10 transition-all duration-500 group"
          >
            {address.isDefault && (
              <div className="absolute top-5 right-5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Default
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-[#8A8A8A] group-hover:bg-[#5984c4] group-hover:text-white group-hover:border-[#5984c4] transition-all duration-300">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col gap-1 text-sm text-[#8A8A8A] leading-relaxed">
                <span className={`text-lg text-ink font-bold tracking-tight mb-1.5 ${spaceGrotesk.className}`}>{address.firstName} {address.lastName}</span>
                <span className="text-xs">{address.line1}</span>
                {address.line2 && <span className="text-xs">{address.line2}</span>}
                <span className="text-xs">{address.city}, {address.state} {address.postalCode}</span>
                <span className="text-xs">{address.country}</span>
                <span className="mt-3 inline-flex px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[#4A4A4A] text-[10px] self-start font-medium">{address.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-6 mt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button disabled={isPending} onClick={() => handleEdit(address.id)} className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-[#5984c4] hover:text-white rounded-xl text-ink py-3 text-[9px] font-bold uppercase tracking-[0.12em] transition-all disabled:opacity-50">
                <Edit2 size={13} />
                Edit
              </button>
              <button disabled={isPending} onClick={() => handleDelete(address.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-600 rounded-xl hover:text-white text-red-600 py-3 text-[9px] font-bold uppercase tracking-[0.12em] transition-all disabled:opacity-50">
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}

      </div>
    </motion.div>
  )
}
