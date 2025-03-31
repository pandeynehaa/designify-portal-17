import { useState, useRef } from "react";
import { CanvasElement } from "../types/canvasElement";
import { toast } from "@/components/ui/use-toast";

type HistoryAction = {
  type: 'add' | 'update' | 'delete' | 'duplicate' | 'batch';
  elements: CanvasElement[];
  previousElements?: CanvasElement[];
};

export const useCanvasState = () => {
  const [droppedElements, setDroppedElements] = useState<CanvasElement[]>([]);
  const [showGrid, setShowGrid] = useState(true);
  const [editMode, setEditMode] = useState(true);
  
  // History management
  const history = useRef<HistoryAction[]>([]);
  const currentHistoryIndex = useRef<number>(-1);
  
  const addToHistory = (action: HistoryAction) => {
    // If we're not at the end of the history, remove future actions
    if (currentHistoryIndex.current < history.current.length - 1) {
      history.current = history.current.slice(0, currentHistoryIndex.current + 1);
    }
    
    history.current.push(action);
    currentHistoryIndex.current = history.current.length - 1;
  };
  
  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
    toast({
      title: editMode ? "Preview Mode" : "Edit Mode",
      description: editMode 
        ? "Now viewing the design in preview mode. Elements cannot be edited." 
        : "Now editing the design. You can modify elements on the canvas."
    });
  };

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
    
    setDroppedElements(elements => elements.filter(element => element.id !== id));
    
    // Add to history
    if (elementToDelete) {
      addToHistory({
        type: 'delete',
        elements: [],
        previousElements: [elementToDelete]
      });
    }
    
    toast({
      title: "Element Deleted",
      description: "Element has been removed from the canvas"
    });
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
  
  // New functions for NFT elements
  const updateNFTEffects = (id: string, effects: { 
    blurAmount?: number; 
    glowColor?: string; 
    glowSpread?: number;
    rotation?: number;
  }) => {
    // Get the original element before update
    const originalElement = droppedElements.find(el => el.id === id);
    
    setDroppedElements(elements => 
      elements.map(element => {
        if (element.id === id && element.type === 'nft') {
          const updatedElement = { 
            ...element, 
            nftData: { 
              ...(element.nftData || {}), 
              ...effects 
            } 
          };
          return updatedElement;
        }
        return element;
      })
    );
    
    // Add to history for the NFT update
    if (originalElement && originalElement.type === 'nft') {
      const updatedElement = { 
        ...originalElement, 
        nftData: { 
          ...(originalElement.nftData || {}), 
          ...effects 
        } 
      };
      
      addToHistory({
        type: 'update',
        elements: [updatedElement],
        previousElements: [originalElement]
      });
    }
    
    toast({
      title: "NFT Effects Updated",
      description: "Visual effects have been applied to the NFT"
    });
  };
  
  // New function to update background properties
  const updateBackgroundProperties = (id: string, properties: {
    backgroundType?: 'color' | 'gradient' | 'image';
    backgroundValue?: string;
    blurAmount?: number;
    opacity?: number;
    enable3D?: boolean;
  }) => {
    // Get the original element before update
    const originalElement = droppedElements.find(el => el.id === id);
    
    setDroppedElements(elements => 
      elements.map(element => {
        if (element.id === id) {
          return { ...element, ...properties };
        }
        return element;
      })
    );
    
    // Add to history
    if (originalElement) {
      const updatedElement = { ...originalElement, ...properties };
      
      addToHistory({
        type: 'update',
        elements: [updatedElement],
        previousElements: [originalElement]
      });
    }
    
    toast({
      title: "Background Updated",
      description: "Background properties have been updated"
    });
  };
  
  // Undo the last action
  const undoAction = () => {
    if (currentHistoryIndex.current < 0) {
      toast({
        title: "Nothing to Undo",
        description: "No previous actions to undo"
      });
      return;
    }
    
    const action = history.current[currentHistoryIndex.current];
    
    switch (action.type) {
      case 'add':
        // Remove added elements
        setDroppedElements(prev => 
          prev.filter(el => !action.elements.some(added => added.id === el.id))
        );
        break;
        
      case 'update':
        // Restore previous state of elements
        if (action.previousElements) {
          setDroppedElements(prev => 
            prev.map(el => {
              const previousEl = action.previousElements?.find(prevEl => prevEl.id === el.id);
              return previousEl || el;
            })
          );
        }
        break;
        
      case 'delete':
        // Restore deleted elements
        if (action.previousElements) {
          setDroppedElements(prev => [...prev, ...action.previousElements]);
        }
        break;
        
      case 'duplicate':
        // Remove duplicated elements
        setDroppedElements(prev => 
          prev.filter(el => !action.elements.some(duplicated => duplicated.id === el.id))
        );
        break;
        
      case 'batch':
        // For batch operations, would need more complex restoration logic
        break;
    }
    
    currentHistoryIndex.current--;
    
    toast({
      title: "Action Undone",
      description: "Previous action has been reversed"
    });
  };
  
  // Redo the last undone action
  const redoAction = () => {
    if (currentHistoryIndex.current >= history.current.length - 1) {
      toast({
        title: "Nothing to Redo",
        description: "No actions to redo"
      });
      return;
    }
    
    currentHistoryIndex.current++;
    const action = history.current[currentHistoryIndex.current];
    
    switch (action.type) {
      case 'add':
        // Re-add elements
        setDroppedElements(prev => [...prev, ...action.elements]);
        break;
        
      case 'update':
        // Apply updates again
        setDroppedElements(prev => 
          prev.map(el => {
            const updatedEl = action.elements.find(updated => updated.id === el.id);
            return updatedEl || el;
          })
        );
        break;
        
      case 'delete':
        // Re-delete elements
        if (action.previousElements) {
          setDroppedElements(prev => 
            prev.filter(el => !action.previousElements?.some(prevEl => prevEl.id === el.id))
          );
        }
        break;
        
      case 'duplicate':
        // Re-add duplicated elements
        setDroppedElements(prev => [...prev, ...action.elements]);
        break;
        
      case 'batch':
        // For batch operations, would need more complex restoration logic
        break;
    }
    
    toast({
      title: "Action Redone",
      description: "Action has been reapplied"
    });
  };
  
  return {
    droppedElements,
    setDroppedElements,
    showGrid,
    toggleGrid,
    editMode,
    toggleEditMode,
    handleInsertText,
    handleInsertImage,
    handleInsertComponent,
    updateElement,
    deleteElement,
    duplicateElement,
    updateNFTEffects,
    updateBackgroundProperties, // Add the new function to the return object
    undoAction,
    redoAction
  };
};
