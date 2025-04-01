
import { useEffect, useRef } from "react";
import { CanvasElement } from "../types/canvasElement";
import { useSelectedElement } from "./useSelectedElement";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "@/components/ui/use-toast";

export const useCanvasElementsEvents = (
  droppedElements: CanvasElement[],
  deleteElement: (id: string) => void
) => {
  const { selectElement, selectedElement } = useSelectedElement();
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

  return {
    handleCanvasClick
  };
};
