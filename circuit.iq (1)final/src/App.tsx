/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import AttendanceSystem from './components/AttendanceSystem';
import { useAppStore } from './store/useAppStore';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';
import LabStudio from './pages/LabStudio';
import InteractiveCircuitLines from './components/InteractiveCircuitLines';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from './lib/utils';
import PhysicsBotPanel from './components/PhysicsBotPanel';

export default function App() {
  const { isLabOpen, theme, activeTab, setLabOpen, setActiveTab } = useAppStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Reset window scroll to top when changing views/tabs
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, isLabOpen]);

  return (
    <div className={cn("min-h-screen bg-white dark:bg-space-black text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-300", theme)}>
      <div className="atmospheric-bg" />
      <div className="glow-top-left" />
      <div className="glow-bottom-right" />
      
      {!isLabOpen && activeTab !== 'home' && <InteractiveCircuitLines />}
      {!isLabOpen && <Navbar />}
      
      <AnimatePresence mode="wait">
        {!isLabOpen ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {activeTab === 'contact' ? (
  <ContactPage />
) : activeTab === 'attendance' ? (
  <div className="fixed inset-0 bg-[#070B14] overflow-y-auto z-[999]">
  <AttendanceSystem
 onLabUnlock={(sessionId) => {
  setActiveTab('home');
  setTimeout(() => setLabOpen(true), 300);
}}
/>
</div>
) : (
              <LandingPage view={activeTab === 'home' ? 'home' : activeTab} />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="lab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LabStudio />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating PhysicsBot panel — rendered above everything */}
      <PhysicsBotPanel />
    </div>
  );
}

