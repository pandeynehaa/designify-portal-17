
import React, { useState, useRef, useEffect } from "react";
import { CanvasElement } from "../../../types/canvasElement";
import ElementControls from "./ElementControls";
import ResizeHandles from "./ResizeHandles";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { toast } from "@/components/ui/use-toast";
import { Move, TextCursor } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ComponentElementProps {
  element: CanvasElement;
  activeTool: string;
}

const ComponentElement: React.FC<ComponentElementProps> = ({ element, activeTool }) => {
  const { selectedElement, selectElement } = useSelectedElement();
  const isSelected = selectedElement?.id === element.id;
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: element.x, y: element.y });
  const elementRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(element.content || "");
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  
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
      if (isDragging.current && activeTool === 'move') {
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
      if (isDragging.current && activeTool === 'move') {
        isDragging.current = false;
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
  }, [activeTool, element.id, position]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Select the element
    selectElement(element);
    
    // If we're in move mode, start dragging
    if (activeTool === 'move') {
      isDragging.current = true;
      document.body.style.cursor = 'move';
      
      // Calculate the offset from the mouse to the element corner
      const rect = elementRef.current?.getBoundingClientRect();
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
    e.stopPropagation();
    
    // Only enable editing for text components
    if (element.type === 'component') {
      setIsEditing(true);
      selectElement(element);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
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
  
  const style = {
    position: 'absolute' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: activeTool === 'move' ? 'move' : 'pointer',
    transition: isDragging.current ? 'none' : 'box-shadow 0.2s ease',
    minWidth: '100px', // Ensure a minimum size for text elements
    minHeight: '30px'
  };
  
  return (
    <div 
      ref={elementRef}
      key={element.id} 
      style={style} 
      className={`p-2 bg-white border rounded shadow-sm ${
        activeTool === 'move' ? 'hover:shadow-md' : ''
      } ${isSelected ? 'canvas-element selected ring-2 ring-cv-accent' : 'canvas-element'}`}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        editedText && editedText.length > 50 ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editedText}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleTextKeyDown}
            className="w-full h-full min-h-[80px] p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={editedText}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleTextKeyDown}
            className="w-full h-full p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
        )
      ) : (
        element.content
      )}
      
      {isSelected && activeTool === 'move' && (
        <div className="absolute -top-5 -left-5 bg-cv-accent text-white p-1 rounded-full shadow-sm">
          <Move size={14} />
        </div>
      )}

      {isSelected && !isEditing && (
        <div className="absolute -top-5 -right-5 bg-cv-accent text-white p-1 rounded-full shadow-sm cursor-pointer"
             onClick={() => setIsEditing(true)}>
          <TextCursor size={14} />
        </div>
      )}
      
      {isSelected && !isEditing && (
        <>
          <ElementControls element={element} />
          <ResizeHandles />
        </>
      )}
    </div>
  );
};

export default ComponentElement;
