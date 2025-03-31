
import { useState } from "react";
import { CanvasElement } from "../types/canvasElement";
import { useCanvasUIState } from "./useCanvasUIState";
import { useCanvasHistory } from "./useCanvasHistory";
import { useCanvasElements } from "./useCanvasElements";
import { useCanvasEffects } from "./useCanvasEffects";
import { useLayerManagement } from "./canvas-layers/useLayerManagement";
import { CanvasStateReturn } from "../types/hookTypes";

export const useCanvasState = (): CanvasStateReturn => {
  const [droppedElements, setDroppedElements] = useState<CanvasElement[]>([]);
  
  // Use our hooks for different concerns
  const { 
    showGrid, 
    toggleGrid, 
    editMode, 
    toggleEditMode,
    showLeftSidebar,
    showRightSidebar,
    setShowLeftSidebar,
    setShowRightSidebar,
    toggleLeftSidebar,
    toggleRightSidebar
  } = useCanvasUIState();
  
  const { addToHistory, undoAction, redoAction } = useCanvasHistory();
  
  const {
    handleInsertText,
    handleInsertImage,
    handleInsertComponent,
    handleInsertImagePlaceholder,
    updateElement,
    deleteElement,
    duplicateElement
  } = useCanvasElements(droppedElements, setDroppedElements);
  
  const {
    updateNFTEffects,
    updateBackgroundProperties
  } = useCanvasEffects(droppedElements, setDroppedElements);
  
  const {
    layers,
    addLayer,
    deleteLayer,
    updateLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    duplicateLayer: duplicateLayerFn,
    reorderLayer,
    assignElementToLayer,
    moveElementToLayer
  } = useLayerManagement(droppedElements, setDroppedElements);
  
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
    layers,
    showGrid,
    toggleGrid,
    editMode,
    toggleEditMode,
    showLeftSidebar,
    showRightSidebar,
    toggleLeftSidebar,
    toggleRightSidebar,
    handleInsertText,
    handleInsertImage,
    handleInsertComponent,
    handleInsertImagePlaceholder,
    updateElement,
    deleteElement,
    duplicateElement,
    updateNFTEffects,
    updateBackgroundProperties,
    undoAction: performUndoAction,
    redoAction: performRedoAction,
    // Layer functions
    addLayer,
    deleteLayer,
    updateLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    duplicateLayer: duplicateLayerFn,
    reorderLayer,
    assignElementToLayer,
    moveElementToLayer
  };
};
