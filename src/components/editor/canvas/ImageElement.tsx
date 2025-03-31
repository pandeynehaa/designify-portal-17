
import React from "react";
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
  
  const handleMouseEnter = () => {
    // Hovering logic can remain
  };
  
  const handleMouseLeave = () => {
    // Hovering logic can remain
  };

  return (
    <div
      style={style}
      className={`relative transition-all duration-150 ${isSelected ? 'canvas-element selected ring-2 ring-cv-accent' : 'canvas-element'}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={element.content} 
        alt="Dropped image" 
        className="max-w-[300px] max-h-[300px] rounded shadow-sm"
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
