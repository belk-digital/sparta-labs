"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HelmetLogo = ({ className }) => (
  <svg viewBox="0 0 190 300" className={className} fill="#ffffff">
    <path d="M94.02,228.41c-5.98-3.52-19.52-15.64-19.13-22.16l3.19-52.86-55.56-24.18c-.45,9.37,1.22,17.33,2.88,25.78,2.03,13.88,15.02,16.75,26.2,22.56,3.74,2.15,9.43,5.67,9.43,11.05v94.56S2.59,206.44,2.59,206.44c-2.8-3.68-2.25-8.49-2.59-12.84l.17-90.97c.02-10.06,3.04-19.08,8.62-27.26,17.61-25.3,57.52-45.01,84.79-58.71,28.42,14.43,62.61,31.25,82.58,55.75,5.71,7.74,10.53,15.88,10.55,26.07l.26,101.36c-1.24,3.84-2.61,6.9-5,10.05l-55.98,73.44-.54-89.59c-.04-5.96.76-11.19,6.44-14.24l17.88-9.14c6.75-3.45,11.37-9.02,11.89-16.81,1.64-8.05,3.33-15.91,2.67-24.57l-55.92,24.83,3.16,54.98c-2.32,8.15-11.11,13.39-17.57,19.62Z" />
  </svg>
);

const AgeGate = ({ onVerify }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleVerify = () => {
    setIsVisible(false);
    setTimeout(() => {
      onVerify();
    }, 600);
  };

  const handleLeave = () => {
    window.location.href = "https://www.google.com";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <video className="absolute inset-0 z-1 h-full w-full object-cover" autoPlay loop muted playsInline>
            <source
              src="https://res.cloudinary.com/dgrrovta3/video/upload/v1781414246/Firefly_Premium_biotechnology_commercial_bright_clinical_white_environment_transparent_peptide_mol_gblhva.mp4"
              type="video/mp4"
            />
          </video>

          <motion.div
            className="absolute inset-0 z-2 h-full w-full bg-black/40 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          ></motion.div>

          <motion.div
            className="relative z-3 flex max-w-[600px] flex-col items-center px-6 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants} className="mb-12 flex flex-col items-center">
              <HelmetLogo className="mb-[1.2rem] h-16 w-[50px]" />
              <h2 className="text-[1.2rem] font-medium tracking-[4px] text-white uppercase font-['Neue_Haas_Grotesk_Display',sans-serif]">
                SPARTA LABS
              </h2>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-[3.5rem] font-medium tracking-[-1px] text-white font-['Neue_Haas_Grotesk_Display',sans-serif] max-[600px]:text-[2.5rem]"
            >
              Age Verification
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mb-12 text-[1.1rem] leading-[1.6] font-light text-white/90 font-['Neue_Haas_Grotesk_Text',sans-serif]"
            >
              You must be 18 years or older to access this website.
              <br />
              All products are for research use only.
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 max-[600px]:w-full max-[600px]:flex-col">
              <button
                className="inline-flex w-auto items-center justify-center rounded border border-white bg-white px-8 py-3.5 text-[15px] font-semibold tracking-[1.5px] text-black uppercase transition-all duration-300 font-['Neue_Haas_Grotesk_Text',sans-serif] hover:border-[#e0e0e0] hover:bg-[#e0e0e0] max-[600px]:w-full"
                onClick={handleVerify}
              >
                I Am 18+
              </button>
              <button
                className="inline-flex w-auto items-center justify-center rounded border border-white/40 bg-white/5 px-8 py-3.5 text-[15px] font-semibold tracking-[1.5px] text-white uppercase transition-all duration-300 font-['Neue_Haas_Grotesk_Text',sans-serif] hover:border-white hover:bg-white/15 max-[600px]:w-full"
                onClick={handleLeave}
              >
                Leave
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgeGate;
