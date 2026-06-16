import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import AboutUs from './components/AboutUs';
import SpartaStandard from './components/SpartaStandard';
import ResearchCompounds from './components/ResearchCompounds';
import CollagenBooster from './components/CollagenBooster';
import AgeGate from './components/AgeGate';
import Categories from './components/Categories';
import FAQ from './components/FAQ';
import Blogs from './components/Blogs';
import Footer from './components/Footer';

function App() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsVerified(true);
    }
  }, []);

  useEffect(() => {
    if (!isVerified) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isVerified]);

  const handleVerify = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVerified(true);
  };

  return (
    <>
      {!isVerified && <AgeGate onVerify={handleVerify} />}
      <div style={{ height: isVerified ? 'auto' : '100vh', overflow: isVerified ? 'visible' : 'hidden' }}>
        <Navbar />
        <main>
          <Hero />
          {/* <TrustBadges /> */}
          <AboutUs />
          <Categories />
          <ResearchCompounds />
          <SpartaStandard />
          <CollagenBooster />
          <FAQ />
          <Blogs />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
