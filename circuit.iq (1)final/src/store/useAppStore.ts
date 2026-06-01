import { create } from 'zustand';

interface LabState {
  currentExperiment: string | null;
  setCurrentExperiment: (id: string | null) => void;
  isLabOpen: boolean;
  setLabOpen: (open: boolean) => void;
  physicsBotOpen: boolean;
  setPhysicsBotOpen: (open: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  highFidelityMode: boolean;
  setHighFidelityMode: (enabled: boolean) => void;
  activeTab: 'home' | 'experiments' | 'physicsbot' | 'contact';
  setActiveTab: (tab: 'home' | 'experiments' | 'physicsbot' | 'contact') => void;
}

export const useAppStore = create<LabState>((set) => ({
  currentExperiment: null,
  setCurrentExperiment: (id) => set({ currentExperiment: id }),
  isLabOpen: false,
  setLabOpen: (open) => set({ isLabOpen: open }),
  physicsBotOpen: false,
  setPhysicsBotOpen: (open) => set({ physicsBotOpen: open }),
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  highFidelityMode: true,
  setHighFidelityMode: (enabled) => set({ highFidelityMode: enabled }),
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
