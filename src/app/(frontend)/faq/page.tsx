'use client'

import React, { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeUp } from '@/components/motion/FadeUp'
import { EmptyState } from '@/components/shared/EmptyState'
import { Input } from '@/components/ui/input'

const FAQ_DATA = [
  {
    title: 'Products & Purity',
    items: [
      { q: 'What is research-use-only?', a: 'Our products are strictly intended for in-vitro and laboratory research applications. They are not intended for human consumption, therapeutic use, or any form of diagnostic application. By purchasing, you acknowledge the inherent risks associated with these compounds and your responsibility to handle them in a controlled laboratory environment.' },
      { q: 'What purity level is research-grade?', a: 'We guarantee a minimum of 99% purity across our entire catalog. This standard is enforced through mandatory third-party HPLC (High-Performance Liquid Chromatography) and LC-MS (Liquid Chromatography-Mass Spectrometry) testing.' },
      { q: 'How are COAs verified?', a: 'Every batch synthesized undergoes independent analysis at an ISO-certified US laboratory. The resulting Certificate of Analysis (COA) verifies both the exact sequence structure and the overall purity percentage. COAs are publicly available in our verification library and included with every shipment.' }
    ]
  },
  {
    title: 'Ordering & Shipping',
    items: [
      { q: 'Do you ship internationally?', a: 'Yes, we offer worldwide shipping. However, it is the sole responsibility of the researcher to ensure that the importation of research peptides complies with all local, state, and national regulations.' },
      { q: 'What is the cutoff time for same-day shipping?', a: 'Orders successfully placed and verified before 2:00 PM EST (Monday through Friday) will be dispatched on the same business day.' },
      { q: 'Is a signature required for delivery?', a: 'To ensure the secure chain of custody for research materials, all orders exceeding $500 automatically require a signature upon delivery.' }
    ]
  },
  {
    title: 'Research Use',
    items: [
      { q: 'Can I use these for human consumption?', a: 'No. Under no circumstances should these compounds be used for human consumption. Any communication indicating intent to misuse these products will result in immediate cancellation of your order and a permanent ban from our platform.' },
      { q: 'How should I store unmixed peptides?', a: 'Lyophilized (powdered) peptides should be stored in a freezer at -20°C away from light and moisture. For short-term storage (under 30 days), refrigeration at 4°C is acceptable.' }
    ]
  },
  {
    title: 'Account',
    items: [
      { q: 'How do I access my past COAs?', a: 'Log in to your account dashboard and navigate to your Order History. Digital copies of the specific COAs associated with your batches are available for download there.' },
      { q: 'How do I reset my password?', a: 'Click the "Forgot Password" link on the login portal. You will receive a secure reset link via the email associated with your account.' }
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const filteredCategories = FAQ_DATA.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0)

  return (
    <main
      className="min-h-screen bg-[#FAFAFB] bg-[url('https://res.cloudinary.com/dgrrovta3/image/upload/v1781565551/section-bg_mn6snk.webp')] bg-fixed bg-cover bg-center bg-no-repeat max-[768px]:bg-scroll"
    >
      {/* Header & Search */}
      <motion.section
        className="pt-32 lg:pt-40 pb-12 px-6 max-w-[800px] mx-auto flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center text-center" variants={itemVariants}>
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-[0.9rem] font-medium tracking-[0.05em] text-accent uppercase">Support</span>
          </div>
          <h1 className="m-0 text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] font-normal text-[#222222] mb-6 max-[768px]:text-[2rem] max-[480px]:text-[1.75rem]">
            FREQUENTLY ASKED <br /> QUESTIONS
          </h1>
          <p className="text-base text-[#666666] text-center mb-10 max-w-xl leading-relaxed">
            Everything you need to know about our research compounds, purity standards, and ordering guidelines.
          </p>

          <div className="relative w-full max-w-[540px]">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
            <Input
              type="text"
              placeholder="Search for an answer..."
              className="w-full h-14 pl-14 pr-6 rounded-xl bg-white border-line shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] focus:border-[#222222] focus:ring-0 transition-all duration-300 text-base placeholder:text-[#999]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* FAQ Accordions */}
      <section className="px-4 md:px-6 max-w-[800px] mx-auto pb-32">
        {filteredCategories.length === 0 ? (
          <FadeUp>
            <div className="py-24 bg-white rounded-xl border border-line shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex items-center justify-center">
              <EmptyState
                icon={SearchIcon}
                title="No results found"
                description={`We couldn't find any answers matching "${searchQuery}".`}
              />
            </div>
          </FadeUp>
        ) : (
          <motion.div
            className="flex flex-col gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {filteredCategories.map((category) => (
              <motion.div key={category.title} variants={itemVariants}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-[0.9rem] font-medium tracking-[0.05em] text-accent uppercase">{category.title}</span>
                </div>

                <div className="flex flex-col gap-3">
                  {category.items.map((item, i) => {
                    const key = `${category.title}-${i}`
                    const isOpen = !!openItems[key]
                    return (
                      <motion.div
                        key={key}
                        variants={itemVariants}
                        className={`cursor-pointer overflow-hidden rounded-xl border bg-white p-6 px-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d0d0d0] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] max-[768px]:rounded-[10px] max-[768px]:px-5 max-[768px]:py-[1.2rem] ${
                          isOpen ? 'border-[#222222]' : 'border-line'
                        }`}
                        onClick={() => toggleItem(key)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="m-0 pr-5 text-[1.2rem] font-medium text-[#111111] max-[768px]:pr-3 max-[768px]:text-base max-[480px]:text-[0.95rem]">
                            {item.q}
                          </h3>
                          <div
                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 max-[768px]:h-7 max-[768px]:w-7 ${
                              isOpen ? 'bg-[#111111] text-white' : 'bg-black/[0.03]'
                            }`}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                        </div>
                        <div
                          className={`transition-all duration-300 ease-in-out ${isOpen ? 'mt-4' : 'mt-0'}`}
                          style={{
                            maxHeight: isOpen ? '300px' : '0',
                            opacity: isOpen ? 1 : 0,
                          }}
                        >
                          <p className="m-0 text-base leading-[1.6] text-[#666666] max-[768px]:text-[0.95rem] max-[480px]:text-[0.9rem]">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  )
}
