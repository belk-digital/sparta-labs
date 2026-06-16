import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FAQ.css';

const faqs = [
  {
    question: "Are your products intended for human consumption?",
    answer: "No. All products sold by Sparta Peptides are strictly for laboratory research and in-vitro testing purposes only. They are not for human or animal consumption."
  },
  {
    question: "How do you verify the purity of your peptides?",
    answer: "We do not rely solely on manufacturer claims. Every single batch is independently tested by accredited third-party laboratories in the USA via HPLC and MS to guarantee a minimum of 99% purity before it ever reaches our inventory."
  },
  {
    question: "How should I store the peptides upon arrival?",
    answer: "For optimal stability, store lyophilized peptides in a freezer at -20°C. Once reconstituted, they should be stored in a refrigerator at 2°C to 8°C and used within the appropriate timeframe for your research."
  },
  {
    question: "What is your shipping policy?",
    answer: "All orders are packed securely in climate-controlled packaging to maintain optimal conditions during transit. We process and ship orders promptly to ensure your research is not delayed."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.section 
      className="faq-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container faq-container">
        <motion.div className="faq-header" variants={itemVariants}>
          <div className="faq-subtitle-wrap">
            <span className="faq-subtitle">Support</span>
          </div>
          <h2 className="faq-title">FREQUENTLY ASKED <br/> QUESTIONS</h2>
        </motion.div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question-area">
                <h3 className="faq-question">{faq.question}</h3>
                <div className="faq-icon">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="faq-chevron"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              <div 
                className="faq-answer-area" 
                style={{ 
                  maxHeight: openIndex === index ? '200px' : '0',
                  opacity: openIndex === index ? 1 : 0
                }}
              >
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FAQ;
