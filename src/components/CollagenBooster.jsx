import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Microscope, Snowflake, ShieldCheck, Dna } from 'lucide-react';
import { motion } from 'framer-motion';
import './CollagenBooster.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const handVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 15, duration: 1.2 }
  }
};

const circleVariants = {
  hidden: { scale: 0.8, x: "-50%", opacity: 0 },
  visible: {
    scale: 1, x: "-50%", opacity: 1,
    transition: { duration: 1, ease: "easeOut" }
  }
};

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const bottomCenterVariants = {
  hidden: { opacity: 0, y: 30, x: "-50%" },
  visible: { opacity: 1, y: 0, x: "-50%", transition: { duration: 0.6, ease: "easeOut" } }
};

const CollagenBooster = () => {
  const contentRef = useRef(null); // SVG parent — measure everything relative to this
  const circleRef = useRef(null);
  const tlRef = useRef(null);
  const blRef = useRef(null);
  const trRef = useRef(null);
  const brRef = useRef(null);
  const bcRef = useRef(null);

  const [lines, setLines] = useState([]);
  const [dotPositions, setDotPositions] = useState([]);

  const computeLines = useCallback(() => {
    if (window.innerWidth <= 992) { setLines([]); setDotPositions([]); return; }

    const content = contentRef.current;
    const circle  = circleRef.current;
    if (!content || !circle) return;

    const base = content.getBoundingClientRect();
    const cRect = circle.getBoundingClientRect();

    // Circle center & radius in content-relative coords
    const cx = cRect.left - base.left + cRect.width  / 2;
    const cy = cRect.top  - base.top  + cRect.height / 2;
    const r  = cRect.width / 2;

    // Helper: point on circle at angle (deg, 0 = right, CCW)
    const ptOnCircle = (deg) => {
      const rad = (deg * Math.PI) / 180;
      return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    };

    // Dot angles: place them to match feature positions
    // top-left feature  → ~210° (lower-left of circle, so line exits left)
    // bottom-left       → ~150°
    // top-right         → ~330°
    // bottom-right      → ~30°
    // bottom-center     → 90°  (very bottom of circle)
    const dotAngles = {
      tl: -150,  // top-left quadrant
      bl:  150,  // bottom-left quadrant
      tr:  -30,  // top-right quadrant
      br:   30,  // bottom-right quadrant
      bc:   90,  // bottom
      tc:  -90,  // top
    };

    const dots = {};
    Object.entries(dotAngles).forEach(([k, a]) => { dots[k] = ptOnCircle(a); });

    // Store all visible dots
    setDotPositions(Object.values(dots));

    // Build L-shaped SVG paths from feature edge → dot on circle
    const featureDefs = [
      { ref: tlRef, dot: dots.tl, side: 'left'   },
      { ref: blRef, dot: dots.bl, side: 'left'   },
      { ref: trRef, dot: dots.tr, side: 'right'  },
      { ref: brRef, dot: dots.br, side: 'right'  },
      { ref: bcRef, dot: dots.bc, side: 'bottom' },
    ];

    const newLines = [];
    featureDefs.forEach(({ ref, dot, side }) => {
      if (!ref.current) return;
      const fr = ref.current.getBoundingClientRect();
      // Convert to content-relative coords
      const left   = fr.left   - base.left;
      const top    = fr.top    - base.top;
      const right  = fr.right  - base.left;
      const bottom = fr.bottom - base.top;
      const midY   = top + fr.height / 2;

      let d;
      const cornerR = 8;

      if (side === 'left') {
        // Start from right-center of feature, go right to dot.x, then up/down to dot.y
        const sx = right;
        const sy = midY;
        const tx = dot.x;
        const ty = dot.y;
        if (sy < ty) {
          // going down
          d = `M ${sx} ${sy} H ${tx - cornerR} Q ${tx} ${sy} ${tx} ${sy + cornerR} V ${ty}`;
        } else {
          // going up
          d = `M ${sx} ${sy} H ${tx - cornerR} Q ${tx} ${sy} ${tx} ${sy - cornerR} V ${ty}`;
        }
      } else if (side === 'right') {
        // Start from left-center of feature, go left to dot.x, then up/down to dot.y
        const sx = left;
        const sy = midY;
        const tx = dot.x;
        const ty = dot.y;
        if (sy < ty) {
          d = `M ${sx} ${sy} H ${tx + cornerR} Q ${tx} ${sy} ${tx} ${sy + cornerR} V ${ty}`;
        } else {
          d = `M ${sx} ${sy} H ${tx + cornerR} Q ${tx} ${sy} ${tx} ${sy - cornerR} V ${ty}`;
        }
      } else {
        // bottom-center: straight line from top-center of feature up to dot
        const sx = left + fr.width / 2;
        const sy = top;
        d = `M ${sx} ${sy} V ${dot.y}`;
      }

      newLines.push(d);
    });

    setLines(newLines);
  }, []);

  useEffect(() => {
    // Run after animations settle
    const t = setTimeout(computeLines, 1200);
    window.addEventListener('resize', computeLines);
    return () => { clearTimeout(t); window.removeEventListener('resize', computeLines); };
  }, [computeLines]);

  return (
    <section className="collagen-section">
      <div className="container">
        <motion.div
          className="collagen-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="collagen-title">THE SPARTA DIFFERENCE</h2>
          <div className="collagen-divider"></div>
          <p className="collagen-subtitle">
            Each batch is tested by an independent, accredited laboratory to confirm purity,
            identity, and composition. Results are documented and available by batch.
          </p>
          <button className="coa-btn">
            <span>View COA</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </motion.div>

        {/* content ref is what the SVG is measured against */}
        <motion.div
          className="collagen-content"
          ref={contentRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          onAnimationComplete={computeLines}
        >
          {/* SVG overlay — MUST be direct child of collagen-content */}
          <svg
            className="collagen-svg-overlay"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%',
              pointerEvents: 'none', zIndex: 6,
              overflow: 'visible'
            }}
          >
            {lines.map((d, i) => (
              <path key={i} d={d} stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            ))}
            {dotPositions.map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r="12" fill="rgba(255,255,255,0.10)" />
                <circle cx={pt.x} cy={pt.y} r="7"  fill="rgba(255,255,255,0.30)" />
                <circle cx={pt.x} cy={pt.y} r="4"  fill="white" />
              </g>
            ))}
          </svg>

          {/* Circle ring */}
          <motion.div className="collagen-circle-line" ref={circleRef} variants={circleVariants} />

          {/* Central Image */}
          <motion.div className="collagen-center-image" variants={handVariants}>
            <img src="/hand-holding-vial.png" alt="Hand holding vial" />
          </motion.div>

          {/* Features */}
          <div className="collagen-features">
            {/* Top Left */}
            <motion.div className="collagen-feature top-left" ref={tlRef} variants={featureVariants}>
              <div className="feature-icon-container">
                <Microscope color="#d31118" strokeWidth={1.5} size={28} />
              </div>
              <div className="feature-text left-align-text">
                <h3>INDEPENDENTLY<br/>LAB TESTED</h3>
                <p>Verified purity &<br/>composition.</p>
              </div>
            </motion.div>

            {/* Bottom Left */}
            <motion.div className="collagen-feature bottom-left" ref={blRef} variants={featureVariants}>
              <div className="feature-icon-container">
                <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:30,height:20}}>
                  <rect width="60" height="40" fill="#fff" rx="2"/>
                  <path d="M0 6H60M0 14H60M0 22H60M0 30H60" stroke="#d31118" strokeWidth="4"/>
                  <rect width="26" height="24" fill="#002868" rx="2"/>
                  <path d="M4 4h2v2H4zm6 0h2v2h-2zm6 0h2v2h-2zm6 0h2v2h-2zM4 10h2v2H4zm6 0h2v2h-2zm6 0h2v2h-2zm6 0h2v2h-2zM4 16h2v2H4zm6 0h2v2h-2zm6 0h2v2h-2zm6 0h2v2h-2z" fill="#fff"/>
                </svg>
              </div>
              <div className="feature-text left-align-text">
                <h3>MADE IN THE<br/>United States</h3>
                <p>Manufactured and<br/>handled under<br/>controlled standards.</p>
              </div>
            </motion.div>

            {/* Top Right */}
            <motion.div className="collagen-feature top-right" ref={trRef} variants={featureVariants}>
              <div className="feature-icon-container">
                <Dna color="#d31118" strokeWidth={1.5} size={28} />
              </div>
              <div className="feature-text left-align-text">
                <h3>ADVANCED PEPTIDE<br/>SYNTHESIS</h3>
                <p>Pioneering peptide<br/>research.</p>
              </div>
            </motion.div>

            {/* Bottom Right */}
            <motion.div className="collagen-feature bottom-right" ref={brRef} variants={featureVariants}>
              <div className="feature-icon-container">
                <Snowflake color="#d31118" strokeWidth={1.5} size={28} />
              </div>
              <div className="feature-text left-align-text">
                <h3>COLD CHAIN<br/>LOGISTICS</h3>
                <p>Stored and shipped<br/>under strict<br/>temperature control.</p>
              </div>
            </motion.div>

            {/* Bottom Center */}
            <motion.div className="collagen-feature bottom-center" ref={bcRef} variants={bottomCenterVariants}>
              <div className="feature-icon-container">
                <ShieldCheck color="#d31118" strokeWidth={1.5} size={28} />
              </div>
              <div className="feature-text center-align-text">
                <h3>FULL TRACEABILITY</h3>
                <p>Batch-specific sourcing<br/>and documentation.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollagenBooster;
