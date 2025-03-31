
import { toast } from "@/components/ui/use-toast";
import { CanvasElement } from "../../types/canvasElement";
import { useCanvasHistory } from "../useCanvasHistory";
import { HistoryAction } from "../../types/hookTypes";

export const useImageElements = (
  droppedElements: CanvasElement[],
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>,
  addToHistory: (action: HistoryAction) => void
) => {
  const handleInsertImage = (layerId: string = "default-layer") => {
    const newId = `image-${Date.now()}`;
    const newElement = {
      type: 'image',
      id: newId,
      x: 150,
      y: 150,
      content: 'https://via.placeholder.com/150',
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
      title: "Image Added",
      description: "New image element has been added to the canvas"
    });
    
    return newElement;
  };

  const handleInsertImagePlaceholder = (layerId: string = "default-layer") => {
    const newId = `placeholder-${Date.now()}`;
    const newElement = {
      type: 'placeholder',
      id: newId,
      x: 150,
      y: 150,
      width: 300,
      height: 200,
      content: 'empty',
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
      title: "Image Placeholder Added",
      description: "Click or drag an image to the placeholder"
    });
    
    return newElement;
  };

  return {
    handleInsertImage,
    handleInsertImagePlaceholder
  };
};
