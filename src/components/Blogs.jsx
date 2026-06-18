"use client";

import { motion } from "framer-motion";

const Blogs = () => {
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
      className="bg-white py-24 text-[#111111]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-[1700px] px-8 max-[768px]:px-4 max-[480px]:px-3">
        {/* Top Section: Featured & Latest */}
        <div className="mb-12 grid grid-cols-[2fr_1fr] gap-10 max-[992px]:grid-cols-1">
          {/* Featured Post */}
          <motion.div className="relative flex min-h-[400px] overflow-hidden rounded-2xl max-[992px]:min-h-[350px]" variants={itemVariants}>
            <img
              src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1600&auto=format&fit=crop"
              alt="Featured"
              className="absolute inset-0 z-1 h-full w-full object-cover"
            />
            <div className="relative z-3 mt-auto w-full border-t border-white/10 bg-[rgba(40,30,25,0.45)] p-[30px] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.1)] backdrop-blur-lg">
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-[20px] bg-white px-3 py-1.5 text-[0.75rem] font-medium text-[#111111]">
                <span className="h-2 w-2 rounded-full bg-[#d35400]"></span> Research
              </span>
              <h3 className="mb-3 text-[1.8rem] leading-[1.3] font-medium text-white max-[640px]:text-[1.4rem]">
                BPC-157: The Ultimate Healing Peptide for Accelerated Tissue Recovery
              </h3>
              <div className="text-[0.75rem] text-white/80">Aug 10 • 10 min read</div>
            </div>
          </motion.div>

          {/* Latest Posts */}
          <div className="flex flex-col">
            <h3 className="mb-5 text-[1.5rem] font-semibold text-[#111111]">Latest post</h3>
            <div className="flex flex-col gap-5">
              <motion.div className="flex items-center gap-4" variants={itemVariants}>
                <img
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=200&auto=format&fit=crop"
                  alt="Post 1"
                  className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-1.5">
                  <h4 className="m-0 text-[0.95rem] leading-[1.4] font-medium text-[#222222]">
                    Understanding the Role of GHK-Cu in Cellular Rejuvenation
                  </h4>
                  <div className="text-[0.75rem] text-[#777777]">Aug 10 • 10 min read</div>
                </div>
              </motion.div>

              <motion.div className="flex items-center gap-4" variants={itemVariants}>
                <img
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=200&auto=format&fit=crop"
                  alt="Post 2"
                  className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-1.5">
                  <h4 className="m-0 text-[0.95rem] leading-[1.4] font-medium text-[#222222]">
                    TB-500: Mechanisms of Tissue Repair and Inflammation Reduction.
                  </h4>
                  <div className="text-[0.75rem] text-[#777777]">Aug 12 • 8 min read</div>
                </div>
              </motion.div>

              <motion.div className="flex items-center gap-4" variants={itemVariants}>
                <img
                  src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=200&auto=format&fit=crop"
                  alt="Post 3"
                  className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-1.5">
                  <h4 className="m-0 text-[0.95rem] leading-[1.4] font-medium text-[#222222]">
                    A Deep Dive into Growth Hormone Secretagogues: Ipamorelin vs. CJC-1295.
                  </h4>
                  <div className="text-[0.75rem] text-[#777777]">Aug 15 • 12 min read</div>
                </div>
              </motion.div>

              <motion.div className="flex items-center gap-4" variants={itemVariants}>
                <img
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=200&auto=format&fit=crop"
                  alt="Post 4"
                  className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-1.5">
                  <h4 className="m-0 text-[0.95rem] leading-[1.4] font-medium text-[#222222]">
                    Proper Storage and Reconstitution of Lyophilized Peptides.
                  </h4>
                  <div className="text-[0.75rem] text-[#777777]">Aug 18 • 6 min read</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Blogs;
