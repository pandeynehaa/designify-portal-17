
import { CanvasElement } from "./canvasElement";
import { Layer } from "./layer";

// useCanvasState types
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

// useCanvasUIState types
export interface CanvasUIStateReturn {
  showGrid: boolean;
  editMode: boolean;
  showLeftSidebar: boolean;
  showRightSidebar: boolean;
  setShowGrid: (show: boolean) => void;
  setEditMode: (edit: boolean) => void;
  setShowLeftSidebar: (show: boolean) => void;
  setShowRightSidebar: (show: boolean) => void;
  toggleGrid: () => void;
  toggleEditMode: () => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

// useCanvasHistory types
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

// useCanvasElements types
export interface CanvasElementsReturn {
  handleInsertText: (layerId?: string) => CanvasElement;
  handleInsertImage: (layerId?: string) => CanvasElement;
  handleInsertComponent: (layerId?: string) => CanvasElement;
  handleInsertImagePlaceholder: (layerId?: string) => CanvasElement;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => CanvasElement | null;
}

// useCanvasEffects types
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

// useLayerManagement types
export interface LayerManagementReturn {
  layers: Layer[];
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

// useCanvasDragDrop types
export interface CanvasDragDropProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  zoomLevel: number;
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
}

export interface CanvasDragDropReturn {
  isDraggingOver: boolean;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

// useCanvasZoom types
export interface CanvasZoomReturn {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleZoomReset: () => void;
}

// useDeviceState types
export interface DeviceStateReturn {
  deviceView: string;
  setDeviceView: React.Dispatch<React.SetStateAction<string>>;
  activeTool: string;
  setActiveTool: React.Dispatch<React.SetStateAction<string>>;
}

// useEditorUIState types
export interface EditorUIStateReturn {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  showPropertyPanel: boolean;
  setShowPropertyPanel: React.Dispatch<React.SetStateAction<boolean>>;
  showAIExtractor: boolean;
  setShowAIExtractor: React.Dispatch<React.SetStateAction<boolean>>;
  showThemeMapper: boolean;
  setShowThemeMapper: React.Dispatch<React.SetStateAction<boolean>>;
  handlePropertyClose: () => void;
  handlePropertyShow: () => void;
  handleTabClick: (tab: string) => void;
}

// useEditableText types
export interface EditableTextStyles {
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderlined?: boolean;
  textAlign?: string;
}

export interface EditableTextProps {
  initialText: string;
  onSave?: (newText: string, styles?: EditableTextStyles) => void;
}

export interface EditableTextReturn {
  isEditing: boolean;
  text: string;
  styles: EditableTextStyles;
  handleTextClick: (e?: React.MouseEvent) => void;
  handleTextBlur: () => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  updateStyle: (styleUpdates: Partial<EditableTextStyles>) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

// useComponentElement types
export interface ComponentElementProps {
  element: CanvasElement;
  activeTool: string;
  editMode: boolean;
}

export interface ComponentElementReturn {
  isSelected: boolean;
  position: { x: number, y: number };
  isEditing: boolean;
  editedText: string;
  setEditedText: React.Dispatch<React.SetStateAction<string>>;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleDoubleClick: (e: React.MouseEvent) => void;
  handleTextBlur: () => void;
  handleTextKeyDown: (e: React.KeyboardEvent) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isDragging: boolean;
}
