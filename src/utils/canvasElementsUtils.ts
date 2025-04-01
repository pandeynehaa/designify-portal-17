
import { CanvasElement } from "../types/canvasElement";
import { Layer } from "../types/layer";

/**
 * Filter and sort canvas elements based on visibility and z-index
 */
export const getSortedElements = (
  elements: CanvasElement[], 
  layers: Layer[]
): CanvasElement[] => {
  // Filter visible elements
  const visibleElements = elements.filter(element => {
    // Skip elements explicitly set to not visible
    if (element.visible === false) {
      return false;
    }

    // Skip elements in non-visible layers
    const elementLayer = layers.find(layer => layer.id === element.layerId);
    if (elementLayer && !elementLayer.visible) {
      return false;
    }

    return true;
  });

  // Sort elements by z-index and layer order
  return [...visibleElements].sort((a, b) => {
    // First sort by layer z-index
    const aLayer = layers.find(layer => layer.id === a.layerId) || { zIndex: 0 };
    const bLayer = layers.find(layer => layer.id === b.layerId) || { zIndex: 0 };
    
    if (aLayer.zIndex !== bLayer.zIndex) {
      return aLayer.zIndex - bLayer.zIndex;
    }
    
    // Then sort by element z-index within the same layer
    const aZIndex = a.zIndex ?? 0;
    const bZIndex = b.zIndex ?? 0;
    return aZIndex - bZIndex;
  });
};
