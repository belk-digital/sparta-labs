import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dna, 
  Activity, 
  Brain, 
  FlaskConical, 
  TrendingUp, 
  Scale, 
  Target, 
  BatteryCharging 
} from 'lucide-react';
import './Categories.css';

const categories = [
  {
    id: 1,
    title: 'Bioregulators',
    description: 'Short-chain peptide bioregulators. Research-grade purity, lot-specific COA.',
    image: '/categories/light_bioregulators.png',
    icon: <Dna size={20} />
  },
  {
    id: 2,
    title: 'Cellular Health',
    description: 'Compounds studied for cellular repair and longevity applications.',
    image: '/categories/light_cellular_health.png',
    icon: <Activity size={20} />
  },
  {
    id: 3,
    title: 'Cognitive Function',
    description: 'Peptides associated with neurological and cognitive function research.',
    image: '/categories/light_cognitive.png',
    icon: <Brain size={20} />
  },
  {
    id: 4,
    title: 'Essentials',
    description: 'Core research compounds — the foundational stack for any peptide lab.',
    image: '/categories/light_essentials.png',
    icon: <FlaskConical size={20} />
  },
  {
    id: 5,
    title: 'Growth Factor',
    description: 'Growth factor peptides for tissue and recovery research. LC-MS verified.',
    image: '/categories/light_growth.png',
    icon: <TrendingUp size={20} />
  },
  {
    id: 6,
    title: 'Metabolic',
    description: 'GLP-1 and metabolic peptides for body composition and metabolic research.',
    image: '/categories/light_metabolic.png',
    icon: <Scale size={20} />
  },
  {
    id: 7,
    title: 'Receptor Agonist',
    description: 'Receptor-targeting peptides for advanced research protocols.',
    image: '/categories/light_receptor.png',
    icon: <Target size={20} />
  },
  {
    id: 8,
    title: 'Recovery',
    description: 'Advanced peptides formulated to support physical recovery and tissue repair.',
    image: '/categories/light_recovery.png',
    icon: <BatteryCharging size={20} />
  }
];

const Categories = () => {
  const [activeId, setActiveId] = useState(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      className="accordion-categories-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="accordion-categories-container">
        
        <motion.div className="accordion-categories-header" variants={itemVariants}>
          <h2 className="accordion-categories-title">
            <span className="title-strikethrough">Discover</span> a few more categories.
          </h2>
          <p className="accordion-categories-subtitle">
            There's even more to explore. We bring you a collection of 
            advanced compounds designed to refine and elevate your research.
          </p>
        </motion.div>

        <motion.div className="accordion-container" variants={itemVariants}>
          {categories.map((category) => {
            const isActive = activeId === category.id;

            return (
              <motion.div
                key={category.id}
                className={`accordion-card ${isActive ? 'active' : ''}`}
                onClick={() => setActiveId(category.id)}
                animate={{
                  flex: isActive ? 5 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                  mass: 0.8
                }}
              >
                <div 
                  className="accordion-card-bg"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className={`accordion-overlay ${isActive ? 'active-overlay' : 'inactive-overlay'}`}></div>
                </div>

                <div className="accordion-card-content">
                  {/* Vertical Title (visible when inactive) */}
                  <motion.div 
                    className="accordion-vertical-title"
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {category.title}
                  </motion.div>

                  {/* Active Content (visible when active) */}
                  <motion.div 
                    className="accordion-active-content"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
                  >
                    <h3 className="accordion-active-title">{category.title}</h3>
                    <p className="accordion-active-desc">{category.description}</p>
                    <button className="accordion-explore-btn">
                      <span className="icon-wrapper">{category.icon}</span> Explore category
                    </button>
                  </motion.div>

                  {/* Bottom Icon (always visible, but positioned differently depending on state) */}
                  <div className={`accordion-bottom-icon ${isActive ? 'active-icon' : ''}`}>
                    {category.icon}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Categories;
