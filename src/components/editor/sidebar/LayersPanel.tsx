
import React, { useState } from "react";
import { useCanvasState } from "@/hooks/useCanvasState";
import { useSelectedElement } from "@/hooks/useSelectedElement";
import { Layer } from "@/types/layer";
import { CanvasElement } from "@/types/canvasElement";
import { toast } from "@/components/ui/use-toast";
import LayersHeader from "./layers/LayersHeader";
import LayersList from "./layers/LayersList";
import EmptyLayersState from "./layers/EmptyLayersState";

const LayersPanel: React.FC = () => {
  const { 
    layers, 
    droppedElements, 
    addLayer, 
    deleteLayer, 
    updateLayer, 
    moveElementToLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    reorderLayer,
    duplicateLayer
  } = useCanvasState();
  
  const { selectedElement, selectElement } = useSelectedElement();
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({});
  
  // Toggle layer expansion
  const toggleLayerExpansion = (layerId: string) => {
    setExpandedLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };
  
  // Get elements belonging to a layer
  const getLayerElements = (layerId: string): CanvasElement[] => {
    return droppedElements.filter(el => el.layerId === layerId);
  };
  
  // Handle creating a new layer
  const handleAddLayer = () => {
    const newLayer = addLayer(`Layer ${layers.length + 1}`);
    toast({
      title: "Layer Created",
      description: `${newLayer.name} has been added`
    });
    
    // Auto-expand the new layer
    setExpandedLayers(prev => ({
      ...prev,
      [newLayer.id]: true
    }));
  };
  
  // Handle selecting an element
  const handleElementSelect = (element: CanvasElement) => {
    selectElement(element);
  };
  
  // Handle selecting a layer
  const handleLayerSelect = (layer: Layer) => {
    // Select the first element in the layer or just focus on the layer
    const layerElements = getLayerElements(layer.id);
    if (layerElements.length > 0) {
      selectElement(layerElements[0]);
    } else {
      // Just visually highlight the layer
      toast({
        title: "Layer Selected",
        description: `${layer.name} is now active`
      });
    }
  };
  
  // Rename layer
  const handleRenameLayer = (layer: Layer) => {
    const newName = prompt("Enter new layer name:", layer.name);
    if (newName && newName.trim() !== "") {
      updateLayer(layer.id, { name: newName.trim() });
      toast({
        title: "Layer Renamed",
        description: `Layer has been renamed to ${newName}`
      });
    }
  };
  
  // Move element to a different layer
  const handleMoveToLayer = (element: CanvasElement, targetLayerId: string) => {
    moveElementToLayer(element.id, targetLayerId);
    toast({
      title: "Element Moved",
      description: "Element has been moved to a different layer"
    });
  };

  if (layers.length === 0) {
    return <EmptyLayersState handleAddLayer={handleAddLayer} />;
  }

  return (
    <div className="p-3 h-full flex flex-col">
      <LayersHeader handleAddLayer={handleAddLayer} />
      
      <LayersList 
        layers={layers}
        droppedElements={droppedElements}
        selectedElement={selectedElement}
        expandedLayers={expandedLayers}
        toggleLayerExpansion={toggleLayerExpansion}
        handleLayerSelect={handleLayerSelect}
        handleElementSelect={handleElementSelect}
        handleRenameLayer={handleRenameLayer}
        handleMoveToLayer={handleMoveToLayer}
        reorderLayer={reorderLayer}
        duplicateLayer={duplicateLayer}
        deleteLayer={deleteLayer}
        toggleLayerVisibility={toggleLayerVisibility}
        toggleLayerLock={toggleLayerLock}
        getLayerElements={getLayerElements}
      />
      
      <div className="mt-3 pt-3 border-t border-cv-lightgray/20 text-xs text-center text-cv-white/40">
        Layers help you organize your canvas elements
      </div>
    </div>
  );
};

export default LayersPanel;
