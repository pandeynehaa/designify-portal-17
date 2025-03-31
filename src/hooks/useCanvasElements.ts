
import { toast } from "@/components/ui/use-toast";
import { CanvasElement } from "../types/canvasElement";
import { useCanvasHistory } from "./useCanvasHistory";

export const useCanvasElements = (
  droppedElements: CanvasElement[],
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>
) => {
  const { addToHistory } = useCanvasHistory();

  const handleInsertText = () => {
    const newId = `text-${Date.now()}`;
    const newElement = {
      type: 'component',
      id: newId,
      x: 100,
      y: 100,
      content: 'Double-click to edit this text'
    };
    
    setDroppedElements(prev => [...prev, newElement]);
    
    // Add to history
    addToHistory({
      type: 'add',
      elements: [newElement],
      previousElements: [...droppedElements]
    });
    
    toast({
      title: "Text Added",
      description: "New text element has been added to the canvas. Double-click to edit."
    });
  };

  const handleInsertImage = () => {
    const newId = `image-${Date.now()}`;
    const newElement = {
      type: 'image',
      id: newId,
      x: 150,
      y: 150,
      content: 'https://via.placeholder.com/150'
    };
    
    setDroppedElements(prev => [...prev, newElement]);
    
    // Add to history
    addToHistory({
      type: 'add',
      elements: [newElement],
      previousElements: [...droppedElements]
    });
    
    toast({
      title: "Image Added",
      description: "New image element has been added to the canvas"
    });
  };

  const handleInsertComponent = () => {
    const newId = `component-${Date.now()}`;
    const newElement = {
      type: 'component',
      id: newId,
      x: 200,
      y: 200,
      content: 'Button'
    };
    
    setDroppedElements(prev => [...prev, newElement]);
    
    // Add to history
    addToHistory({
      type: 'add',
      elements: [newElement],
      previousElements: [...droppedElements]
    });
    
    toast({
      title: "Component Added",
      description: "New component has been added to the canvas"
    });
  };
  
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
    }
  };

  return {
    handleInsertText,
    handleInsertImage,
    handleInsertComponent,
    updateElement,
    deleteElement,
    duplicateElement
  };
};
