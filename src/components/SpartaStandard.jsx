import React from 'react';
import { motion } from 'framer-motion';
import './SpartaStandard.css';
const SpartaStandard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.section 
      className="sparta-standard-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container standard-grid">
        
        {/* Row 1: Title Area */}
        <motion.div className="standard-title-area" variants={itemVariants}>
          <div className="standard-subtitle-wrap">
            <span className="standard-subtitle">The Sparta Standard</span>
          </div>
          <h2 className="standard-title">
            ENGINEERED FOR <br/> ABSOLUTE PRECISION.
          </h2>
        </motion.div>

        {/* Row 2: Cards 1 & 2 */}
        <motion.div className="standard-card card-1" variants={itemVariants}>
          <div className="card-top">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div className="card-badge">99.1%+ Verified</div>
          </div>
          <div className="card-content">
            <h4>99.1%+ Verified Purity</h4>
            <p>We don't rely on manufacturer claims. Every single batch is independently tested by accredited third-party laboratories in the USA to guarantee minimum 99% purity before it ever reaches our inventory.</p>
          </div>
        </motion.div>

        <motion.div className="standard-card card-2" variants={itemVariants}>
          <div className="card-top">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
            <div className="card-badge">Lyophilized</div>
          </div>
          <div className="card-content">
            <h4>Lyophilized Stability</h4>
            <p>Our peptides are lyophilized (freeze-dried) under vacuum to ensure long-term molecular stability during transit and storage.</p>
          </div>
        </motion.div>

        {/* Span Card: Image / Video */}
        <motion.div className="standard-card-image" variants={itemVariants}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            src="https://res.cloudinary.com/dgrrovta3/video/upload/v1781558507/sparta-video-asset_yfkyhc.webm" 
          />
        </motion.div>

        {/* Row 3: Text area and Cards 3 & 4 */}
        <motion.div className="standard-text-area" variants={itemVariants}>
          <h3>Discover Quality</h3>
          <p>Every compound is synthesized under strict laboratory conditions, independently verified via third-party analysis, and sealed to ensure maximum stability.</p>
        </motion.div>

        <motion.div className="standard-card card-3" variants={itemVariants}>
          <div className="card-top">
            <div className="card-icon">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div className="card-badge">Exact Dosing</div>
          </div>
          <div className="card-content">
            <h4>Exact Milligram Dosing</h4>
            <p>Precision is paramount. We guarantee exact milligram content per vial, completely eliminating the guesswork from your research.</p>
          </div>
        </motion.div>

        <motion.div className="standard-card card-4" variants={itemVariants}>
          <div className="card-top">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div className="card-badge">Secure</div>
          </div>
          <div className="card-content">
            <h4>Secure Transit</h4>
            <p>All orders are packed securely in climate-controlled packaging to maintain optimal conditions during transit to your facility.</p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default SpartaStandard;
