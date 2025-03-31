
import React, { useState } from "react";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { CanvasElement } from "../../../types/canvasElement";
import { useCanvasState } from "../../../hooks/useCanvasState";
import { toast } from "@/components/ui/use-toast";
import LayerGroupItem from "./layers/LayerGroupItem";
import EmptyLayersTip from "./layers/EmptyLayersTip";
import LayersCount from "./layers/LayersCount";
import LayersHeader from "./layers/LayersHeader";

const LayersTab: React.FC = () => {
  const { droppedElements, updateElement, deleteElement, duplicateElement, addLayer } = useCanvasState();
  const { selectedElement, selectElement } = useSelectedElement();
  
  // State to track which element type groups are expanded
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
    components: true,
    images: true,
    nft: true
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const handleAddLayer = () => {
    addLayer(`Layer ${Date.now().toString().slice(-4)}`);
    toast({
      title: "Layer Added",
      description: "New layer has been created"
    });
  };

  const handleLayerClick = (element: CanvasElement) => {
    selectElement(element);
    toast({
      title: "Layer Selected",
      description: `Selected ${element.type} layer`
    });
  };

  const toggleVisibility = (e: React.MouseEvent, element: CanvasElement) => {
    e.stopPropagation();
    
    // Update the visibility of the element
    updateElement(element.id, { 
      visible: element.visible === false ? true : false 
    });
    
    toast({
      title: element.visible === false ? "Layer Shown" : "Layer Hidden",
      description: `${element.type} layer is now ${element.visible === false ? "visible" : "hidden"}`
    });
  };
  
  const handleDeleteLayer = (e: React.MouseEvent, element: CanvasElement) => {
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete this ${element.type}?`)) {
      deleteElement(element.id);
      
      // If the deleted element was selected, clear the selection
      if (selectedElement?.id === element.id) {
        selectElement(null);
      }
    }
  };
  
  const handleDuplicateLayer = (e: React.MouseEvent, element: CanvasElement) => {
    e.stopPropagation();
    duplicateElement(element.id);
  };
  
  const moveLayer = (element: CanvasElement, direction: 'up' | 'down') => {
    // Find current index of the element
    const currentIndex = droppedElements.findIndex(el => el.id === element.id);
    
    // Calculate new zIndex
    const currentZIndex = element.zIndex || 0;
    const newZIndex = direction === 'up' ? currentZIndex + 1 : currentZIndex - 1;
    
    // Update the element's zIndex
    updateElement(element.id, { zIndex: newZIndex });
    
    toast({
      title: "Layer Moved",
      description: `${element.type} layer moved ${direction}`
    });
  };

  // Group elements by type
  const groupedElements = {
    components: droppedElements.filter(el => el.type === 'component'),
    images: droppedElements.filter(el => el.type === 'image'),
    nft: droppedElements.filter(el => el.type === 'nft')
  };

  // Get display name for an element
  const getElementName = (element: CanvasElement): string => {
    if (element.type === 'nft' && element.nftData?.name) {
      return element.nftData.name;
    }
    
    if (element.content) {
      // For text content, limit to first 15 chars
      if (element.type === 'component') {
        return element.content.substring(0, 15) + (element.content.length > 15 ? "..." : "");
      }
      return element.content.split('/').pop() || element.id;
    }
    
    return `${element.type}-${element.id.split('-').pop()}`;
  };

  if (droppedElements.length === 0) {
    return <EmptyLayersTip />;
  }

  return (
    <div className="p-3 space-y-3 text-cv-white">
      <div className="flex items-center justify-between">
        <h3 className="text-sm uppercase font-medium text-cv-white/90 px-2">Layers</h3>
        <LayersCount count={droppedElements.length} />
      </div>

      <div className="bg-cv-gray/30 rounded-lg shadow-inner p-2 space-y-2">
        {Object.entries(groupedElements).map(([groupType, elements]) => (
          elements.length > 0 && (
            <LayerGroupItem
              key={groupType}
              groupType={groupType}
              elements={elements}
              expandedGroups={expandedGroups}
              toggleGroup={toggleGroup}
              selectedElement={selectedElement}
              handleLayerClick={handleLayerClick}
              toggleVisibility={toggleVisibility}
              moveLayer={moveLayer}
              handleDuplicateLayer={handleDuplicateLayer}
              handleDeleteLayer={handleDeleteLayer}
              getElementName={getElementName}
            />
          )
        ))}
      </div>
      
      <div className="p-2 text-xs text-center text-cv-white/50 italic">
        Tip: Click on a layer to select it, or use the buttons to make changes
      </div>
    </div>
  );
};

export default LayersTab;
