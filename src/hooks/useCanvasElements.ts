
import { CanvasElement } from "../types/canvasElement";
import { useCanvasHistory } from "./useCanvasHistory";
import { useTextElements } from "./canvas-elements/useTextElements";
import { useImageElements } from "./canvas-elements/useImageElements";
import { useComponentElements } from "./canvas-elements/useComponentElements";
import { useElementOperations } from "./canvas-elements/useElementOperations";
import { CanvasElementsReturn } from "../types/hookTypes";

export const useCanvasElements = (
  droppedElements: CanvasElement[],
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>
): CanvasElementsReturn => {
  const { addToHistory } = useCanvasHistory();

  // Use specialized hooks for different element types
  const { handleInsertText } = useTextElements(droppedElements, setDroppedElements, addToHistory);
  const { handleInsertImage, handleInsertImagePlaceholder } = useImageElements(droppedElements, setDroppedElements, addToHistory);
  const { handleInsertComponent } = useComponentElements(droppedElements, setDroppedElements, addToHistory);
  const { updateElement, deleteElement, duplicateElement } = useElementOperations(droppedElements, setDroppedElements, addToHistory);

  return {
    handleInsertText,
    handleInsertImage,
    handleInsertComponent,
    handleInsertImagePlaceholder,
    updateElement,
    deleteElement,
    duplicateElement
  };
};
