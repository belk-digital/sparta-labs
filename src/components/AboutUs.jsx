import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AboutUs.css';
import scientistImage from '../assets/scientist_lab.png';
import microscopeImage from '../assets/microscope_lab.png';
import vialImage from '../assets/vial_lab.png';
import arrivalsBg from '../assets/arrivals_bg.png';

const slideImages = [
  { 
    src: scientistImage, 
    alt: "Scientist working in lab",
    title: "Trust, Transparency, Results",
    description: "At Sparta, we are dedicated to pushing the boundaries of peptide science. Our lab ensures every compound meets the absolute highest standards."
  },
  { 
    src: microscopeImage, 
    alt: "Modern microscope in lab",
    title: "Cutting-Edge Analysis",
    description: "We utilize advanced HPLC and Mass Spectrometry to verify the molecular integrity and purity of every single batch we produce."
  },
  { 
    src: vialImage, 
    alt: "Scientist holding vial",
    title: "99.1%+ Verified Purity",
    description: "We don't rely on manufacturer claims. Independent, third-party testing guarantees you receive only the purest research materials."
  }
];

const AboutUs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % slideImages.length);
  };

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

  return (
    <motion.section 
      className="about-us-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container about-us-container">
        
        {/* Header Area */}
        <motion.div className="about-us-header" variants={itemVariants}>
          <div className="about-us-title-area">
            <span className="about-us-subtitle">ABOUT US</span>
            <h2 className="about-us-title">
              <span className="text-gray">Welcome to</span> Sparta — your trusted source <br />
              for premium-quality, <span className="text-gray">lab-tested research compounds.</span>
            </h2>
          </div>
          <div className="about-us-logo-area">
             <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Interlocking geometric shapes similar to image */}
                <path d="M35 5C22.8 5 13 14.8 13 27C13 33.3 15.6 39 19.8 43.1C23.9 38.6 29.2 35 35 35C40.8 35 46.1 38.6 50.2 43.1C54.4 39 57 33.3 57 27C57 14.8 47.2 5 35 5Z" fill="url(#redGrad1)"/>
                <path d="M35 65C47.2 65 57 55.2 57 43C57 36.7 54.4 31 50.2 26.9C46.1 31.4 40.8 35 35 35C29.2 35 23.9 31.4 19.8 26.9C15.6 31 13 36.7 13 43C13 55.2 22.8 65 35 65Z" fill="url(#redGrad2)"/>
                <defs>
                  <linearGradient id="redGrad1" x1="13" y1="5" x2="57" y2="43.1" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF3B3B"/>
                    <stop offset="1" stopColor="#B30B11"/>
                  </linearGradient>
                  <linearGradient id="redGrad2" x1="13" y1="65" x2="57" y2="26.9" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D31118"/>
                    <stop offset="1" stopColor="#FF7A7A"/>
                  </linearGradient>
                </defs>
             </svg>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="about-us-content">
          <motion.div className="about-us-controls" variants={itemVariants}>
            <button className="nav-btn prev-btn" onClick={handlePrev}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="nav-btn next-btn" onClick={handleNext}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </motion.div>

          <div className="about-us-cards">
            {/* Scientist Image Card */}
            <motion.div className="about-card image-card" variants={itemVariants}>
              {slideImages.map((img, idx) => (
                <img 
                  key={idx}
                  src={img.src} 
                  alt={img.alt} 
                  className={`about-card-img ${idx === currentImageIndex ? 'active' : ''}`} 
                />
              ))}
              <div className="image-card-overlay">
                <div className="image-card-bottom">
                  <h3>{slideImages[currentImageIndex].title}</h3>
                  <p className="image-card-description">{slideImages[currentImageIndex].description}</p>
                  <div className="slider-dots">
                    {slideImages.map((_, idx) => (
                      <span 
                        key={idx} 
                        className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(idx)}
                        style={{ cursor: 'pointer' }}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* New Arrivals Card */}
            <motion.div className="about-card arrivals-card" variants={itemVariants}>
              <img src={arrivalsBg} alt="Abstract arrivals background" className="arrivals-bg-img" />
              <div className="arrivals-overlay"></div>
              
              <div className="arrivals-content-wrapper">
                <div className="arrivals-header">
                  <h3>New arrivals</h3>
                </div>
                
                <div className="arrivals-body">
                <div className="arrivals-icons-group">
                  <div className="hex-icon">
                    <svg width="60" height="68" viewBox="0 0 60 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 1L59 17.5V50.5L30 67L1 50.5V17.5L30 1Z" stroke="#EAEAEA" strokeWidth="1.5"/>
                      {/* Gut/Colon icon representation */}
                      <path d="M22 25C22 25 28 20 38 25C43 27.5 44 33 42 38C40 43 35 42 35 42C35 42 32 46 32 50C32 54 28 54 28 54" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M28 35C28 35 24 33 22 28C20.5 24 22 25 22 25" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="hex-icon hex-overlap">
                    <svg width="60" height="68" viewBox="0 0 60 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 1L59 17.5V50.5L30 67L1 50.5V17.5L30 1Z" stroke="#EAEAEA" strokeWidth="1.5" fill="#ffffff" />
                      {/* Atom icon representation */}
                      <circle cx="30" cy="34" r="4" stroke="#111111" strokeWidth="2"/>
                      <ellipse cx="30" cy="34" rx="14" ry="5" transform="rotate(30 30 34)" stroke="#111111" strokeWidth="1.5"/>
                      <ellipse cx="30" cy="34" rx="14" ry="5" transform="rotate(-30 30 34)" stroke="#111111" strokeWidth="1.5"/>
                      <ellipse cx="30" cy="34" rx="14" ry="5" transform="rotate(90 30 34)" stroke="#111111" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="arrivals-footer">
                <button className="pill-btn outline">
                  <span>Recovery & Repair Peptides</span>
                  <span className="arrow-circle">↗</span>
                </button>
                <button className="pill-btn solid">
                  <span>Fat Loss Peptides</span>
                  <span className="arrow-circle light">↗</span>
                </button>
              </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

export default AboutUs;
