/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, Suspense, lazy } from 'react';
import { useAppStore } from './store/useAppStore';
import Navbar from './components/Navbar';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from './lib/utils';

// Dynamic imports for optimized chunk sizes and rapid initial loads
const AntigravityHero = lazy(() => import('./components/AntigravityHero'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LabStudio = lazy(() => import('./pages/LabStudio'));
const AttendanceSystem = lazy(() => import('./components/AttendanceSystem'));
const InteractiveCircuitLines = lazy(() => import('./components/InteractiveCircuitLines'));
const PhysicsBotPanel = lazy(() => import('./components/PhysicsBotPanel'));

// Clean modern skeleton loader for page level Suspense fallback
function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#070b19] transition-colors duration-300">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-slate-800" />
        <div className="absolute inset-0 rounded-full border-2 border-t-blue-600 dark:border-t-blue-400 animate-spin" />
      </div>
      <div className="mt-4 text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase animate-pulse">
        Loading System Modules...
      </div>
    </div>
  );
}

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
      
      <Suspense fallback={null}>
        {!isLabOpen && activeTab !== 'home' && activeTab !== 'attendance' && <InteractiveCircuitLines />}
      </Suspense>

      {!isLabOpen && <Navbar />}
      
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>

      {/* Floating PhysicsBot panel — rendered above everything */}
      <Suspense fallback={null}>
        <PhysicsBotPanel />
      </Suspense>
    </div>
  );
}


