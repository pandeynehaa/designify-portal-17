
import React from "react";
import { CanvasElement } from "../../../types/canvasElement";
import ElementControls from "./ElementControls";
import ResizeHandles from "./ResizeHandles";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { toast } from "@/components/ui/use-toast";

interface ComponentElementProps {
  element: CanvasElement;
  activeTool: string;
}

const ComponentElement: React.FC<ComponentElementProps> = ({ element, activeTool }) => {
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
      title: "Element Selected",
      description: `Editing ${element.content} component`
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
      key={element.id} 
      style={style} 
      className={`p-2 bg-white border rounded shadow-sm transition-all duration-150 ${isSelected ? 'canvas-element selected ring-2 ring-cv-accent' : 'canvas-element'}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {element.content}
      
      {isSelected && (
        <>
          <ElementControls element={element} />
          <ResizeHandles />
        </>
      )}
    </div>
  );
};

export default ComponentElement;
