/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';
import LabStudio from './pages/LabStudio';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const { isLabOpen, theme, activeTab } = useAppStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={cn("min-h-screen bg-white dark:bg-space-black text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-300", theme)}>
      <div className="atmospheric-bg" />
      <div className="glow-top-left" />
      <div className="glow-bottom-right" />
      
      {!isLabOpen && <Navbar />}
      
      <AnimatePresence mode="wait">
        {!isLabOpen && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {activeTab === 'home' && <LandingPage view="home" />}
            {activeTab === 'experiments' && <LandingPage view="experiments" />}
            {activeTab === 'physicsbot' && <LandingPage view="physicsbot" />}
            {activeTab === 'contact' && <ContactPage />}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLabOpen && (
          <motion.div
            key="lab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LabStudio />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

