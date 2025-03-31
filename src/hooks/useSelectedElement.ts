
import { create } from 'zustand';
import { CanvasElement } from '@/types/canvasElement';

interface SelectedElementState {
  selectedElement: CanvasElement | null;
  selectElement: (element: CanvasElement | null) => void;
}

export const useSelectedElement = create<SelectedElementState>((set) => ({
  selectedElement: null,
  selectElement: (element) => set({ selectedElement: element }),
}));
