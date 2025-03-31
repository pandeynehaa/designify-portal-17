
import { CanvasElement } from "./canvasElement";
import { Layer } from "./layer";

// Canvas elements types
export interface CanvasElementsReturn {
  handleInsertText: (layerId?: string) => CanvasElement;
  handleInsertImage: (layerId?: string) => CanvasElement;
  handleInsertComponent: (layerId?: string) => CanvasElement;
  handleInsertImagePlaceholder: (layerId?: string) => CanvasElement;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => CanvasElement | null;
}

// Canvas effects types
export interface NFTEffectsProps {
  blurAmount?: number;
  glowColor?: string;
  glowSpread?: number;
  rotation?: number;
}

export interface BackgroundPropertiesProps {
  backgroundType?: 'color' | 'gradient' | 'image';
  backgroundValue?: string;
  blurAmount?: number;
  opacity?: number;
  enable3D?: boolean;
}

export interface CanvasEffectsReturn {
  updateNFTEffects: (id: string, effects: NFTEffectsProps) => void;
  updateBackgroundProperties: (id: string, properties: BackgroundPropertiesProps) => void;
}

// Main canvas state return type
export interface CanvasStateReturn {
  droppedElements: CanvasElement[];
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
  layers: Layer[];
  showGrid: boolean;
  toggleGrid: () => void;
  editMode: boolean;
  toggleEditMode: () => void;
  showLeftSidebar: boolean;
  showRightSidebar: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  handleInsertText: (layerId?: string) => CanvasElement;
  handleInsertImage: (layerId?: string) => CanvasElement;
  handleInsertComponent: (layerId?: string) => CanvasElement;
  handleInsertImagePlaceholder: (layerId?: string) => CanvasElement;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => CanvasElement | null;
  updateNFTEffects: (id: string, effects: NFTEffectsProps) => void;
  updateBackgroundProperties: (id: string, properties: BackgroundPropertiesProps) => void;
  undoAction: () => void;
  redoAction: () => void;
  // Layer functions
  addLayer: (name: string) => Layer;
  deleteLayer: (layerId: string) => void;
  updateLayer: (layerId: string, updates: Partial<Layer>) => void;
  toggleLayerVisibility: (layerId: string) => void;
  toggleLayerLock: (layerId: string) => void;
  duplicateLayer: (layerId: string) => Layer | undefined;
  reorderLayer: (layerId: string, direction: 'up' | 'down') => void;
  assignElementToLayer: (elementId: string, layerId: string) => void;
  moveElementToLayer: (elementId: string, targetLayerId: string) => void;
}
