import { create } from 'zustand';
import type { StrategyType } from '../types/output';

interface UiState {
  activeStrategy: StrategyType;
  sidebarOpen: boolean;
  chatOpen: boolean;
  setActiveStrategy: (s: StrategyType) => void;
  setSidebarOpen: (open: boolean) => void;
  setChatOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeStrategy: '방어',
  sidebarOpen: true,
  chatOpen: false,
  setActiveStrategy: (activeStrategy) => set({ activeStrategy }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setChatOpen: (chatOpen) => set({ chatOpen }),
}));
