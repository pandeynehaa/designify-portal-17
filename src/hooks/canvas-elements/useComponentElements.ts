
import { toast } from "@/components/ui/use-toast";
import { CanvasElement } from "../../types/canvasElement";
import { useCanvasHistory } from "../useCanvasHistory";

export const useComponentElements = (
  droppedElements: CanvasElement[],
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>,
  addToHistory: ReturnType<typeof useCanvasHistory>["addToHistory"]
) => {
  const handleInsertComponent = (layerId: string = "default-layer") => {
    const newId = `component-${Date.now()}`;
    const newElement = {
      type: 'component',
      id: newId,
      x: 200,
      y: 200,
      content: 'Button',
      layerId
    };
    
    setDroppedElements(prev => [...prev, newElement]);
    
    // Add to history
    addToHistory({
      type: 'add',
      elements: [newElement],
      previousElements: [...droppedElements]
    });
    
    toast({
      title: "Component Added",
      description: "New component has been added to the canvas"
    });
    
    return newElement;
  };

  return {
    handleInsertComponent
  };
};
