
import React, { useState } from "react";
import { CanvasElement } from "../../../types/canvasElement";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import ElementControls from "./ElementControls";
import ResizeHandles from "./ResizeHandles";
import { useCanvasState } from "@/hooks/useCanvasState";

interface StickerElementProps {
  element: CanvasElement;
  activeTool: string;
}

const StickerElement: React.FC<StickerElementProps> = ({ element, activeTool }) => {
  const { selectedElement, selectElement } = useSelectedElement();
  const { updateElement } = useCanvasState();
  const isSelected = selectedElement?.id === element.id;
  
  const [position, setPosition] = useState({ x: element.x, y: element.y });
  const [size, setSize] = useState({ 
    width: element.width || 100, 
    height: element.height || 100 
  });
  const [rotation, setRotation] = useState(element.rotation || 0);
  
  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element);
  };
  
  const handleResize = (width: number, height: number) => {
    setSize({ width, height });
    
    // Update the element in the canvas state
    updateElement(element.id, {
      width,
      height
    });
  };
  
  const handleMove = (x: number, y: number) => {
    setPosition({ x, y });
    
    // Update the element in the canvas state
    updateElement(element.id, {
      x,
      y
    });
  };
  
  const handleRotate = (angle: number) => {
    setRotation(angle);
    
    // Update the element in the canvas state
    updateElement(element.id, {
      rotation: angle
    });
  };

  return (
    <div
      className={`absolute ${isSelected ? 'z-10' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: isSelected ? 'move' : 'pointer',
      }}
      onClick={handleSelect}
    >
      <img
        src={element.content}
        alt="Sticker"
        className="w-full h-full object-contain"
        style={{
          pointerEvents: 'none',
        }}
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

export default StickerElement;
