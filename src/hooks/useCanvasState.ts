
import { useState } from "react";
import { CanvasElement } from "../types/canvasElement";
import { useCanvasHistory } from "./useCanvasHistory";
import { useCanvasElements } from "./useCanvasElements";
import { useCanvasEffects } from "./useCanvasEffects";
import { useCanvasUIState } from "./useCanvasUIState";

export const useCanvasState = () => {
  const [droppedElements, setDroppedElements] = useState<CanvasElement[]>([]);
  
  // Use our new hooks for different concerns
  const { showGrid, toggleGrid, editMode, toggleEditMode } = useCanvasUIState();
  
  const { addToHistory, undoAction, redoAction } = useCanvasHistory();
  
  const {
    handleInsertText,
    handleInsertImage,
    handleInsertComponent,
    updateElement,
    deleteElement,
    duplicateElement
  } = useCanvasElements(droppedElements, setDroppedElements);
  
  const {
    updateNFTEffects,
    updateBackgroundProperties
  } = useCanvasEffects(droppedElements, setDroppedElements);
  
  // Wrapper functions for undo/redo to provide the current state
  const performUndoAction = () => {
    undoAction(droppedElements, setDroppedElements);
  };
  
  const performRedoAction = () => {
    redoAction(droppedElements, setDroppedElements);
  };
  
  return {
    droppedElements,
    setDroppedElements,
    showGrid,
    toggleGrid,
    editMode,
    toggleEditMode,
    handleInsertText,
    handleInsertImage,
    handleInsertComponent,
    updateElement,
    deleteElement,
    duplicateElement,
    updateNFTEffects,
    updateBackgroundProperties,
    undoAction: performUndoAction,
    redoAction: performRedoAction
  };
};
