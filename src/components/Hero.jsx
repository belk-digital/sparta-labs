"use client";

import { Plus, Check } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  return (
    <motion.section
      className="relative flex h-screen w-full overflow-hidden bg-black"
      id="shop"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">
        <source
          src="https://res.cloudinary.com/dgrrovta3/video/upload/v1781585458/Firefly_animate_this_make_it_seamless_looped_and_muted_in_4k_62663_phhwmj.webm"
          type="video/webm"
        />
      </video>
      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-end px-6 pb-16 text-center bg-gradient-to-t from-black/70 via-black/30 to-transparent backdrop-blur-[2px] md:justify-center md:pb-0 md:bg-[linear-gradient(to_right,rgba(255,255,255,0.1),transparent)] md:backdrop-blur-[12px] md:w-[60%] md:items-stretch md:px-0 md:pl-16 md:pr-8 md:text-left lg:w-[35%] lg:min-w-[550px] lg:pl-[calc(max(2rem,50vw-850px+2rem))]">
        <div className="flex max-w-[500px] flex-col items-center md:block">
          <motion.h1
            className="mb-6 text-[2.5rem] leading-[1.05] font-normal tracking-[-1.5px] text-white min-[480px]:text-[3rem] md:text-[4.5rem]"
            variants={itemVariants}
          >
            RESEARCH PEPTIDES
          </motion.h1>
          <motion.p
            className="mb-8 max-w-[480px] text-[1rem] leading-[1.6] font-light text-white/85 md:mb-12 md:text-[1.1rem]"
            variants={itemVariants}
          >
            Guided by scientific literature, deliberate sourcing,
            <br />
            and controlled operational standards.
          </motion.p>

          <motion.div className="mb-16 flex w-full flex-col items-center gap-4 md:w-auto md:flex-row" variants={itemVariants}>
            <button className="w-full rounded px-7 py-3.5 text-sm font-medium tracking-[1px] uppercase transition-all duration-300 font-['Neue_Haas_Grotesk_Text',sans-serif] border border-white bg-white text-black shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:border-[#f5f5f5] hover:bg-[#f5f5f5] md:w-auto">
              Shop Now
            </button>
            <button className="w-full rounded px-7 py-3.5 text-sm font-medium tracking-[1px] uppercase transition-all duration-300 font-['Neue_Haas_Grotesk_Text',sans-serif] border-2 border-white bg-transparent text-white hover:bg-white/10 md:w-auto">
              View Research Peptides
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute right-10 bottom-10 z-10 hidden w-[280px] flex-col overflow-hidden rounded-xl bg-[#f6f6f6] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.15)] md:flex"
        variants={itemVariants}
      >
        <div className="absolute top-0 left-1/2 z-2 flex h-6 w-[150px] -translate-x-1/2 items-center justify-center bg-white [clip-path:polygon(0_0,100%_0,88%_100%,12%_100%)]">
          <span className="-mt-0.5 flex items-center text-[0.65rem] font-semibold text-[#333333]">
            <Check size={10} strokeWidth={3} className="mr-1" /> Third-Party Tested
          </span>
        </div>
        <div className="mb-4 flex h-[160px] w-full items-center justify-center bg-transparent">
          <img src="/bottle.jpg" alt="Retatrutide 30mg" className="max-h-full max-w-[90%] object-contain mix-blend-multiply" />
        </div>
        <div className="mb-3 pr-0">
          <p className="mb-1.5 text-[10px] tracking-[0.5px] text-[#999999] uppercase">30mg • Single dose</p>
          <h4 className="mb-1.5 text-[1.2rem] font-medium tracking-[-0.5px] text-[#111111] font-['Neue_Haas_Grotesk_Text',sans-serif]">
            Retatrutide 30mg
          </h4>
          <p className="pr-[30px] text-[0.8rem] leading-[1.5] text-[#666666]">
            Concentrated support for scientific research and literature.
          </p>
        </div>
        <button className="absolute right-5 bottom-5 flex h-8 w-8 items-center justify-center rounded-full border border-[#cccccc] bg-transparent text-[#111111] transition-all duration-200 hover:border-[#111111] hover:bg-[#111111] hover:text-white">
          <Plus size={18} strokeWidth={1.5} />
        </button>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
