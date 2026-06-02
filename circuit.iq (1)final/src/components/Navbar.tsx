import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store/useAppStore';
import { LayoutGrid, FlaskConical, Cpu, Bot, FileText, Info, Zap, Moon, Sun, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
const { setLabOpen, isLabOpen, theme, toggleTheme, activeTab, setActiveTab, physicsBotOpen, setPhysicsBotOpen } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] h-20 px-4 md:px-6 flex items-center justify-between pointer-events-none"
        style={{ transform: "translateZ(9999px)", transformStyle: "preserve-3d", isolation: "isolate" }}
      >
        <div className="flex items-center gap-2 pointer-events-auto cursor-pointer" onClick={() => { setLabOpen(false); setActiveTab('home'); setMobileMenuOpen(false); }}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-neon to-blue-electric flex items-center justify-center shadow-lg shadow-indigo-neon/20">
            <Zap className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter text-slate-900 dark:text-white transition-colors">Circuit.<span className="text-blue-600">IQ</span></span>
        </div>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 backdrop-blur-md bg-white/70 dark:bg-black/20 border border-slate-200 dark:border-white/10 px-6 lg:px-8 py-3 rounded-full pointer-events-auto transition-colors shadow-sm">
          <NavLink icon={<LayoutGrid size={18} />} label="Home" active={activeTab === 'home' && !isLabOpen} onClick={() => { setActiveTab('home'); setLabOpen(false); }} />
          <NavLink icon={<FlaskConical size={18} />} label="Experiments" active={activeTab === 'experiments' && !isLabOpen} onClick={() => { setActiveTab('experiments'); setLabOpen(false); }} />
          <NavLink icon={<Cpu size={18} />} label="Virtual Lab" active={isLabOpen} onClick={() => setLabOpen(true)} />
          <NavLink icon={<Bot size={18} />} label="PhysicsBot" active={physicsBotOpen} onClick={() => { setPhysicsBotOpen(!physicsBotOpen); setLabOpen(false); }} />
          <NavLink icon={<FileText size={18} />} label="Contact" active={activeTab === 'contact' && !isLabOpen} onClick={() => { setActiveTab('contact'); setLabOpen(false); }} />
        </div>

        <div className="flex items-center gap-2 md:gap-4 pointer-events-auto">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setLabOpen(true)}
            className="hidden sm:block btn-primary"
          >
            Launch Lab
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-space-black pt-24 px-6 md:hidden pointer-events-auto"
          >
            <div className="flex flex-col gap-4">
              <MobileNavLink icon={<LayoutGrid size={20} />} label="Home" active={activeTab === 'home' && !isLabOpen} onClick={() => { setActiveTab('home'); setLabOpen(false); setMobileMenuOpen(false); }} />
              <MobileNavLink icon={<FlaskConical size={20} />} label="Experiments" active={activeTab === 'experiments' && !isLabOpen} onClick={() => { setActiveTab('experiments'); setLabOpen(false); setMobileMenuOpen(false); }} />
              <MobileNavLink icon={<Cpu size={20} />} label="Virtual Lab" active={isLabOpen} onClick={() => { setLabOpen(true); setMobileMenuOpen(false); }} />
              <MobileNavLink icon={<Bot size={20} />} label="PhysicsBot" active={activeTab === 'physicsbot' && !isLabOpen} onClick={() => { setActiveTab('physicsbot'); setLabOpen(false); setMobileMenuOpen(false); }} />
              <MobileNavLink icon={<FileText size={20} />} label="Contact" active={activeTab === 'contact' && !isLabOpen} onClick={() => { setActiveTab('contact'); setLabOpen(false); setMobileMenuOpen(false); }} />
              
              <div className="mt-8">
                <button 
                  onClick={() => { setLabOpen(true); setMobileMenuOpen(false); }}
                  className="w-full btn-primary py-4 text-lg"
                >
                  Launch Virtual Lab
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-colors relative group py-1",
        active ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white"
      )}
    >
      {icon}
      <span>{label}</span>
      {active && (
        <motion.div 
          layoutId="navbar-indicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
}

function MobileNavLink({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 text-left p-4 rounded-xl font-medium transition-colors w-full",
        active 
          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
          : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
      )}
    >
      {icon}
      <span className="text-lg">{label}</span>
    </button>
  );
}
