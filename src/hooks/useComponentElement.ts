
import { useState, useRef, useEffect } from "react";
import { CanvasElement } from "../types/canvasElement";
import { toast } from "@/components/ui/use-toast";
import { useSelectedElement } from "./useSelectedElement";
import { ComponentElementProps, ComponentElementReturn } from "../types/hookTypes";

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
      if (isDragging.current && activeTool === 'move' && editMode) {
        e.preventDefault();
        
        // Calculate new position
        let newX = e.clientX - dragOffset.current.x;
        let newY = e.clientY - dragOffset.current.y;
        
        // Snap to grid
        newX = Math.round(newX / gridSize) * gridSize;
        newY = Math.round(newY / gridSize) * gridSize;
        
        setPosition({ x: newX, y: newY });
      }
    };
    
    const handleMouseUp = () => {
      if (isDragging.current && activeTool === 'move' && editMode) {
        isDragging.current = false;
        setIsDraggingState(false);
        document.body.style.cursor = 'default';
        
        // Update the actual element position in the canvas state
        if (typeof (window as any).updateCanvasElement === 'function') {
          (window as any).updateCanvasElement(element.id, { 
            x: position.x, 
            y: position.y 
          });
        }
        
        // Show toast notification
        toast({
          title: "Element Moved",
          description: `Element positioned at X: ${position.x}, Y: ${position.y}`
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeTool, element.id, position, editMode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editMode) return; // Disable interactions in preview mode
    
    e.stopPropagation();
    
    // Select the element
    selectElement(element);
    
    // If we're in move mode, start dragging
    if (activeTool === 'move') {
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
        title: "Moving Element",
        description: "Drag to move. Release to place."
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
        title: "Text Updated",
        description: "Text content has been updated"
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
