"use client";

import { motion } from "framer-motion";

const SpartaStandard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.section
      className="relative bg-[#FAFAFB] py-20 text-[#111111] md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="relative z-2 mx-auto grid max-w-[1700px] grid-cols-1 gap-4 px-8 md:grid-cols-2 md:gap-6 lg:grid-cols-4 max-[768px]:px-4 max-[480px]:px-3">
        {/* Row 1: Title Area */}
        <motion.div className="pb-8 md:col-span-2 md:row-start-1" variants={itemVariants}>
          <div className="mb-6 flex items-center gap-3">
            <span className="text-[0.9rem] font-medium tracking-[0.05em] text-accent uppercase">The Sparta Standard</span>
          </div>
          <h2 className="m-0 text-[2.25rem] leading-[1.15] font-normal text-[#222222] md:text-[clamp(2rem,3.5vw,3rem)]">
            ENGINEERED FOR <br /> ABSOLUTE PRECISION.
          </h2>
        </motion.div>

        {/* Row 2: Cards 1 & 2 */}
        <motion.div
          className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] md:p-8 md:col-start-1 md:row-start-3 lg:row-start-2"
          variants={itemVariants}
        >
          <div className="mb-8 flex items-start justify-between">
            <div className="flex flex-shrink-0 items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div className="rounded-[30px] border border-black/15 bg-black/[0.03] px-[0.85rem] py-[0.35rem] text-xs font-semibold whitespace-nowrap text-ink">99.1%+ Verified</div>
          </div>
          <div>
            <h4 className="mb-3 text-[1.1rem] font-semibold text-ink">99.1%+ Verified Purity</h4>
            <p className="m-0 text-[0.9rem] leading-[1.5] text-[#777777]">We don&apos;t rely on manufacturer claims. Every single batch is independently tested by accredited third-party laboratories in the USA to guarantee minimum 99% purity before it ever reaches our inventory.</p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] md:p-8 md:col-start-2 md:row-start-3 lg:row-start-2"
          variants={itemVariants}
        >
          <div className="mb-8 flex items-start justify-between">
            <div className="flex flex-shrink-0 items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
            <div className="rounded-[30px] border border-black/15 bg-black/[0.03] px-[0.85rem] py-[0.35rem] text-xs font-semibold whitespace-nowrap text-ink">Lyophilized</div>
          </div>
          <div>
            <h4 className="mb-3 text-[1.1rem] font-semibold text-ink">Lyophilized Stability</h4>
            <p className="m-0 text-[0.9rem] leading-[1.5] text-[#777777]">Our peptides are lyophilized (freeze-dried) under vacuum to ensure long-term molecular stability during transit and storage.</p>
          </div>
        </motion.div>

        {/* Span Card: Image / Video */}
        <motion.div
          className="flex h-[250px] items-center justify-center overflow-hidden rounded-2xl border border-line bg-white p-0 shadow-[0_4px_24px_rgba(0,0,0,0.03)] md:h-[350px] md:col-span-2 md:row-start-2 lg:h-[300px] lg:col-start-3 lg:col-span-2"
          variants={itemVariants}
        >
          <video autoPlay loop muted playsInline src="https://res.cloudinary.com/dgrrovta3/video/upload/v1781558507/sparta-video-asset_yfkyhc.webm" className="h-full w-full object-cover" />
        </motion.div>

        {/* Row 3: Text area and Cards 3 & 4 */}
        <motion.div
          className="self-end pr-0 mt-4 mb-2 md:mt-8 md:mb-4 md:col-span-2 md:row-start-4 lg:mt-0 lg:mb-0 lg:row-start-3 lg:pr-8 min-[1200px]:pr-16"
          variants={itemVariants}
        >
          <h3 className="mb-4 text-[1.25rem] font-medium text-[#111111]">Discover Quality</h3>
          <p className="m-0 text-base leading-[1.6] text-[#666666]">Every compound is synthesized under strict laboratory conditions, independently verified via third-party analysis, and sealed to ensure maximum stability.</p>
        </motion.div>

        <motion.div
          className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] md:p-8 md:col-start-1 md:row-start-5 lg:col-start-3 lg:row-start-3"
          variants={itemVariants}
        >
          <div className="mb-8 flex items-start justify-between">
            <div className="flex flex-shrink-0 items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div className="rounded-[30px] border border-black/15 bg-black/[0.03] px-[0.85rem] py-[0.35rem] text-xs font-semibold whitespace-nowrap text-ink">Exact Dosing</div>
          </div>
          <div>
            <h4 className="mb-3 text-[1.1rem] font-semibold text-ink">Exact Milligram Dosing</h4>
            <p className="m-0 text-[0.9rem] leading-[1.5] text-[#777777]">Precision is paramount. We guarantee exact milligram content per vial, completely eliminating the guesswork from your research.</p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] md:p-8 md:col-start-2 md:row-start-5 lg:col-start-4 lg:row-start-3"
          variants={itemVariants}
        >
          <div className="mb-8 flex items-start justify-between">
            <div className="flex flex-shrink-0 items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div className="rounded-[30px] border border-black/15 bg-black/[0.03] px-[0.85rem] py-[0.35rem] text-xs font-semibold whitespace-nowrap text-ink">Secure</div>
          </div>
          <div>
            <h4 className="mb-3 text-[1.1rem] font-semibold text-ink">Secure Transit</h4>
            <p className="m-0 text-[0.9rem] leading-[1.5] text-[#777777]">All orders are packed securely in climate-controlled packaging to maintain optimal conditions during transit to your facility.</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SpartaStandard;
