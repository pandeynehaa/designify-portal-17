
import React from "react";
import { CanvasElement } from "../../types/canvasElement";
import ComponentElement from "./canvas/ComponentElement";
import ImageElement from "./canvas/ImageElement";
import NFTElement from "./canvas/NFTElement";
import { useSelectedElement } from "../../hooks/useSelectedElement";

interface CanvasElementsProps {
  droppedElements: CanvasElement[];
  activeTool: string;
  editMode?: boolean;
}

const CanvasElements: React.FC<CanvasElementsProps> = ({ 
  droppedElements, 
  activeTool,
  editMode = true // Default to edit mode
}) => {
  const { selectElement } = useSelectedElement();
  
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only clear selection if clicking directly on the canvas (not on an element)
    if (e.target === e.currentTarget) {
      selectElement(null);
    }
  };

  const renderElement = (element: CanvasElement) => {
    // Skip rendering if element is explicitly set to not visible
    if (element.visible === false) {
      return null;
    }

    // Skip template-component elements as they're handled by the template components directly
    if (element.type === 'template-component') {
      return null;
    }

    switch (element.type) {
      case 'component':
        return <ComponentElement key={element.id} element={element} activeTool={activeTool} editMode={editMode} />;
      case 'image':
        return <ImageElement key={element.id} element={element} activeTool={activeTool} />;
      case 'nft':
        return <NFTElement key={element.id} element={element} activeTool={activeTool} editMode={editMode} />;
      default:
        return null;
    }
  };

  // Sort elements by z-index if available
  const sortedElements = [...droppedElements].sort((a, b) => {
    const aZIndex = a.zIndex ?? 0;
    const bZIndex = b.zIndex ?? 0;
    return aZIndex - bZIndex;
  });

  return (
    <div 
      className="absolute inset-0" 
      onClick={handleCanvasClick}
    >
      {sortedElements.map(renderElement)}
    </div>
  );
};

export default CanvasElements;
