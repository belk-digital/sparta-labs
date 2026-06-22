'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeUp } from '@/components/motion/FadeUp'
import { StaggerChildren, staggerItemVariants } from '@/components/motion/StaggerChildren'
import { ArrowLeft, ShieldCheck, Info, Beaker, Thermometer, Syringe, Droplets, FlaskConical, AlertTriangle, BookOpen, Calculator, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { FaqItem } from '@/components/shared/FaqCarousel'
import FAQ from '@/components/FAQ'

const CALCULATOR_FAQS: FaqItem[] = [
  {
    question: "How do I calculate how many IU to draw for my peptide dose?",
    answer: "Use the three-step formula built into the calculator above: (1) Divide your peptide amount in mcg by the BAC water volume in ml to get the concentration in mcg/ml. (2) Divide your target dose in mcg by that concentration to get the draw volume in ml. (3) Multiply the draw volume by 100 to convert to IU on a U-100 insulin syringe. Example: a 250 mcg dose from a 5mg vial with 2ml BAC water = 10 IU draw."
  },
  {
    question: "How much bacteriostatic water should I add to a 5mg peptide vial?",
    answer: "The most common research choices are 1ml, 2ml, or 3ml. Adding 2ml to a 5mg vial produces a standard 2,500 mcg/ml concentration — giving you 10 IU per 250 mcg dose on a U-100 syringe. More water lowers concentration (larger, easier-to-read draws); less water raises concentration (smaller, more precise draws). Use the calculator above to instantly see how any water volume affects your dose IU."
  },
  {
    question: "How long can reconstituted peptides be stored in the refrigerator?",
    answer: "Most reconstituted research peptides remain stable for 2 to 4 weeks when stored upright in a refrigerator at 2–8°C. Bacteriostatic water (containing 0.9% benzyl alcohol) significantly extends stability by inhibiting microbial growth. Never freeze a reconstituted solution; instead, store unreconstituted lyophilized peptides in a freezer at −20°C until you are ready to reconstitute."
  },
  {
    question: "What is the difference between mcg and mg in peptide dosing?",
    answer: "1 milligram (mg) equals 1,000 micrograms (mcg). Research peptide vials are typically labeled in mg (e.g., 5mg) while individual research doses are often specified in mcg (e.g., 250 mcg). To convert: divide mg by 1,000 to get mcg. The calculator above handles this conversion automatically when you use the mg/mcg toggle — enter whichever unit your label shows."
  },
  {
    question: "Should I shake or swirl a peptide vial after adding bacteriostatic water?",
    answer: "Always swirl gently — never shake. Vigorous shaking forces air into the solution and can denature (structurally unfold) the peptide chains, compromising the compound. Instead, inject BAC water slowly along the inner glass wall, then gently roll or swirl the vial until the lyophilized powder fully dissolves. Stubborn powder may need 1–2 minutes of gentle rotation."
  },
  {
    question: "Can I use sterile water instead of bacteriostatic water?",
    answer: "Sterile water is technically usable for single-use reconstitution in laboratory research, but bacteriostatic water (BAC water) is the research standard for multi-use vials. BAC water contains 0.9% benzyl alcohol, which inhibits bacterial and fungal growth between extractions, significantly extending the stable research window of the reconstituted solution. For multi-draw vials, BAC water is always the preferred diluent."
  },
  {
    question: "What does the Required Draw (IU) output mean?",
    answer: "The Required Draw (IU) is the exact number on the tick-mark scale of your U-100 insulin syringe to pull the plunger back to. On any U-100 syringe, the scale runs from 0 to 100 IU, where 100 IU equals 1 ml of total volume. If the calculator shows 10 IU, draw the plunger to the '10' mark on your syringe. This is your entire dose volume for that administration in a research protocol."
  }
]

type SyringeVolume = 0.3 | 0.5 | 1.0;

export default function PeptideCalculatorPage() {
  // --- State ---
  const [peptideAmount, setPeptideAmount] = useState('5')
  
  const [waterMl, setWaterMl] = useState('2')
  
  const [desiredDose, setDesiredDose] = useState('250')

  const [syringeVolume, setSyringeVolume] = useState<SyringeVolume>(1.0)

  // --- Math Logic ---
  const vAmt = parseFloat(peptideAmount) || 0
  const wMl = parseFloat(waterMl) || 0
  const dAmt = parseFloat(desiredDose) || 0

  const totalPeptideMcg = vAmt * 1000
  const targetDoseMcg = dAmt

  let isValid = totalPeptideMcg > 0 && wMl > 0 && targetDoseMcg > 0
  let concentrationStr = '—'
  let volumePerDoseStr = '—'
  let tickMarksStr = '0'
  let dosesPerVialStr = '—'
  let errorMsg = ''
  
  let fillPercentage = 0
  const maxUnits = syringeVolume * 100

  if (isValid) {
    const concentration = totalPeptideMcg / wMl
    concentrationStr = `${concentration.toLocaleString(undefined, { maximumFractionDigits: 1 })} mcg/ml`
    
    const volumePerDose = targetDoseMcg / concentration
    volumePerDoseStr = `${volumePerDose.toLocaleString(undefined, { maximumFractionDigits: 3 })} ml`
    
    const tickMarks = volumePerDose * 100
    tickMarksStr = tickMarks.toLocaleString(undefined, { maximumFractionDigits: 1 })
    
    const dosesPerVial = wMl / volumePerDose
    dosesPerVialStr = dosesPerVial.toLocaleString(undefined, { maximumFractionDigits: 1 })

    if (volumePerDose > syringeVolume) {
      errorMsg = `Dose volume (${volumePerDose.toFixed(2)}ml) exceeds syringe capacity (${syringeVolume}ml).`
      tickMarksStr = 'ERR'
      fillPercentage = 100
    } else {
      fillPercentage = (tickMarks / maxUnits) * 100
    }
  }

  const getSyringeTicks = () => {
    const steps = syringeVolume === 1.0 ? 10 : 5;
    const ticks = [];
    for (let i = maxUnits; i >= 0; i -= steps) {
      ticks.push(i);
    }
    return ticks;
  }

  return (
    <main className="bg-white min-h-screen">
      
      {/* ============================================
          SECTION 1: CALCULATOR (REDESIGNED)
          ============================================ */}
      <section 
        className="w-full min-h-screen text-white relative flex flex-col items-center justify-center pt-24 lg:pt-32 pb-16 px-4 md:px-8 lg:px-10 overflow-hidden font-sans bg-cover bg-top lg:bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://res.cloudinary.com/denskvdyt/image/upload/v1782105781/peptide-calculator-image_hurk1s.webp')" }}
      >
        
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />

        <div className="w-full relative z-10 flex flex-col gap-10">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 w-full">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="text-red-500 text-[11px] font-bold tracking-[0.15em] uppercase">Tools & Resources</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight uppercase">
                Research Dosing <br className="hidden sm:block" /> Calculator
              </h1>
              <p className="text-gray-400 text-sm max-w-lg mt-2 leading-relaxed">
                Precision peptide reconstitution and dosing calculations for laboratory research applications.
              </p>
            </div>

            {/* Disclaimer Box */}
            <div className="flex items-center gap-4 bg-[#111111]/15 backdrop-blur-md border border-white/5 rounded-2xl p-5 max-w-sm mt-0 lg:mt-6 shadow-xl">
              <ShieldCheck className="w-8 h-8 text-[#dca54c] shrink-0 opacity-70" />
              <p className="text-[#a0a0a0] text-[11px] leading-relaxed">
                <strong className="text-gray-300 uppercase font-bold block mb-1 tracking-wider text-[10px]">For research use only</strong>
                Not for human consumption. <br/> For laboratory research applications only.
              </p>
            </div>
          </div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6 w-full">
            
            {/* Left Column: Input Parameters */}
            <div className="flex flex-col bg-[#111111]/20 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="p-8 relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-red-600 text-[11px] font-bold tracking-[0.15em] uppercase">Input Parameters</h2>
                  <button 
                    onClick={() => {
                      setPeptideAmount('')
                      setWaterMl('')
                      setDesiredDose('')
                      setSyringeVolume(1.0)
                    }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white text-[11px] uppercase tracking-wider transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Clear all
                  </button>
                </div>

                <div className="flex flex-col gap-8 flex-1">
                  
                  {/* Peptide Strength */}
                  <div className="flex flex-col gap-3">
                    <label className="text-gray-400 text-[10px] uppercase tracking-widest flex items-center gap-1.5 font-bold">Peptide Strength <Info className="w-3 h-3 opacity-50" /></label>
                    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 transition-colors focus-within:border-red-500/50">
                      <input 
                        type="number"
                        min="0"
                        step="any"
                        value={peptideAmount}
                        onChange={e => setPeptideAmount(e.target.value)}
                        className="bg-transparent text-white text-xl font-bold w-full focus:outline-none placeholder-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="0"
                      />
                      <span className="text-gray-500 text-sm font-bold uppercase shrink-0 tracking-widest">MG</span>
                    </div>
                  </div>

                  {/* Bacteriostatic Water Volume */}
                  <div className="flex flex-col gap-3">
                    <label className="text-gray-400 text-[10px] uppercase tracking-widest flex items-center gap-1.5 font-bold">Bacteriostatic Water Volume <Info className="w-3 h-3 opacity-50" /></label>
                    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 transition-colors focus-within:border-red-500/50">
                      <input 
                        type="number"
                        min="0"
                        step="any"
                        value={waterMl}
                        onChange={e => setWaterMl(e.target.value)}
                        className="bg-transparent text-white text-xl font-bold w-full focus:outline-none placeholder-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="0"
                      />
                      <span className="text-gray-500 text-sm font-bold uppercase shrink-0 tracking-widest">ML</span>
                    </div>
                  </div>

                  {/* Target Dose */}
                  <div className="flex flex-col gap-3">
                    <label className="text-gray-400 text-[10px] uppercase tracking-widest flex items-center gap-1.5 font-bold">Target Dose Per Administration <Info className="w-3 h-3 opacity-50" /></label>
                    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 transition-colors focus-within:border-red-500/50">
                      <input 
                        type="number"
                        min="0"
                        step="any"
                        value={desiredDose}
                        onChange={e => setDesiredDose(e.target.value)}
                        className="bg-transparent text-white text-xl font-bold w-full focus:outline-none placeholder-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="0"
                      />
                      <span className="text-gray-500 text-sm font-bold uppercase shrink-0 tracking-widest">MCG</span>
                    </div>
                  </div>

                  {/* Syringe Capacity */}
                  <div className="flex flex-col gap-4 mt-2">
                    <label className="text-gray-400 text-[10px] uppercase tracking-widest flex items-center gap-1.5 font-bold">Syringe Capacity <Info className="w-3 h-3 opacity-50" /></label>
                    <div className="flex items-center justify-between gap-4">
                      {[
                        {label: '30 IU', v: 0.3},
                        {label: '50 IU', v: 0.5},
                        {label: '100 IU', v: 1.0},
                      ].map(opt => (
                        <button type="button" key={opt.v} onClick={() => setSyringeVolume(opt.v as SyringeVolume)} className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${syringeVolume === opt.v ? 'border-red-600 bg-transparent' : 'border-[#444] bg-[#111] group-hover:border-gray-500'}`}>
                            {syringeVolume === opt.v && <div className="w-2 h-2 rounded-full bg-red-600" />}
                          </div>
                          <span className={`text-sm ${syringeVolume === opt.v ? 'text-white font-bold tracking-wider' : 'text-gray-500 font-medium tracking-wider group-hover:text-gray-300'}`}>{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Right Column: Results */}
            <div className="flex flex-col lg:flex-row gap-8 bg-[#111111]/20 backdrop-blur-xl border border-white/5 rounded-2xl p-8 lg:p-10 relative overflow-hidden shadow-2xl">
              
              {/* Results Text/Graphs Area */}
              <div className="flex-1 flex flex-col justify-between z-10 w-full">
                
                {/* Required Draw */}
                <div className="flex flex-col mb-12">
                  <h3 className="text-gray-400 text-[11px] font-bold tracking-widest uppercase mb-4">Required Draw (IU)</h3>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className={`font-sans leading-none tracking-tighter ${errorMsg ? 'text-6xl text-red-500' : 'text-8xl lg:text-9xl text-white'}`}>
                      {tickMarksStr}
                    </span>
                    {!errorMsg && <span className="text-3xl lg:text-5xl text-gray-600 italic font-sans">IU</span>}
                  </div>
                  
                  {/* Slider Visualizer (0 to 100 IU) */}
                  <div className="w-full relative h-1.5 bg-[#222] rounded-full mt-2 flex items-center">
                    <div 
                      className="absolute left-0 h-1.5 bg-red-600 rounded-l-full shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all duration-500" 
                      style={{ width: `${Math.min(fillPercentage, 100)}%` }} 
                    />
                    {/* Thumb */}
                    <div 
                      className="absolute w-3.5 h-3.5 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,1)] -ml-[7px] transition-all duration-500"
                      style={{ left: `${Math.min(fillPercentage, 100)}%` }}
                    />
                    {/* Ticks underneath */}
                    <div className="absolute top-6 left-0 w-full flex justify-between text-[#555] text-[10px] font-mono tracking-wider">
                      {[...Array(11)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="w-px h-1.5 bg-[#333] absolute -top-4" />
                          {i === 0 && '0 IU'}
                          {i === 10 && '100 IU'}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dosing Overview */}
                <div className="flex flex-col mb-12 mt-8">
                  <h3 className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-4">Dosing Overview</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#111111]/20 backdrop-blur-lg border border-white/5 rounded-xl p-5 lg:p-6 flex flex-col justify-between gap-5 transition-colors hover:border-red-500/30">
                      <div className="flex items-center gap-3 text-gray-400">
                        <Thermometer className="w-4 h-4 text-red-600" />
                        <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Solution <br/> Concentration</span>
                      </div>
                      <div>
                        <div className="text-white text-3xl font-sans tracking-tight">{concentrationStr.split(' ')[0]}</div>
                        <div className="text-gray-500 text-[11px] font-mono mt-1 tracking-widest">mcg/ml</div>
                      </div>
                    </div>
                    <div className="bg-[#111111]/20 backdrop-blur-lg border border-white/5 rounded-xl p-5 lg:p-6 flex flex-col justify-between gap-5 transition-colors hover:border-red-500/30">
                      <div className="flex items-center gap-3 text-gray-400">
                        <Droplets className="w-4 h-4 text-red-600" />
                        <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Draw <br/> Volume</span>
                      </div>
                      <div>
                        <div className="text-white text-3xl font-sans tracking-tight">{volumePerDoseStr.split(' ')[0]}</div>
                        <div className="text-gray-500 text-[11px] font-mono mt-1 tracking-widest">ml</div>
                      </div>
                    </div>
                    <div className="bg-[#111111]/20 backdrop-blur-lg border border-white/5 rounded-xl p-5 lg:p-6 flex flex-col justify-between gap-5 transition-colors hover:border-red-500/30">
                      <div className="flex items-center gap-3 text-gray-400">
                        <FlaskConical className="w-4 h-4 text-red-600" />
                        <span className="text-[9px] font-bold uppercase tracking-widest leading-tight">Total Doses <br/> Per Vial</span>
                      </div>
                      <div>
                        <div className="text-white text-3xl font-sans tracking-tight">{dosesPerVialStr}</div>
                        <div className="text-gray-500 text-[11px] font-mono mt-1 tracking-widest">doses</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dosing Visualization (Desktop) */}
                <div className="hidden lg:flex flex-col mt-auto">
                  <h3 className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-5">Dosing Visualization</h3>
                  <div className="flex justify-between items-end mb-3">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-[9px] uppercase tracking-widest font-bold mb-1">Target Dose</span>
                      <span className="text-red-500 font-bold text-base tracking-wider">{targetDoseMcg} mcg</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-gray-500 text-[9px] uppercase tracking-widest font-bold mb-1">Required Draw</span>
                      <span className="text-red-500 font-bold text-base tracking-wider">{tickMarksStr} IU</span>
                    </div>
                  </div>
                  {/* Visualizer Slider */}
                  <div className="w-full h-1.5 bg-[#222] rounded-full relative flex items-center">
                     <div 
                      className="absolute left-0 h-1.5 bg-red-600 rounded-l-full shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all duration-500" 
                      style={{ width: `${Math.min(fillPercentage, 100)}%` }} 
                    />
                    <div 
                      className="absolute w-2.5 h-2.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)] -ml-[5px] transition-all duration-500"
                      style={{ left: `${Math.min(fillPercentage, 100)}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Separator for desktop */}
              <div className="hidden lg:block w-px bg-[#222] mx-4" />

              {/* Syringe Graphic Area */}
              <div className="w-full lg:w-48 flex flex-col items-center justify-between shrink-0 z-10 pt-4 mt-12 lg:mt-0">
                <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-8 lg:mb-16">{syringeVolume * 100} IU SYRINGE</span>
                
                {/* Syringe Graphic Container */}
                <div className="relative h-[260px] lg:h-[320px] w-14 flex justify-center mb-8 mt-8 lg:mt-12">
                   <div className="w-12 h-full relative z-10 flex flex-col items-center">
                    
                    {/* Measurements (Right side of barrel) */}
                    <div className="absolute left-full ml-3 top-0 bottom-0 flex flex-col justify-between py-[4px] pointer-events-none text-left z-10 h-full">
                      {getSyringeTicks().map((tick, i) => {
                        const labelInterval = syringeVolume === 1.0 ? 20 : 10
                        const showLabel = tick % labelInterval === 0
                        return (
                          <div key={i} className="flex items-center gap-1.5 h-[10px]">
                            <div className={`h-px ${showLabel ? 'w-2.5 bg-gray-400' : 'w-1.5 bg-gray-600'}`} />
                            {showLabel && (
                              <span className="text-[9px] font-mono leading-none text-gray-400">
                                {tick}
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Plunger */}
                    <motion.div 
                      className="absolute left-1/2 -translate-x-1/2 w-3.5 bg-gradient-to-r from-gray-400 via-white to-gray-400 border-x border-gray-300 z-0 origin-bottom flex justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]"
                      style={{ bottom: "100%" }}
                      animate={{ height: `${fillPercentage}%`, minHeight: '20px' }}
                      transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                    >
                      <div className="absolute -top-3 w-10 h-3 bg-gradient-to-b from-gray-100 via-gray-400 to-gray-600 rounded-sm border border-gray-300 shadow-[0_2px_5px_rgba(0,0,0,0.5),_inset_0_1px_2px_rgba(255,255,255,0.8)] flex justify-center items-center">
                        <div className="w-6 h-px bg-gray-500/50" />
                      </div>
                    </motion.div>

                    {/* Flanges */}
                    <div className="w-16 h-3 bg-gradient-to-b from-gray-100 via-gray-400 to-gray-500 rounded-[3px] absolute top-0 -translate-y-1/2 border border-gray-300 z-20 shadow-[0_4px_10px_rgba(0,0,0,0.8),_inset_0_1px_2px_rgba(255,255,255,0.9)]" />
                    
                    {/* Barrel */}
                    <div className="w-full h-full border-x border-t border-white/20 relative bg-gradient-to-r from-white/10 via-black/50 to-white/10 backdrop-blur-md overflow-hidden flex flex-col justify-end z-10 rounded-t-md shadow-[inset_0_0_10px_rgba(255,255,255,0.1),_inset_3px_0_10px_rgba(0,0,0,0.8)]">
                      
                      {/* Glass specular highlight */}
                      <div className="absolute left-[15%] top-0 bottom-0 w-[4px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-40 blur-[1px]" />
                      <div className="absolute right-[5%] top-0 bottom-0 w-[2px] bg-white/10 pointer-events-none z-40 blur-[0.5px]" />

                      {/* Rubber Tip */}
                      <motion.div 
                        className="absolute left-0 right-0 h-5 z-30 flex flex-col justify-between bg-gradient-to-r from-[#000] via-[#333] to-[#000]"
                        animate={{ bottom: `${fillPercentage}%` }}
                        transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                      >
                         <div className="w-full h-1.5 bg-gradient-to-r from-[#111] via-[#555] to-[#111] rounded-t-sm shadow-[0_2px_4px_rgba(0,0,0,0.8),_inset_0_1px_1px_rgba(255,255,255,0.2)]" />
                         <div className="w-full h-1.5 bg-gradient-to-r from-[#000] via-[#222] to-[#000] rounded-b-sm shadow-[0_-2px_4px_rgba(0,0,0,0.8)]" />
                      </motion.div>
                      
                      {/* Liquid */}
                      <motion.div
                        className={`w-full ${errorMsg ? 'bg-red-900/90' : 'bg-gradient-to-r from-red-700 via-red-600 to-red-700'} relative z-20`}
                        initial={{ height: 0 }}
                        animate={{ height: `${fillPercentage}%` }}
                        transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                        style={{ originY: 1 }}
                      >
                        <div className="absolute top-0 w-full h-px bg-red-400/60" />
                      </motion.div>
                      
                      {/* Ticks overlay inside barrel */}
                      <div className="absolute inset-0 flex flex-col justify-between py-[4px] pointer-events-none z-40 h-full">
                        {getSyringeTicks().map((tick, i) => {
                          const isMajor = tick % (syringeVolume === 1.0 ? 20 : 10) === 0;
                          const isMid = tick % (syringeVolume === 1.0 ? 10 : 5) === 0;
                          let width = 'w-1/4';
                          if (isMajor) width = 'w-[60%]';
                          else if (isMid) width = 'w-[40%]';
                          
                          return (
                            <div key={i} className="flex items-center w-full px-1.5 justify-end">
                              <div className={`h-[1px] bg-white/30 ${width}`} />
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Shoulder & Needle */}
                    <div className="flex flex-col items-center relative z-0 w-full">
                      <div className="w-full h-6 relative flex justify-center z-20 overflow-hidden bg-gradient-to-r from-[#111] via-[#555] to-[#111] border-t border-white/20 shadow-[inset_0_2px_5px_rgba(255,255,255,0.1)]" style={{ clipPath: 'polygon(0 0, 100% 0, 65% 100%, 35% 100%)' }}>
                        <div className="absolute left-[30%] top-0 bottom-0 w-[2px] bg-white/20 transform -skew-x-12 z-30 blur-[0.5px]" />
                        <motion.div
                         className={`absolute bottom-0 w-full h-full ${errorMsg ? 'bg-red-900/90' : 'bg-gradient-to-r from-red-700 via-red-600 to-red-700'}`}
                         initial={{ opacity: 0 }}
                         animate={{ opacity: fillPercentage > 0 ? 1 : 0 }}
                        />
                      </div>
                      <div className="w-1.5 h-16 bg-gradient-to-r from-gray-400 via-white to-gray-400 relative z-0 shadow-xl rounded-b-full">
                        <div className="absolute top-0 bottom-0 left-[1px] w-[1px] bg-white blur-[0.2px]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Draw Box */}
                <div className="w-full bg-[#111111]/20 backdrop-blur-lg border border-white/5 rounded-xl p-5 flex flex-col items-center justify-center">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-red-500 text-3xl font-sans leading-none tracking-tight">{tickMarksStr}</span>
                    <span className="text-red-500 text-base font-sans italic">IU</span>
                  </div>
                  <span className="text-gray-500 text-[9px] uppercase tracking-widest mt-2 font-bold">Current Draw</span>
                </div>

                {/* Dosing Visualization (Mobile) */}
              <div className="flex lg:hidden flex-col mt-8 w-full z-10 pt-8 border-t border-white/5">
                <h3 className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-5">Dosing Visualization</h3>
                <div className="flex justify-between items-end mb-3">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[9px] uppercase tracking-widest font-bold mb-1">Target Dose</span>
                    <span className="text-red-500 font-bold text-base tracking-wider">{targetDoseMcg} mcg</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-gray-500 text-[9px] uppercase tracking-widest font-bold mb-1">Required Draw</span>
                    <span className="text-red-500 font-bold text-base tracking-wider">{tickMarksStr} IU</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-[#222] rounded-full relative flex items-center">
                   <div 
                    className="absolute left-0 h-1.5 bg-red-600 rounded-l-full shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all duration-500" 
                    style={{ width: `${Math.min(fillPercentage, 100)}%` }} 
                  />
                  <div 
                    className="absolute w-2.5 h-2.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)] -ml-[5px] transition-all duration-500"
                    style={{ left: `${Math.min(fillPercentage, 100)}%` }}
                  />
                </div>
              </div>

            </div>

            </div>
          </div>

          {/* Bottom Banner */}
          <div className="w-full bg-[#111111]/20 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-4 shadow-2xl">
            <ShieldCheck className="w-6 h-6 text-[#dca54c] shrink-0" />
            <p className="text-gray-500 text-[10px] tracking-widest uppercase text-center sm:text-left leading-relaxed">
              The information provided by this calculator is for research purposes only. <br className="hidden sm:block lg:hidden" /> Sparta Labs is not responsible for misuse of this information.
            </p>
          </div>

        </div>
      </section>


      {/* ============================================
          SECTION 2: HOW TO USE — STEP-BY-STEP GUIDE
          ============================================ */}
      <section className="py-24 lg:py-48 px-6 bg-white relative">
        
        {/* Dot Grid Background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40" style={{ backgroundImage: "radial-gradient(#D6CDB8 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        {/* Rotating Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-[5%] -right-[15%] w-[50vw] h-[50vw] border-[1px] border-ink/5 rounded-full pointer-events-none z-0"
        />

        {/* Background Watermark */}
        <div className="absolute top-[10%] left-0 w-full pointer-events-none z-0 overflow-hidden">
          <span className="text-[16vw] font-sans text-ink/[0.02] leading-none select-none tracking-tighter whitespace-nowrap">
            GUIDELINE
          </span>
        </div>

        <div className="max-w-[900px] mx-auto relative z-10">
          
          <FadeUp className="text-center mb-24 lg:mb-40">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-6 font-bold">Step-by-Step Guide</h2>
            <h3 className="text-4xl lg:text-6xl font-sans text-ink tracking-tight mb-6">Step-by-Step Guide: How to Reconstitute a Research Peptide</h3>
            <p className="text-lg lg:text-xl text-ink/50 font-light leading-relaxed max-w-2xl mx-auto">
              Follow this four-step workflow to calculate the exact IU syringe mark, solution concentration, draw volume, and total doses for any research peptide reconstitution. Each step takes less than 30 seconds. The calculator handles all the math — no spreadsheet or manual formula required.
            </p>
          </FadeUp>

          <div className="relative w-full pb-[20vh]">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="sticky top-20 lg:top-32 w-full rounded-[2.5rem] lg:rounded-[3.5rem] p-10 lg:p-16 border border-ink/5 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.03)] overflow-hidden group mb-8 lg:mb-12"
              style={{ zIndex: 10 }}
            >
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.4] mix-blend-multiply z-0">
                <filter id="noiseStep1">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseStep1)" />
              </svg>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[100px_1fr] lg:grid-cols-[160px_1fr] gap-8 lg:gap-16 items-stretch">
                <div className="flex flex-row md:flex-col justify-between items-end md:items-start border-b md:border-b-0 md:border-r border-ink/10 pb-6 md:pb-0 md:pr-8">
                  <span className="text-5xl lg:text-8xl font-sans text-ink tracking-tighter leading-none">01</span>
                  <Syringe className="w-8 h-8 lg:w-12 lg:h-12 text-ink/30 mt-0 md:mt-12" strokeWidth={1} />
                </div>
                
                <div className="flex flex-col justify-center py-2 lg:py-4">
                  <h3 className="text-4xl lg:text-5xl font-sans text-ink mb-6 lg:mb-8 tracking-tight leading-[1.1]">Step 01: Select Your Insulin Syringe (0.3ml, 0.5ml, or 1.0ml)</h3>
                  <p className="text-lg lg:text-xl text-ink/70 leading-relaxed max-w-3xl font-light mb-6">
                    Begin by selecting the insulin syringe capacity you are using for this reconstitution. All three options use standard U-100 insulin syringes, where 1ml equals 100 IU. Your syringe size determines the maximum draw volume and the precision of your tick-mark readings.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-ink">
                          <th className="py-3 pr-8 text-xs font-mono uppercase tracking-widest text-ink/60">Syringe Size</th>
                          <th className="py-3 pr-8 text-xs font-mono uppercase tracking-widest text-ink/60">IU Capacity</th>
                          <th className="py-3 text-xs font-mono uppercase tracking-widest text-ink/60">Best Used For</th>
                        </tr>
                      </thead>
                      <tbody className="font-light text-ink/80">
                        <tr className="border-b border-ink/10">
                          <td className="py-4 pr-8 font-sans text-lg">0.3 ML</td>
                          <td className="py-4 pr-8 font-sans text-lg">30 IU (max)</td>
                          <td className="py-4 text-base">Micro-dose protocols requiring very precise low-volume draws</td>
                        </tr>
                        <tr className="border-b border-ink/10">
                          <td className="py-4 pr-8 font-sans text-lg">0.5 ML</td>
                          <td className="py-4 pr-8 font-sans text-lg">50 IU (max)</td>
                          <td className="py-4 text-base">General-purpose research — the most common choice for peptide reconstitution</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-8 font-sans text-lg">1.0 ML</td>
                          <td className="py-4 pr-8 font-sans text-lg">100 IU (max)</td>
                          <td className="py-4 text-base">Higher-volume draws or high-concentration solutions requiring larger measurements</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="sticky top-28 lg:top-[12.5rem] w-full rounded-[2.5rem] lg:rounded-[3.5rem] p-10 lg:p-16 border border-ink/5 bg-[#E5E9EF] shadow-[0_8px_40px_rgba(0,0,0,0.03)] overflow-hidden group mb-8 lg:mb-12"
              style={{ zIndex: 20 }}
            >
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.4] mix-blend-multiply z-0">
                <filter id="noiseStep2">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseStep2)" />
              </svg>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[100px_1fr] lg:grid-cols-[160px_1fr] gap-8 lg:gap-16 items-stretch">
                <div className="flex flex-row md:flex-col justify-between items-end md:items-start border-b md:border-b-0 md:border-r border-ink/10 pb-6 md:pb-0 md:pr-8">
                  <span className="text-5xl lg:text-8xl font-sans text-ink tracking-tighter leading-none">02</span>
                  <Beaker className="w-8 h-8 lg:w-12 lg:h-12 text-ink/30 mt-0 md:mt-12" strokeWidth={1} />
                </div>
                
                <div className="flex flex-col justify-center py-2 lg:py-4">
                  <h3 className="text-4xl lg:text-5xl font-sans text-ink mb-6 lg:mb-8 tracking-tight leading-[1.1]">Step 02: Enter Your Peptide Vial Amount (mg or mcg)</h3>
                  <p className="text-lg lg:text-xl text-ink/70 leading-relaxed max-w-3xl font-light mb-4">
                    Input the total peptide amount stated on your vial label. Use the mg/mcg toggle to match whatever unit your label uses. Most research peptide vials are labeled in milligrams (mg) — common sizes are 5mg and 10mg. If your label reads &ldquo;5,000 mcg&rdquo;, that is identical to 5mg. The calculator converts between units automatically.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="sticky top-36 lg:top-[17rem] w-full rounded-[2.5rem] lg:rounded-[3.5rem] p-10 lg:p-16 border border-ink/5 bg-[#E8EFE3] shadow-[0_8px_40px_rgba(0,0,0,0.03)] overflow-hidden group mb-8 lg:mb-12"
              style={{ zIndex: 30 }}
            >
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.4] mix-blend-multiply z-0">
                <filter id="noiseStep3">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseStep3)" />
              </svg>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[100px_1fr] lg:grid-cols-[160px_1fr] gap-8 lg:gap-16 items-stretch">
                <div className="flex flex-row md:flex-col justify-between items-end md:items-start border-b md:border-b-0 md:border-r border-ink/10 pb-6 md:pb-0 md:pr-8">
                  <span className="text-5xl lg:text-8xl font-sans text-ink tracking-tighter leading-none">03</span>
                  <Droplets className="w-8 h-8 lg:w-12 lg:h-12 text-ink/30 mt-0 md:mt-12" strokeWidth={1} />
                </div>
                
                <div className="flex flex-col justify-center py-2 lg:py-4">
                  <h3 className="text-4xl lg:text-5xl font-sans text-ink mb-6 lg:mb-8 tracking-tight leading-[1.1]">Step 03: Specify Your Bacteriostatic Water Volume (ml)</h3>
                  <p className="text-lg lg:text-xl text-ink/70 leading-relaxed max-w-3xl font-light mb-4">
                    Enter the volume of bacteriostatic water (BAC water) you will add to the vial during reconstitution. The most common research volumes are 1ml, 2ml, and 3ml. The amount of water you add directly determines the solution concentration: more water lowers concentration (larger draws per dose), less water raises concentration (smaller, more precise draws). Use the +1ML, +2ML, and +3ML shortcuts or enter a custom volume.
                  </p>
                  <div className="bg-white/60 border border-ink/10 rounded-2xl p-6 lg:p-8 mt-2">
                    <p className="text-sm font-mono text-ink/60 uppercase tracking-widest mb-4">Concentration Formula</p>
                    <p className="text-2xl lg:text-3xl font-sans text-ink tracking-tight">
                      Concentration (mcg/ml) = <span className="text-gold italic">Peptide Amount (mcg)</span> ÷ <span className="text-gold italic">Bacteriostatic Water (ml)</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="sticky top-44 lg:top-[21.5rem] w-full rounded-[2.5rem] lg:rounded-[3.5rem] p-10 lg:p-16 border border-ink/5 bg-[#F5F0E8] shadow-[0_8px_40px_rgba(0,0,0,0.03)] overflow-hidden group"
              style={{ zIndex: 40 }}
            >
              <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.4] mix-blend-multiply z-0">
                <filter id="noiseStep4">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseStep4)" />
              </svg>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[100px_1fr] lg:grid-cols-[160px_1fr] gap-8 lg:gap-16 items-stretch">
                <div className="flex flex-row md:flex-col justify-between items-end md:items-start border-b md:border-b-0 md:border-r border-ink/10 pb-6 md:pb-0 md:pr-8">
                  <span className="text-5xl lg:text-8xl font-sans text-ink tracking-tighter leading-none">04</span>
                  <Calculator className="w-8 h-8 lg:w-12 lg:h-12 text-ink/30 mt-0 md:mt-12" strokeWidth={1} />
                </div>
                
                <div className="flex flex-col justify-center py-2 lg:py-4">
                  <h3 className="text-4xl lg:text-5xl font-sans text-ink mb-6 lg:mb-8 tracking-tight leading-[1.1]">Step 04: Set Your Target Dose and Read the Calculation Results</h3>
                  <p className="text-lg lg:text-xl text-ink/70 leading-relaxed max-w-3xl font-light mb-6">
                    Enter your target research dose in either mg or mcg using the toggle. The calculator instantly outputs all four results. The Required Draw (IU) is the most important output — it is the exact tick mark on your syringe to draw to. All results update in real time as you adjust any input.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-ink">
                          <th className="py-3 pr-8 text-xs font-mono uppercase tracking-widest text-ink/60">Output Field</th>
                          <th className="py-3 text-xs font-mono uppercase tracking-widest text-ink/60">What It Tells You</th>
                        </tr>
                      </thead>
                      <tbody className="font-light text-ink/80">
                        <tr className="border-b border-ink/10">
                          <td className="py-4 pr-8 font-sans text-lg">Required Draw (IU)</td>
                          <td className="py-4 text-base">The exact IU tick mark on your U-100 insulin syringe to draw to — this is your primary result</td>
                        </tr>
                        <tr className="border-b border-ink/10">
                          <td className="py-4 pr-8 font-sans text-lg">Solution Concentration (mcg/ml)</td>
                          <td className="py-4 text-base">How many micrograms of peptide are dissolved per milliliter of solution</td>
                        </tr>
                        <tr className="border-b border-ink/10">
                          <td className="py-4 pr-8 font-sans text-lg">Draw Volume (ml)</td>
                          <td className="py-4 text-base">The precise volume of solution in milliliters to extract from the vial per dose</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-8 font-sans text-lg">Total Doses Per Vial</td>
                          <td className="py-4 text-base">How many complete doses remain in the vial at your current dose and water volume settings</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 3: UNDERSTANDING THE MATH
          ============================================ */}
      <section className="py-24 lg:py-48 px-6 bg-ink text-white relative">
        
        {/* Noise */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay z-0">
          <filter id="noiseMath">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseMath)" />
        </svg>

        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start relative z-10">
          
          {/* Left: Sticky Title */}
          <div className="lg:sticky lg:top-32">
            <FadeUp>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-8">The Science</h2>
              <h3 className="text-5xl lg:text-7xl font-sans mb-8 tracking-tight leading-[1.1]">The Science: Understanding Peptide Reconstitution Math</h3>
              <p className="text-xl text-white/50 leading-relaxed max-w-md font-light">
                Every calculation this tool produces is the output of a simple three-step formula chain. Understanding the arithmetic lets you verify any result independently — and makes you a more precise researcher. The entire reconstitution math reduces to three divisions and one multiplication.
              </p>
            </FadeUp>
          </div>

          {/* Right: Editorial Index List (Now Stackable Cards) */}
          <div className="flex flex-col w-full pb-[20vh] relative">
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="sticky top-20 lg:top-32 w-full rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 border border-white/10 bg-[#151515] shadow-2xl mb-6 lg:mb-8"
                style={{ zIndex: 10 }}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-start">
                  <div className="text-gold/80 shrink-0 mt-1 bg-gold/10 p-4 rounded-2xl">
                    <FlaskConical className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-3xl lg:text-4xl font-sans tracking-tight text-white">Concentration Formula: Peptide (mcg) ÷ Bacteriostatic Water (ml)</h4>
                    <p className="text-lg text-white/60 leading-relaxed font-light max-w-2xl">
                      Divide the total peptide amount (converted to mcg) by the volume of bacteriostatic water you added (in ml). This gives you the solution concentration in mcg per ml. Example: A 5mg vial (5,000 mcg) reconstituted with 2ml of BAC water produces a concentration of <strong className="text-white/90 font-medium">2,500 mcg/ml</strong>. Every milliliter of that solution contains exactly 2,500 micrograms of peptide.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="sticky top-28 lg:top-40 w-full rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 border border-white/10 bg-[#1A1A1A] shadow-2xl mb-6 lg:mb-8"
                style={{ zIndex: 20 }}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-start">
                  <div className="text-gold/80 shrink-0 mt-1 bg-gold/10 p-4 rounded-2xl">
                    <Droplets className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-3xl lg:text-4xl font-sans tracking-tight text-white">Draw Volume: Target Dose (mcg) ÷ Concentration (mcg/ml)</h4>
                    <p className="text-lg text-white/60 leading-relaxed font-light max-w-2xl">
                      Divide your target research dose (in mcg) by the solution concentration (mcg/ml) to get the exact volume to draw in milliliters. Continuing the example: A target dose of 250 mcg at a 2,500 mcg/ml concentration requires a draw volume of exactly <strong className="text-white/90 font-medium">0.1 ml</strong>. This is the volume of liquid to extract from the vial per dose.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="sticky top-36 lg:top-48 w-full rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 border border-white/10 bg-[#1F1F1F] shadow-2xl mb-6 lg:mb-8"
                style={{ zIndex: 30 }}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-start">
                  <div className="text-gold/80 shrink-0 mt-1 bg-gold/10 p-4 rounded-2xl">
                    <Syringe className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-3xl lg:text-4xl font-sans tracking-tight text-white">Syringe IU Conversion: Draw Volume (ml) × 100</h4>
                    <p className="text-lg text-white/60 leading-relaxed font-light max-w-2xl">
                      Multiply your draw volume in ml by 100 to convert to International Units (IU) as marked on a standard U-100 insulin syringe. From the example: 0.1 ml × 100 = <strong className="text-white/90 font-medium">10 IU</strong>. You draw the syringe plunger back to the &apos;10&apos; tick mark. On every U-100 syringe, 1 ml = 100 IU, making this a straightforward single multiplication.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="sticky top-44 lg:top-56 w-full rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 border border-white/10 bg-[#252525] shadow-2xl mb-6 lg:mb-8"
                style={{ zIndex: 40 }}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-start">
                  <div className="text-gold/80 shrink-0 mt-1 bg-gold/10 p-4 rounded-2xl">
                    <BookOpen className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h4 className="text-3xl lg:text-4xl font-sans tracking-tight text-white">Total Doses Per Vial: Water Added (ml) ÷ Draw Volume (ml)</h4>
                    <p className="text-lg text-white/60 leading-relaxed font-light max-w-2xl">
                      Divide the total reconstituted volume (the milliliters of BAC water you added) by the draw volume per dose to get the total number of doses available. From the example: 2 ml ÷ 0.1 ml = <strong className="text-white/90 font-medium">20 complete doses</strong> from one vial at this rate. This tells you exactly how long your current vial will last at your research protocol.
                    </p>
                  </div>
                </div>
              </motion.div>

          </div>
          
        </div>
      </section>


      {/* ============================================
          SECTION 4: COMMON RECONSTITUTION SCENARIOS
          ============================================ */}
      <section className="py-24 lg:py-48 px-6 bg-white relative">
        
        {/* Dot Grid */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-30" style={{ backgroundImage: "radial-gradient(#D6CDB8 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        {/* Background Watermark */}
        <div className="absolute bottom-[5%] right-0 pointer-events-none z-0 overflow-hidden">
          <span className="text-[14vw] font-sans text-ink/[0.02] leading-none select-none tracking-tighter whitespace-nowrap">
            SCENARIOS
          </span>
        </div>

        <div className="max-w-[1100px] mx-auto relative z-10">
          
          <FadeUp className="text-center mb-16 lg:mb-24">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-6 font-bold">Quick Reference</h2>
            <h3 className="text-4xl lg:text-6xl font-sans text-ink tracking-tight mb-6">Common Reconstitution Scenarios</h3>
            <p className="text-lg lg:text-xl text-ink/50 font-light leading-relaxed max-w-2xl mx-auto">
              Pre-calculated reference table for the most frequently used peptide vial sizes, water volumes, and dose amounts. All values assume a standard U-100 syringe.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="overflow-x-auto rounded-[2rem] border border-ink/10 shadow-[0_8px_40px_rgba(0,0,0,0.03)]">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-ink text-white">
                    <th className="py-5 px-6 text-xs font-mono uppercase tracking-widest font-normal">Vial Size</th>
                    <th className="py-5 px-6 text-xs font-mono uppercase tracking-widest font-normal">Bac Water</th>
                    <th className="py-5 px-6 text-xs font-mono uppercase tracking-widest font-normal">Concentration</th>
                    <th className="py-5 px-6 text-xs font-mono uppercase tracking-widest font-normal">Dose (mcg)</th>
                    <th className="py-5 px-6 text-xs font-mono uppercase tracking-widest font-normal">Draw (IU)</th>
                    <th className="py-5 px-6 text-xs font-mono uppercase tracking-widest font-normal">Total Doses</th>
                  </tr>
                </thead>
                <tbody className="font-light">
                  {[
                    ['5 mg', '1 ml', '5,000 mcg/ml', '100', '2 IU', '50'],
                    ['5 mg', '1 ml', '5,000 mcg/ml', '250', '5 IU', '20'],
                    ['5 mg', '2 ml', '2,500 mcg/ml', '250', '10 IU', '20'],
                    ['5 mg', '2 ml', '2,500 mcg/ml', '500', '20 IU', '10'],
                    ['10 mg', '2 ml', '5,000 mcg/ml', '250', '5 IU', '40'],
                    ['10 mg', '2 ml', '5,000 mcg/ml', '500', '10 IU', '20'],
                    ['10 mg', '3 ml', '3,333 mcg/ml', '300', '9 IU', '30'],
                    ['15 mg', '3 ml', '5,000 mcg/ml', '500', '10 IU', '30'],
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-ink/5 ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'} hover:bg-gold/5 transition-colors`}>
                      {row.map((cell, j) => (
                        <td key={j} className={`py-4 px-6 ${j === 4 ? 'font-sans text-lg text-gold font-medium' : 'text-ink/70'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>


      {/* ============================================
          SECTION 5: STORAGE & HANDLING GUIDE
          ============================================ */}
      <section className="py-24 lg:py-48 px-6 bg-white relative border-t border-ink/5">
        
        {/* Rotating Ring */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] -left-[15%] w-[60vw] h-[60vw] border-[1px] border-ink/5 rounded-full pointer-events-none z-0"
        />

        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start relative z-10">
          
          {/* Left: Sticky Title */}
          <div className="lg:sticky lg:top-32">
            <FadeUp>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-8 font-bold">Best Practices</h2>
              <h3 className="text-5xl lg:text-7xl font-sans mb-8 tracking-tight leading-[1.1] text-ink">Peptide Storage & Handling — Before and After Reconstitution</h3>
              <p className="text-xl text-ink/50 leading-relaxed max-w-md font-light">
                Correct storage and sterile technique are as important as accurate dosing calculations. Improper storage degrades peptide potency; improper handling introduces contamination. Follow these four protocols for every reconstitution.
              </p>
            </FadeUp>
          </div>

          {/* Right: Editorial Index List */}
          <div className="flex flex-col w-full">
            <StaggerChildren className="w-full">
              
              <motion.div variants={staggerItemVariants} className="group border-t border-ink/10 py-12 flex flex-col md:flex-row gap-6 md:gap-12 md:items-start hover:border-gold/30 transition-colors duration-500">
                <div className="text-gold/60 shrink-0 mt-2">
                  <Thermometer className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-3xl lg:text-4xl font-sans tracking-tight text-ink group-hover:text-gold transition-colors duration-500">Before Reconstitution: Store Lyophilized Peptides at −20°C</h4>
                  <p className="text-lg text-ink/50 leading-relaxed font-light max-w-2xl">
                    Store unreconstituted (lyophilized) peptide powder in a freezer at −20°C or below for long-term stability. Lyophilized peptides are structurally resilient in freeze-dried form — brief exposure to room temperature during shipping does not cause significant degradation. Avoid repeated freeze-thaw cycles, which degrade peptide structure over time.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={staggerItemVariants} className="group border-t border-ink/10 py-12 flex flex-col md:flex-row gap-6 md:gap-12 md:items-start hover:border-gold/30 transition-colors duration-500">
                <div className="text-gold/60 shrink-0 mt-2">
                  <Droplets className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-3xl lg:text-4xl font-sans tracking-tight text-ink group-hover:text-gold transition-colors duration-500">After Reconstitution: Refrigerate at 2–8°C, Use Within 4 Weeks</h4>
                  <p className="text-lg text-ink/50 leading-relaxed font-light max-w-2xl">
                    Once mixed with bacteriostatic water, store the reconstituted vial upright in a standard refrigerator at 2–8°C. Most reconstituted research peptides remain stable for 2 to 4 weeks, though this varies by peptide sequence. Bacteriostatic water extends shelf life significantly by inhibiting microbial growth via its 0.9% benzyl alcohol content. Never freeze a reconstituted peptide solution.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={staggerItemVariants} className="group border-t border-ink/10 py-12 flex flex-col md:flex-row gap-6 md:gap-12 md:items-start hover:border-gold/30 transition-colors duration-500">
                <div className="text-gold/60 shrink-0 mt-2">
                  <Syringe className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-3xl lg:text-4xl font-sans tracking-tight text-ink group-hover:text-gold transition-colors duration-500">Reconstitution Technique: Swirl Gently — Never Shake</h4>
                  <p className="text-lg text-ink/50 leading-relaxed font-light max-w-2xl">
                    Always inject bacteriostatic water slowly against the inner glass wall of the vial — never directly onto the lyophilized cake. Allow the water to run down and dissolve the peptide gradually. If the powder does not dissolve immediately, gently roll or swirl the vial for 1–2 minutes. Do not shake or agitate forcefully — this denatures (structurally damages) the peptide chains and compromises batch integrity.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={staggerItemVariants} className="group border-t border-b border-ink/10 py-12 flex flex-col md:flex-row gap-6 md:gap-12 md:items-start hover:border-gold/30 transition-colors duration-500">
                <div className="text-gold/60 shrink-0 mt-2">
                  <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-3xl lg:text-4xl font-sans tracking-tight text-ink group-hover:text-gold transition-colors duration-500">Contamination Prevention: Sterile Technique for Research Use</h4>
                  <p className="text-lg text-ink/50 leading-relaxed font-light max-w-2xl">
                    Swab the vial&apos;s rubber stopper with a sterile alcohol prep pad before every extraction. Use a fresh, sterile syringe and needle for each draw. Work in a clean, dust-free environment. If the reconstituted solution becomes cloudy, discolored, or contains visible particulates, discard the vial and reconstitute a fresh one. Compromised solution integrity means compromised research results.
                  </p>
                </div>
              </motion.div>

            </StaggerChildren>
          </div>
          
        </div>
      </section>


      {/* ============================================
          SECTION 6: UNIT CONVERSION REFERENCE
          ============================================ */}
      <section className="py-24 lg:py-36 px-6 bg-ink text-white relative">
        
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay z-0">
          <filter id="noiseConv">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseConv)" />
        </svg>

        <div className="max-w-[1100px] mx-auto relative z-10">
          
          <FadeUp className="text-center mb-16 lg:mb-24">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-6 font-bold">Reference Tables</h2>
            <h3 className="text-4xl lg:text-6xl font-sans tracking-tight mb-6">Unit Conversions for Peptide Research — mcg, mg, ml & IU Reference</h3>
            <p className="text-lg text-white/50 font-light leading-relaxed max-w-xl mx-auto">
              Quick-reference conversion tables for the most commonly used units in research peptide calculation. Bookmark this page for fast lookups during reconstitution.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mass Conversions */}
            <FadeUp delay={0.1}>
              <div className="border border-white/10 rounded-[2rem] p-8 lg:p-10 hover:border-gold/20 transition-colors">
                <h4 className="text-2xl font-sans mb-8 tracking-tight">Mass Conversions: mg to mcg Reference Table</h4>
                <table className="w-full text-left border-collapse">
                  <tbody className="font-light text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4 font-sans text-lg text-white">1 mg</td>
                      <td className="py-3 text-base">=  1,000 mcg</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4 font-sans text-lg text-white">0.1 mg</td>
                      <td className="py-3 text-base">=  100 mcg</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4 font-sans text-lg text-white">0.01 mg</td>
                      <td className="py-3 text-base">=  10 mcg</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-sans text-lg text-white">0.001 mg</td>
                      <td className="py-3 text-base">=  1 mcg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </FadeUp>

            {/* Volume Conversions */}
            <FadeUp delay={0.2}>
              <div className="border border-white/10 rounded-[2rem] p-8 lg:p-10 hover:border-gold/20 transition-colors">
                <h4 className="text-2xl font-sans mb-8 tracking-tight">Syringe Volume Reference: ml to IU on U-100 Syringe</h4>
                <table className="w-full text-left border-collapse">
                  <tbody className="font-light text-white/70">
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4 font-sans text-lg text-white">1 ml</td>
                      <td className="py-3 text-base">=  100 IU (on U-100)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4 font-sans text-lg text-white">0.5 ml</td>
                      <td className="py-3 text-base">=  50 IU (on U-100)</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4 font-sans text-lg text-white">0.1 ml</td>
                      <td className="py-3 text-base">=  10 IU (on U-100)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-sans text-lg text-white">0.01 ml</td>
                      <td className="py-3 text-base">=  1 IU (on U-100)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>


      {/* ============================================
          SECTION 7: FAQ
          ============================================ */}
      <FAQ faqs={CALCULATOR_FAQS} />

      {/* ============================================
          SECTION 8: SHOP CTA STRIP
          ============================================ */}
      <section className="py-24 lg:py-36 px-6 bg-ink text-white relative border-t border-white/5">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay z-0">
          <filter id="noiseShop">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseShop)" />
        </svg>

        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="lg:w-1/2">
              <FadeUp>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-6 font-bold">Research Peptides</h2>
                <h3 className="text-4xl lg:text-6xl font-sans tracking-tight mb-6">Shop Research Peptides Used in These Calculations</h3>
                <p className="text-lg text-white/50 font-light leading-relaxed mb-8">
                  Every compound in our catalog is US-synthesized, independently verified at ≥99% HPLC purity, and ships with a lot-specific Certificate of Analysis. Browse the peptides most commonly calculated on this page.
                </p>
                <Link href="/shop" className="inline-flex items-center gap-4 bg-gold hover:bg-white text-ink px-8 py-4 rounded-full font-mono text-sm uppercase tracking-widest transition-colors">
                  Browse Our Full Catalog <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </FadeUp>
            </div>

            <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'BPC-157 Blend — 5MG', btn: 'Shop BPC-157', link: '/shop/bpc-157-blend' },
                { name: 'TB-500 — 5MG', btn: 'Shop TB-500', link: '/shop/tb-500' },
                { name: 'GHK-Cu — 50MG', btn: 'Shop GHK-Cu', link: '/shop/ghk-cu' },
                { name: 'Semaglutide — 5MG', btn: 'Shop Semaglutide', link: '/shop/semaglutide' }
              ].map((prod, idx) => (
                <FadeUp key={idx} delay={0.1 * idx}>
                  <Link href={prod.link} className="block group bg-[#151515] hover:bg-[#222] border border-white/5 hover:border-gold/30 rounded-2xl p-6 transition-all duration-300 h-full flex flex-col justify-between min-h-[160px]">
                    <span className="font-sans text-xl text-white mb-6 block leading-tight">{prod.name}</span>
                    <span className="text-gold group-hover:text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-colors mt-auto">
                      {prod.btn} <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 9: LEGAL DISCLAIMER
          ============================================ */}
      <section className="py-16 lg:py-24 px-6 bg-white border-t border-ink/5 relative">
        <div className="max-w-[900px] mx-auto relative z-10">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
              <div className="shrink-0 flex flex-col items-start">
                <ShieldCheck className="w-12 h-12 text-gold mb-4" strokeWidth={1} />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink/40">Legal Disclaimer</span>
              </div>
              <div className="flex-1">
                <p className="text-lg text-ink/60 leading-relaxed font-light mb-6">
                  All products referenced on this page and throughout The LooksMaxxing Lab are intended exclusively for <strong className="text-ink font-medium">in-vitro laboratory research purposes only</strong>. They are not intended for human consumption, diagnostic, therapeutic, or any other clinical use.
                </p>
                <p className="text-lg text-ink/60 leading-relaxed font-light mb-6">
                  This calculator is provided strictly as a <strong className="text-ink font-medium">theoretical research tool</strong> to assist researchers in calculating reconstitution volumes and concentrations for their laboratory guidelines. It does not constitute medical advice, and no information provided should be interpreted as guidance for human administration.
                </p>
                <p className="text-lg text-ink/60 leading-relaxed font-light">
                  By using this tool, you confirm that you are a qualified researcher and that all products will be used in strict compliance with applicable federal, state, and local regulations. The LooksMaxxing Lab assumes no liability for misuse of this tool or any products listed on our platform.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </main>
  )
}
