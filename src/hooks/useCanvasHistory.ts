
import { useRef } from "react";
import { CanvasElement } from "../types/canvasElement";
import { toast } from "@/components/ui/use-toast";

// History action types
export type HistoryAction = {
  type: 'add' | 'update' | 'delete' | 'duplicate' | 'batch';
  elements: CanvasElement[];
  previousElements?: CanvasElement[];
};

export const useCanvasHistory = () => {
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

  // Undo the last action
  const undoAction = (
    droppedElements: CanvasElement[], 
    setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>
  ) => {
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
  const redoAction = (
    droppedElements: CanvasElement[], 
    setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>
  ) => {
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
    addToHistory,
    undoAction,
    redoAction
  };
};
