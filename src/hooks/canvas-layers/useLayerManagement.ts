
import { useState } from "react";
import { Layer } from "../../types/layer";
import { CanvasElement } from "../../types/canvasElement";
import { v4 as uuidv4 } from "uuid";
import { LayerManagementReturn } from "../../types/canvasLayerTypes";

export const useLayerManagement = (
  droppedElements: CanvasElement[],
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>
): LayerManagementReturn => {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: "default-layer",
      name: "Main Layer",
      visible: true,
      locked: false,
      expanded: true,
      zIndex: 0
    }
  ]);
  
  // Layer Management Functions
  const addLayer = (name: string): Layer => {
    const newLayer: Layer = {
      id: `layer-${uuidv4()}`,
      name,
      visible: true,
      locked: false,
      zIndex: layers.length
    };
    
    setLayers(prevLayers => [...prevLayers, newLayer]);
    return newLayer;
  };
  
  const deleteLayer = (layerId: string) => {
    // Don't delete if it's the only layer
    if (layers.length <= 1) {
      return;
    }
    
    // Check if layer has elements
    const hasElements = droppedElements.some(el => el.layerId === layerId);
    if (hasElements) {
      return; // Don't delete layers with elements
    }
    
    // Remove the layer
    setLayers(prevLayers => prevLayers.filter(layer => layer.id !== layerId));
  };
  
  const updateLayer = (layerId: string, updates: Partial<Layer>) => {
    setLayers(prevLayers => 
      prevLayers.map(layer => 
        layer.id === layerId ? { ...layer, ...updates } : layer
      )
    );
  };
  
  const toggleLayerVisibility = (layerId: string) => {
    setLayers(prevLayers => 
      prevLayers.map(layer => 
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };
  
  const toggleLayerLock = (layerId: string) => {
    setLayers(prevLayers => 
      prevLayers.map(layer => 
        layer.id === layerId ? { ...layer, locked: !layer.locked } : layer
      )
    );
  };
  
  const duplicateLayer = (layerId: string) => {
    const layerToDuplicate = layers.find(layer => layer.id === layerId);
    if (!layerToDuplicate) return;
    
    const newLayer: Layer = {
      ...layerToDuplicate,
      id: `layer-${uuidv4()}`,
      name: `${layerToDuplicate.name} (Copy)`,
      zIndex: layers.length
    };
    
    setLayers(prevLayers => [...prevLayers, newLayer]);
    
    // Also duplicate all elements in this layer
    const elementsInLayer = droppedElements.filter(el => el.layerId === layerId);
    const duplicatedElements = elementsInLayer.map(el => ({
      ...el,
      id: `${el.type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      layerId: newLayer.id
    }));
    
    setDroppedElements(prev => [...prev, ...duplicatedElements]);
    
    return newLayer;
  };
  
  const reorderLayer = (layerId: string, direction: 'up' | 'down') => {
    const layerIndex = layers.findIndex(layer => layer.id === layerId);
    if (layerIndex === -1) return;
    
    // Can't move up if already at the top
    if (direction === 'up' && layerIndex === 0) return;
    
    // Can't move down if already at the bottom
    if (direction === 'down' && layerIndex === layers.length - 1) return;
    
    const newLayers = [...layers];
    const targetIndex = direction === 'up' ? layerIndex - 1 : layerIndex + 1;
    
    // Swap the layers
    [newLayers[layerIndex], newLayers[targetIndex]] = [newLayers[targetIndex], newLayers[layerIndex]];
    
    // Also update their zIndices to maintain visual order
    newLayers.forEach((layer, index) => {
      layer.zIndex = index;
    });
    
    setLayers(newLayers);
  };
  
  // Element-Layer Operations
  const assignElementToLayer = (elementId: string, layerId: string) => {
    setDroppedElements(prevElements =>
      prevElements.map(element =>
        element.id === elementId ? { ...element, layerId } : element
      )
    );
  };
  
  const moveElementToLayer = (elementId: string, targetLayerId: string) => {
    // First check if the target layer is locked
    const targetLayer = layers.find(layer => layer.id === targetLayerId);
    if (targetLayer?.locked) return;
    
    setDroppedElements(prevElements =>
      prevElements.map(element =>
        element.id === elementId ? { ...element, layerId: targetLayerId } : element
      )
    );
  };

  return {
    layers,
    addLayer,
    deleteLayer,
    updateLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    duplicateLayer,
    reorderLayer,
    assignElementToLayer,
    moveElementToLayer
  };
};
