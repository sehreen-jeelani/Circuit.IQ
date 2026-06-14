/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, Suspense, lazy } from 'react';
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

const AntigravityHero = lazy(() => import('./components/AntigravityHero'));

export default function App() {
  const isLabOpen = useAppStore((state) => state.isLabOpen);
  const theme = useAppStore((state) => state.theme);
  const activeTab = useAppStore((state) => state.activeTab);
  const setLabOpen = useAppStore((state) => state.setLabOpen);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

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
      
      {!isLabOpen && activeTab !== 'home' && activeTab !== 'attendance' && <InteractiveCircuitLines />}
      {!isLabOpen && <Navbar />}
      
      <AnimatePresence mode="wait">
        {!isLabOpen ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'contact' ? (
              <ContactPage />
            ) : activeTab === 'attendance' ? (
              <div className="min-h-screen pt-24 pb-12 w-full flex items-center justify-center relative z-10 overflow-x-hidden">
                <Suspense fallback={<div className="fixed inset-0 bg-transparent pointer-events-none z-0" />}>
                  <AntigravityHero hideBoard={true} />
                </Suspense>
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
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

