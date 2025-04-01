
import React from "react";
import { CanvasElement } from "../../types/canvasElement";
import { useSelectedElement } from "../../hooks/useSelectedElement";
import { useCanvasState } from "@/hooks/useCanvasState";
import { useCanvasElementsEvents } from "@/hooks/useCanvasElementsEvents";
import { getSortedElements } from "@/utils/canvasElementsUtils";
import CanvasElementRenderer from "./canvas/CanvasElementRenderer";

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
  const { layers, deleteElement } = useCanvasState();
  const { handleCanvasClick } = useCanvasElementsEvents(droppedElements, deleteElement);
  
  // Sort elements by z-index if available, then by layer z-index
  const sortedElements = getSortedElements(droppedElements, layers);

  return (
    <div 
      className="absolute inset-0" 
      onClick={handleCanvasClick}
    >
      {sortedElements.map((element) => (
        <CanvasElementRenderer 
          key={element.id}
          element={element}
          activeTool={activeTool}
          editMode={editMode}
        />
      ))}
    </div>
  );
};

export default CanvasElements;
