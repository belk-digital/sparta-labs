import React from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import './ResearchCompounds.css';

const HelmetLogo = ({ className }) => (
  <svg viewBox="0 0 190 300" className={className} fill="#D31118">
    <path d="M94.02,228.41c-5.98-3.52-19.52-15.64-19.13-22.16l3.19-52.86-55.56-24.18c-.45,9.37,1.22,17.33,2.88,25.78,2.03,13.88,15.02,16.75,26.2,22.56,3.74,2.15,9.43,5.67,9.43,11.05v94.56S2.59,206.44,2.59,206.44c-2.8-3.68-2.25-8.49-2.59-12.84l.17-90.97c.02-10.06,3.04-19.08,8.62-27.26,17.61-25.3,57.52-45.01,84.79-58.71,28.42,14.43,62.61,31.25,82.58,55.75,5.71,7.74,10.53,15.88,10.55,26.07l.26,101.36c-1.24,3.84-2.61,6.9-5,10.05l-55.98,73.44-.54-89.59c-.04-5.96.76-11.19,6.44-14.24l17.88-9.14c6.75-3.45,11.37-9.02,11.89-16.81,1.64-8.05,3.33-15.91,2.67-24.57l-55.92,24.83,3.16,54.98c-2.32,8.15-11.11,13.39-17.57,19.62Z"/>
  </svg>
);

const compounds = [
  {
    id: 1,
    category: 'Reconstitution Solution Research',
    name: 'Bacteriostatic Water',
    price: '$89.00',
    tags: ['5mg', '10mg'],
    image: '/bottle.jpg',
    inCart: false
  },
  {
    id: 2,
    category: 'Tissue Repair Research',
    name: 'BPC-157',
    price: '$72.00',
    tags: ['5mg', '10mg'],
    image: '/bottle.jpg',
    inCart: false
  },
  {
    id: 3,
    category: 'Vascular Research',
    name: 'Retratrutide',
    price: '$72.00',
    tags: ['5mg', '10mg'],
    image: '/bottle.jpg',
    inCart: true
  },
  {
    id: 4,
    category: 'GH Research',
    name: 'TB-500',
    price: '$94.00',
    tags: ['5mg', '10mg'],
    image: '/bottle.jpg',
    inCart: false
  },
  {
    id: 5,
    category: 'Tissue Repair Research',
    name: 'GHK-CU',
    price: '$148.00',
    tags: ['5mg', '10mg'],
    image: '/bottle.jpg',
    inCart: false
  },
  {
    id: 6,
    category: 'Metabolic Research',
    name: 'MOTS-C',
    price: '$124.00',
    tags: ['5mg', '10mg'],
    image: '/bottle.jpg',
    inCart: false
  }
];

const ResearchCompounds = () => {
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
      className="research-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div className="research-header" variants={itemVariants}>
          <HelmetLogo className="research-header-logo" />
          <h2 className="research-title">Research Compounds</h2>
          <button className="view-all-btn">
            View all compounds <ChevronRight size={14} className="ml-1" />
          </button>
        </motion.div>

        <motion.div className="compounds-grid" variants={itemVariants}>
          {compounds.map(compound => (
            <motion.div key={compound.id} className="compound-card" variants={itemVariants}>
              <div className="card-notch">
                <span className="notch-text">
                  <Check size={10} strokeWidth={3} className="check-icon" /> Third-Party Tested
                </span>
              </div>

              <div className="compound-card-top">
                <HelmetLogo className="card-logo" />
              </div>
              
              <div className="compound-image">
                <img src={compound.image} alt={compound.name} />
              </div>
              
              <div className="compound-info">
                <p className="compound-category">{compound.category}</p>
                <h3 className="compound-name">{compound.name}</h3>
                
                <div className="compound-price-row">
                  <span className="compound-price">{compound.price}</span>
                  <div className="compound-tags">
                    {compound.tags.map(tag => (
                      <span key={tag} className="compound-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="compound-actions">
                  {compound.inCart ? (
                    <button className="add-to-cart-btn in-cart">
                      In Cart <Check size={14} className="ml-1" />
                    </button>
                  ) : (
                    <>
                      <button className="add-to-cart-btn">Add to cart</button>
                      <div className="qty-selector">
                        <button className="qty-btn">-</button>
                        <span className="qty-value">1</span>
                        <button className="qty-btn">+</button>
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
