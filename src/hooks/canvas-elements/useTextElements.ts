
import { toast } from "@/components/ui/use-toast";
import { CanvasElement } from "../../types/canvasElement";
import { useCanvasHistory } from "../useCanvasHistory";
import { HistoryAction } from "../../types/hookTypes";

export const useTextElements = (
  droppedElements: CanvasElement[],
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>,
  addToHistory: (action: HistoryAction) => void
) => {
  const handleInsertText = (layerId: string = "default-layer") => {
    const newId = `text-${Date.now()}`;
    const newElement = {
      type: 'component',
      id: newId,
      x: 100,
      y: 100,
      content: 'Double-click to edit this text',
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
      title: "Text Added",
      description: "New text element has been added to the canvas. Double-click to edit."
    });
    
    return newElement;
  };

  return {
    handleInsertText
  };
};
