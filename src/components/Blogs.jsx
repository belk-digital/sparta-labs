import React from 'react';
import { motion } from 'framer-motion';
import './Blogs.css';

const Blogs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.section 
      className="blogs-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container">
        {/* Top Section: Featured & Latest */}
        <div className="blogs-top-grid">
          {/* Featured Post */}
          <motion.div className="featured-post" variants={itemVariants}>
            <img 
              src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1600&auto=format&fit=crop" 
              alt="Featured" 
              className="featured-post-img"
            />
            <div className="featured-post-content">
              <span className="blog-category-pill"><span className="dot-indicator"></span> Research</span>
              <h3 className="featured-post-title">BPC-157: The Ultimate Healing Peptide for Accelerated Tissue Recovery</h3>
              <div className="blog-meta">Aug 10 • 10 min read</div>
            </div>
          </motion.div>

          {/* Latest Posts */}
          <div className="latest-posts-wrapper">
            <h3 className="latest-posts-title">Latest post</h3>
            <div className="latest-posts-list">
              
              <motion.div className="latest-post-item" variants={itemVariants}>
                <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=200&auto=format&fit=crop" alt="Post 1" />
                <div className="latest-post-info">
                  <h4>Understanding the Role of GHK-Cu in Cellular Rejuvenation</h4>
                  <div className="blog-meta">Aug 10 • 10 min read</div>
                </div>
              </motion.div>

              <motion.div className="latest-post-item" variants={itemVariants}>
                <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=200&auto=format&fit=crop" alt="Post 2" />
                <div className="latest-post-info">
                  <h4>TB-500: Mechanisms of Tissue Repair and Inflammation Reduction.</h4>
                  <div className="blog-meta">Aug 12 • 8 min read</div>
                </div>
              </motion.div>

              <motion.div className="latest-post-item" variants={itemVariants}>
                <img src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=200&auto=format&fit=crop" alt="Post 3" />
                <div className="latest-post-info">
                  <h4>A Deep Dive into Growth Hormone Secretagogues: Ipamorelin vs. CJC-1295.</h4>
                  <div className="blog-meta">Aug 15 • 12 min read</div>
                </div>
              </motion.div>

              <motion.div className="latest-post-item" variants={itemVariants}>
                <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=200&auto=format&fit=crop" alt="Post 4" />
                <div className="latest-post-info">
                  <h4>Proper Storage and Reconstitution of Lyophilized Peptides.</h4>
                  <div className="blog-meta">Aug 18 • 6 min read</div>
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
