
import React, { useState, useRef, useEffect } from "react";
import { CanvasElement } from "../../../types/canvasElement";
import ElementControls from "./ElementControls";
import ResizeHandles from "./ResizeHandles";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { toast } from "@/components/ui/use-toast";

interface ImageElementProps {
  element: CanvasElement;
  activeTool: string;
}

const ImageElement: React.FC<ImageElementProps> = ({ element, activeTool }) => {
  const { selectedElement, selectElement } = useSelectedElement();
  const isSelected = selectedElement?.id === element.id;
  const [isDeleting, setIsDeleting] = useState(false);
  const [imgError, setImgError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element for delete sound
    audioRef.current = new Audio("/sounds/swoosh.mp3");
    
    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Listen for delete events via a custom event
  useEffect(() => {
    const handleDeleteAnimation = (e: CustomEvent) => {
      if (e.detail.id === element.id) {
        // Play sound effect
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(err => console.log('Audio play error:', err));
        }
        
        // Trigger animation
        setIsDeleting(true);
        
        // After animation completes, actual deletion happens in useCanvasElements
      }
    };
    
    // Add event listener
    window.addEventListener('canvas-element-delete' as any, handleDeleteAnimation as any);
    
    return () => {
      window.removeEventListener('canvas-element-delete' as any, handleDeleteAnimation as any);
    };
  }, [element.id]);
  
  const style = {
    position: 'absolute' as const,
    left: `${element.x}px`,
    top: `${element.y}px`,
    cursor: activeTool === 'select' ? 'pointer' : 'move',
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element);
    
    toast({
      title: "Image Selected",
      description: "Edit image properties in the panel"
    });
  };
  
  const handleImageError = () => {
    setImgError(true);
    console.log(`Image failed to load: ${element.content}`);
  };
  
  const handleMouseEnter = () => {
    // Hovering logic can remain
  };
  
  const handleMouseLeave = () => {
    // Hovering logic can remain
  };

  // If element is being deleted, apply animation classes
  if (isDeleting) {
    return (
      <div
        style={style}
        className="relative transition-all duration-300 scale-0 opacity-0 rotate-12"
      >
        <img 
          src={imgError ? "/placeholder.svg" : element.content} 
          alt="Dropping image" 
          className="max-w-[300px] max-h-[300px] rounded shadow-sm"
          onError={handleImageError}
        />
      </div>
    );
  }

  return (
    <div
      style={style}
      className={`relative transition-all duration-150 ${isSelected ? 'canvas-element selected ring-2 ring-cv-accent' : 'canvas-element'}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={imgError ? "/placeholder.svg" : element.content} 
        alt="Dropped image" 
        className="max-w-[300px] max-h-[300px] rounded shadow-sm"
        onError={handleImageError}
      />
      
      {isSelected && (
        <>
          <ElementControls element={element} />
          <ResizeHandles />
        </>
      )}
    </div>
  );
};

export default ImageElement;
