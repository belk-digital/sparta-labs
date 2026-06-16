import React from 'react';
import { Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const Hero = () => {
  return (
    <motion.section 
      className="hero" 
      id="shop"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video-bg"
      >
        <source src="https://res.cloudinary.com/dgrrovta3/video/upload/v1781585458/Firefly_animate_this_make_it_seamless_looped_and_muted_in_4k_62663_phhwmj.webm" type="video/webm" />
      </video>
      <div className="hero-glass-panel">
        <div className="hero-content-inner">
          <motion.h1 className="hero-title" variants={itemVariants}>RESEARCH PEPTIDES</motion.h1>
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Guided by scientific literature, deliberate sourcing,<br/>
            and controlled operational standards.
          </motion.p>
          
          <motion.div className="hero-cta-group" variants={itemVariants}>
            <button className="btn-pill btn-pill-solid">Shop Now</button>
            <button className="btn-pill btn-pill-outline">View Research Peptides</button>
          </motion.div>
        </div>
      </div>
      
      <motion.div className="mini-product-card" variants={itemVariants}>
        <div className="mini-card-notch">
          <span className="mini-notch-text">
            <Check size={10} strokeWidth={3} className="mini-check-icon" /> Third-Party Tested
          </span>
        </div>
        <div className="mini-card-image">
          <img src="/bottle.jpg" alt="Retatrutide 30mg" />
        </div>
        <div className="mini-card-info">
          <p className="mini-card-tag">30mg • Single dose</p>
          <h4 className="mini-card-title">Retatrutide 30mg</h4>
          <p className="mini-card-desc">Concentrated support for scientific research and literature.</p>
        </div>
        <button className="mini-card-add"><Plus size={18} strokeWidth={1.5} /></button>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
