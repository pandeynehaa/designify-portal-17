
import { toast } from "@/components/ui/use-toast";
import { CanvasElement } from "../../types/canvasElement";
import { useCanvasHistory } from "../useCanvasHistory";

export const useElementOperations = (
  droppedElements: CanvasElement[],
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>,
  addToHistory: ReturnType<typeof useCanvasHistory>["addToHistory"]
) => {
  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    // Get the original element before update
    const originalElement = droppedElements.find(el => el.id === id);
    
    setDroppedElements(elements => 
      elements.map(element => 
        element.id === id ? { ...element, ...updates } : element
      )
    );
    
    // Add to history
    if (originalElement) {
      addToHistory({
        type: 'update',
        elements: [{ ...originalElement, ...updates }],
        previousElements: [originalElement]
      });
    }
    
    toast({
      title: "Element Updated",
      description: "Changes have been applied to the element"
    });
  };
  
  const deleteElement = (id: string) => {
    // Get the element before deletion
    const elementToDelete = droppedElements.find(el => el.id === id);
    
    if (elementToDelete) {
      // Dispatch custom event for animation and sound
      const deleteEvent = new CustomEvent('canvas-element-delete', { 
        detail: { id: elementToDelete.id } 
      });
      window.dispatchEvent(deleteEvent);
      
      // Add slight delay to allow animation to complete before actual deletion
      setTimeout(() => {
        setDroppedElements(elements => elements.filter(element => element.id !== id));
        
        // Add to history
        addToHistory({
          type: 'delete',
          elements: [],
          previousElements: [elementToDelete]
        });
        
        toast({
          title: "Element Deleted",
          description: "Element has been removed from the canvas"
        });
      }, 300); // Match duration with CSS transition
    }
  };

  const duplicateElement = (id: string) => {
    const elementToDuplicate = droppedElements.find(el => el.id === id);
    if (elementToDuplicate) {
      const newElement = {
        ...elementToDuplicate,
        id: `${elementToDuplicate.type}-${Date.now()}`,
        x: elementToDuplicate.x + 20,
        y: elementToDuplicate.y + 20
      };
      
      setDroppedElements([...droppedElements, newElement]);
      
      // Add to history
      addToHistory({
        type: 'duplicate',
        elements: [newElement],
        previousElements: [...droppedElements]
      });
      
      toast({
        title: "Element Duplicated",
        description: "A copy of the element has been created"
      });
      
      return newElement;
    }
    return null;
  };

  return {
    updateElement,
    deleteElement,
    duplicateElement
  };
};
