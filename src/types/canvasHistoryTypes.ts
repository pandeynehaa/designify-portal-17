
import { CanvasElement } from "./canvasElement";

// Canvas history types
export interface HistoryAction {
  type: 'add' | 'update' | 'delete' | 'duplicate' | 'batch';
  elements: CanvasElement[];
  previousElements?: CanvasElement[];
}

export interface CanvasHistoryReturn {
  addToHistory: (action: HistoryAction) => void;
  undoAction: (
    droppedElements: CanvasElement[], 
    setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>
  ) => void;
  redoAction: (
    droppedElements: CanvasElement[], 
    setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>
  ) => void;
}
