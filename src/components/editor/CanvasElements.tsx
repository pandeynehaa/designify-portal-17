
import React, { useState, useRef, useEffect } from "react";
import { CanvasElement } from "../../types/canvasElement";
import ComponentElement from "./canvas/ComponentElement";
import ImageElement from "./canvas/ImageElement";
import NFTElement from "./canvas/NFTElement";
import StickerElement from "./canvas/StickerElement";
import ImagePlaceholder from "./canvas/ImagePlaceholder";
import { useSelectedElement } from "../../hooks/useSelectedElement";
import { useCanvasState } from "@/hooks/useCanvasState";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "@/components/ui/use-toast";

interface CanvasElementsProps {
  droppedElements: CanvasElement[];
  activeTool: string;
  editMode?: boolean;
}

const CanvasElements: React.FC<CanvasElementsProps> = ({ 
  droppedElements, 
  activeTool,
  editMode = true // Default to edit mode
}) => {
  const { selectElement, selectedElement } = useSelectedElement();
  const { layers, deleteElement } = useCanvasState();
  const newElementRef = useRef<string | null>(null);
  
  // Find newly added element and scroll to it
  useEffect(() => {
    const newElement = droppedElements.find(el => el.isNew);
    
    if (newElement && newElement.id !== newElementRef.current) {
      newElementRef.current = newElement.id;
      
      // Select the new element
      selectElement(newElement);
      
      // Find the element and scroll to it
      setTimeout(() => {
        const element = document.getElementById(newElement.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [droppedElements, selectElement]);
  
  // Listen for element movement event
  useEffect(() => {
    const handleElementMove = (e: CustomEvent) => {
      const { id } = e.detail;
      const element = droppedElements.find(el => el.id === id);
      if (element) {
        selectElement(element);
      }
    };
    
    window.addEventListener('canvas-element-move' as any, handleElementMove as any);
    
    return () => {
      window.removeEventListener('canvas-element-move' as any, handleElementMove as any);
    };
  }, [droppedElements, selectElement]);
  
  // Add keyboard shortcut for deletion
  useHotkeys('delete', () => {
    if (selectedElement) {
      deleteElement(selectedElement.id);
      selectElement(null);
      
      toast({
        title: "Element Deleted",
        description: "The selected element has been removed"
      });
    }
  }, [selectedElement, deleteElement, selectElement]);
  
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only clear selection if clicking directly on the canvas (not on an element)
    if (e.target === e.currentTarget) {
      selectElement(null);
    }
  };

  const renderElement = (element: CanvasElement) => {
    // Skip rendering if element is explicitly set to not visible
    if (element.visible === false) {
      return null;
    }

    // Skip rendering if the element's layer is not visible
    const elementLayer = layers.find(layer => layer.id === element.layerId);
    if (elementLayer && !elementLayer.visible) {
      return null;
    }

    // Skip template-component elements as they're handled by the template components directly
    if (element.type === 'template-component') {
      return null;
    }

    switch (element.type) {
      case 'component':
        return (
          <ComponentElement 
            key={element.id} 
            element={{...element, id: element.id}} 
            activeTool={activeTool} 
            editMode={editMode} 
          />
        );
      case 'image':
        return <ImageElement key={element.id} element={element} activeTool={activeTool} />;
      case 'nft':
        return <NFTElement key={element.id} element={element} activeTool={activeTool} editMode={editMode} />;
      case 'sticker':
        return <StickerElement key={element.id} element={element} activeTool={activeTool} />;
      case 'placeholder':
        return <ImagePlaceholder key={element.id} element={element} activeTool={activeTool} />;
      default:
        return null;
    }
  };

  // Sort elements by z-index if available, then by layer z-index
  const sortedElements = [...droppedElements].sort((a, b) => {
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

  return (
    <div 
      className="absolute inset-0" 
      onClick={handleCanvasClick}
    >
      {sortedElements.map(renderElement)}
    </div>
  );
};

export default CanvasElements;
