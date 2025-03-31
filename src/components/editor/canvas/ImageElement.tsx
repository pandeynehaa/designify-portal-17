
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
    width: element.width || '150px',
    height: element.height || 'auto',
    cursor: activeTool === 'select' ? 'pointer' : 'move',
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element);
    toast({
      title: "Image Selected",
      description: "You can now edit the image properties"
    });
  };

  return (
    <div 
      style={style} 
      className={`transition-all duration-150 ${isSelected ? 'canvas-element selected ring-2 ring-cv-accent' : 'canvas-element'}`}
      onClick={handleClick}
    >
      <img 
        src={element.content} 
        alt="Canvas element" 
        className="w-full h-full object-cover" 
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
