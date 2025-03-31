
import { Layer } from "./layer";

// Layer management types
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
