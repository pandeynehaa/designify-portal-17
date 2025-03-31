
import React, { useState } from "react";
import { Pencil, Trash2, Copy, Move } from "lucide-react";
import { CanvasElement } from "../../../types/canvasElement";
import ElementControls from "./ElementControls";
import ResizeHandles from "./ResizeHandles";

interface ImageElementProps {
  element: CanvasElement;
  activeTool: string;
}

const ImageElement: React.FC<ImageElementProps> = ({ element, activeTool }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const style = {
    position: 'absolute' as const,
    left: `${element.x}px`,
    top: `${element.y}px`,
    cursor: activeTool === 'select' ? 'pointer' : 'move',
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={style}
      className={`relative transition-all duration-150 ${isSelected ? 'canvas-element selected' : 'canvas-element'}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={element.content} 
        alt="Dropped image" 
        className="max-w-[300px] max-h-[300px] rounded shadow-sm"
      />
      
      {(isSelected || isHovered) && (
        <ElementControls />
      )}
      
      {isSelected && (
        <ResizeHandles />
      )}
    </div>
  );
};

export default ImageElement;
