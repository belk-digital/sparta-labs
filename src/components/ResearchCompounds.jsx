"use client";

import { ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";

const HelmetLogo = ({ className }) => (
  <svg viewBox="0 0 190 300" className={className} fill="#D31118">
    <path d="M94.02,228.41c-5.98-3.52-19.52-15.64-19.13-22.16l3.19-52.86-55.56-24.18c-.45,9.37,1.22,17.33,2.88,25.78,2.03,13.88,15.02,16.75,26.2,22.56,3.74,2.15,9.43,5.67,9.43,11.05v94.56S2.59,206.44,2.59,206.44c-2.8-3.68-2.25-8.49-2.59-12.84l.17-90.97c.02-10.06,3.04-19.08,8.62-27.26,17.61-25.3,57.52-45.01,84.79-58.71,28.42,14.43,62.61,31.25,82.58,55.75,5.71,7.74,10.53,15.88,10.55,26.07l.26,101.36c-1.24,3.84-2.61,6.9-5,10.05l-55.98,73.44-.54-89.59c-.04-5.96.76-11.19,6.44-14.24l17.88-9.14c6.75-3.45,11.37-9.02,11.89-16.81,1.64-8.05,3.33-15.91,2.67-24.57l-55.92,24.83,3.16,54.98c-2.32,8.15-11.11,13.39-17.57,19.62Z" />
  </svg>
);

const compounds = [
  { id: 1, category: "Reconstitution Solution Research", name: "Bacteriostatic Water", price: "$89.00", tags: ["5mg", "10mg"], image: "/bottle.jpg", inCart: false },
  { id: 2, category: "Tissue Repair Research", name: "BPC-157", price: "$72.00", tags: ["5mg", "10mg"], image: "/bottle.jpg", inCart: false },
  { id: 3, category: "Vascular Research", name: "Retratrutide", price: "$72.00", tags: ["5mg", "10mg"], image: "/bottle.jpg", inCart: true },
  { id: 4, category: "GH Research", name: "TB-500", price: "$94.00", tags: ["5mg", "10mg"], image: "/bottle.jpg", inCart: false },
  { id: 5, category: "Tissue Repair Research", name: "GHK-CU", price: "$148.00", tags: ["5mg", "10mg"], image: "/bottle.jpg", inCart: false },
  { id: 6, category: "Metabolic Research", name: "MOTS-C", price: "$124.00", tags: ["5mg", "10mg"], image: "/bottle.jpg", inCart: false },
];

const ResearchCompounds = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.section
      className="bg-white py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-[1700px] px-8 max-[768px]:px-4 max-[480px]:px-3">
        <motion.div className="mb-16 flex flex-col items-center text-center" variants={itemVariants}>
          <HelmetLogo className="mb-6 h-[50px] w-10" />
          <h2 className="mb-6 text-[2.5rem] font-normal tracking-[-0.5px] text-ink">Research Compounds</h2>
          <button className="inline-flex items-center rounded border border-line bg-transparent px-6 py-3 text-[0.9rem] font-medium text-ink transition-all duration-200 hover:border-[#d0d0d0] hover:bg-hover">
            View all compounds <ChevronRight size={14} className="ml-1" />
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-6 max-[1024px]:grid-cols-2 max-[768px]:flex max-[768px]:gap-4 max-[768px]:overflow-x-auto max-[768px]:pb-6 max-[768px]:[scrollbar-width:none] max-[768px]:[-ms-overflow-style:none] max-[768px]:[&::-webkit-scrollbar]:hidden max-[768px]:snap-x max-[768px]:snap-mandatory"
          variants={itemVariants}
        >
          {compounds.map((compound) => (
            <motion.div
              key={compound.id}
              className="relative flex flex-col overflow-hidden rounded-xl bg-[#f6f6f6] pt-8 px-6 pb-6 max-[768px]:flex-[0_0_85%] max-[768px]:snap-center max-[480px]:flex-[0_0_90%]"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-1/2 z-2 flex h-7 w-[180px] -translate-x-1/2 items-center justify-center bg-white [clip-path:polygon(0_0,100%_0,88%_100%,12%_100%)]">
                <span className="-mt-0.5 flex items-center text-[0.65rem] font-medium text-[#333333]">
                  <Check size={10} strokeWidth={3} className="mr-1" /> Third-Party Tested
                </span>
              </div>

              <div className="absolute top-5 left-5 z-2">
                <HelmetLogo className="h-7 w-6" />
              </div>

              <div className="mt-2.5 mb-4 flex h-[220px] w-full items-center justify-center max-[768px]:h-[200px]">
                <img src={compound.image} alt={compound.name} className="max-h-full max-w-[90%] object-contain mix-blend-multiply" />
              </div>

              <div className="flex flex-1 flex-col text-center">
                <p className="mb-1.5 text-[0.7rem] tracking-[0.5px] text-[#999999] uppercase">{compound.category}</p>
                <h3 className="mb-3 text-[1.2rem] font-normal text-ink">{compound.name}</h3>

                <div className="mb-5 flex items-center justify-center gap-2">
                  <span className="text-base font-semibold text-[#111111]">{compound.price}</span>
                  <div className="flex gap-1">
                    {compound.tags.map((tag) => (
                      <span key={tag} className="rounded-xl bg-[#e4e4e4] px-1.5 py-0.5 text-[0.65rem] font-medium text-[#666666]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-2">
                  {compound.inCart ? (
                    <button className="flex flex-1 items-center justify-center rounded bg-[#333333] p-3 text-[0.85rem] font-medium text-white">
                      In Cart <Check size={14} className="ml-1" />
                    </button>
                  ) : (
                    <>
                      <button className="flex flex-1 items-center justify-center rounded bg-[#111111] p-3 text-[0.85rem] font-medium text-white transition-colors duration-200 hover:bg-black">
                        Add to cart
                      </button>
                      <div className="flex h-auto w-[90px] items-center rounded border border-[#cccccc] bg-transparent">
                        <button className="flex h-full w-[30px] items-center justify-center text-[1.1rem] text-[#333333] hover:bg-black/5">-</button>
                        <span className="flex-1 text-center text-[0.85rem] font-medium text-[#111111]">1</span>
                        <button className="flex h-full w-[30px] items-center justify-center text-[1.1rem] text-[#333333] hover:bg-black/5">+</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ResearchCompounds;
