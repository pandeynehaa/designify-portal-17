
import { useState, useRef, useEffect } from "react";
import { CanvasElement } from "../types/canvasElement";
import { toast } from "@/components/ui/use-toast";
import { useSelectedElement } from "./useSelectedElement";
import { ComponentElementProps, ComponentElementReturn } from "../types/componentTypes";

// Add a declaration for the snapToGrid property
declare global {
  interface Window {
    snapToGrid?: boolean;
    updateCanvasElement?: (id: string, updates: Partial<CanvasElement>) => void;
  }
}

export const useComponentElement = ({ 
  element, 
  activeTool, 
  editMode 
}: ComponentElementProps): ComponentElementReturn => {
  const { selectedElement, selectElement } = useSelectedElement();
  const isSelected = selectedElement?.id === element.id;
  const isDragging = useRef(false);
  const [isDraggingState, setIsDraggingState] = useState(false); // For UI updates
  const dragOffset = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: element.x, y: element.y });
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(element.content || "");
  
  // Grid snap size in pixels
  const gridSize = 20;
  
  useEffect(() => {
    // Update position when element props change
    setPosition({ x: element.x, y: element.y });
  }, [element.x, element.y]);

  useEffect(() => {
    // Update edited text when element content changes
    setEditedText(element.content || "");
  }, [element.content]);
  
  useEffect(() => {
    // Add mouse event listeners for dragging
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current && (activeTool === 'move' || isDraggingState) && editMode) {
        e.preventDefault();
        
        // Calculate new position
        let newX = e.clientX - dragOffset.current.x;
        let newY = e.clientY - dragOffset.current.y;
        
        // Snap to grid if grid is enabled
        if (window.snapToGrid) {
          newX = Math.round(newX / gridSize) * gridSize;
          newY = Math.round(newY / gridSize) * gridSize;
        }
        
        setPosition({ x: newX, y: newY });
      }
    };
    
    const handleMouseUp = () => {
      if (isDragging.current && (activeTool === 'move' || isDraggingState) && editMode) {
        isDragging.current = false;
        setIsDraggingState(false);
        document.body.style.cursor = 'default';
        
        // Update the actual element position in the canvas state
        if (typeof window.updateCanvasElement === 'function') {
          window.updateCanvasElement(element.id, { 
            x: position.x, 
            y: position.y,
            isNew: undefined // Remove the isNew flag after the first move
          });
        }
        
        toast({
          title: "Element Positioned",
          description: "Component has been placed at the new position"
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeTool, element.id, position, editMode, isDraggingState]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editMode) return; // Disable interactions in preview mode
    
    e.stopPropagation();
    
    // Select the element
    selectElement(element);
    
    // If we're in move mode or the move button was clicked, start dragging
    if (activeTool === 'move' || (e.currentTarget as HTMLElement).classList.contains('move-handle')) {
      isDragging.current = true;
      setIsDraggingState(true);
      document.body.style.cursor = 'move';
      
      // Calculate the offset from the mouse to the element corner
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect) {
        dragOffset.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
      
      toast({
        title: "Moving Component",
        description: "Drag to position, then release to place"
      });
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!editMode) return; // Disable text editing in preview mode
    
    e.stopPropagation();
    
    // Only enable editing for text components
    if (element.type === 'component') {
      setIsEditing(true);
      selectElement(element);
      
      // Show hint toast
      toast({
        title: "Editing Text",
        description: "Type to edit content, press Enter to save"
      });
    }
  };

  const handleTextBlur = () => {
    setIsEditing(false);
    
    // Only update if the text has changed
    if (editedText !== element.content) {
      // Update the actual element content in the canvas state
      if (typeof (window as any).updateCanvasElement === 'function') {
        (window as any).updateCanvasElement(element.id, { 
          content: editedText
        });
      }
      
      toast({
        title: "Content Updated",
        description: "Component text has been updated"
      });
    }
  };

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextBlur();
    }
  };

  return {
    isSelected,
    position,
    isEditing,
    editedText,
    setEditedText,
    handleMouseDown,
    handleDoubleClick,
    handleTextBlur,
    handleTextKeyDown,
    setIsEditing,
    isDragging: isDraggingState
  };
};
