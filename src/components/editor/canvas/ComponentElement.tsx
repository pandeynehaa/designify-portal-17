
import React, { useState } from "react";
import { CanvasElement } from "../../../types/canvasElement";
import ElementControls from "./ElementControls";
import ResizeHandles from "./ResizeHandles";

interface ComponentElementProps {
  element: CanvasElement;
  activeTool: string;
}

const ComponentElement: React.FC<ComponentElementProps> = ({ element, activeTool }) => {
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
      key={element.id} 
      style={style} 
      className={`p-2 bg-white border rounded shadow-sm transition-all duration-150 ${isSelected ? 'canvas-element selected' : 'canvas-element'}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {element.content}
      
      {(isSelected || isHovered) && (
        <ElementControls />
      )}
      
      {isSelected && (
        <ResizeHandles />
      )}
    </div>
  );
};

export default ComponentElement;
