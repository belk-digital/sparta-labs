import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', hasDropdown: true },
    { label: 'Quality & Standards' },
    { label: 'About' },
    { label: 'FAQ' },
    { label: 'Contact' },
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-top container">
          <div className="top-left">
            <a href="/" className="logo">
              <svg viewBox="0 0 190 300" width="36" height="46" className="nav-logo-svg">
                <path d="M94.02,228.41c-5.98-3.52-19.52-15.64-19.13-22.16l3.19-52.86-55.56-24.18c-.45,9.37,1.22,17.33,2.88,25.78,2.03,13.88,15.02,16.75,26.2,22.56,3.74,2.15,9.43,5.67,9.43,11.05v94.56S2.59,206.44,2.59,206.44c-2.8-3.68-2.25-8.49-2.59-12.84l.17-90.97c.02-10.06,3.04-19.08,8.62-27.26,17.61-25.3,57.52-45.01,84.79-58.71,28.42,14.43,62.61,31.25,82.58,55.75,5.71,7.74,10.53,15.88,10.55,26.07l.26,101.36c-1.24,3.84-2.61,6.9-5,10.05l-55.98,73.44-.54-89.59c-.04-5.96.76-11.19,6.44-14.24l17.88-9.14c6.75-3.45,11.37-9.02,11.89-16.81,1.64-8.05,3.33-15.91,2.67-24.57l-55.92,24.83,3.16,54.98c-2.32,8.15-11.11,13.39-17.57,19.62Z"/>
              </svg>
              <span className="logo-text">SPARTA LABS</span>
            </a>
          </div>
          <div className="top-center">
            {/* Empty center */}
          </div>
          <div className="top-right">
            <div className="search-bar">
              <Search size={16} color="var(--text-light)" />
              <input type="text" placeholder="Search compounds..." />
            </div>
            <div className="nav-icons">
              <button aria-label="User account">
                <User size={20} />
              </button>
              <button className="cart-btn" aria-label="Shopping cart">
                <ShoppingBag size={20} />
                <span className="cart-badge">0</span>
              </button>
              <button className="menu-btn" onClick={() => setPanelOpen(true)}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div
              className="panel-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setPanelOpen(false)}
            />
            <motion.div
              className="side-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            >
              <button className="close-panel-btn" onClick={() => setPanelOpen(false)}>
                <X size={28} />
              </button>
              <div className="panel-content">
                <ul className="panel-nav-links">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.label}
                      className="panel-nav-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                    >
                      <a href={`#${link.label.toLowerCase().replace(/ /g, '-')}`} className="panel-link" onClick={() => setPanelOpen(false)}>
                        {link.label}
                        {link.hasDropdown && <ChevronDown size={16} className="ml-1" />}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
