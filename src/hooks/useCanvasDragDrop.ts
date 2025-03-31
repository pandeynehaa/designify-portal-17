
import { DragEvent } from "react";
import { CanvasElement } from "../types/canvasElement";
import { useDropEventHandlers } from "./drag-drop/useDropEventHandlers";
import { useComponentDropHandlers } from "./drag-drop/useComponentDropHandlers";
import { useMediaDropHandlers } from "./drag-drop/useMediaDropHandlers";
import { useProcessDropData } from "./drag-drop/useProcessDropData";

interface UseCanvasDragDropProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  zoomLevel: number;
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
}

export const useCanvasDragDrop = ({
  canvasRef,
  zoomLevel,
  setDroppedElements
}: UseCanvasDragDropProps) => {
  // Get specialized handlers
  const { handleTemplateComponentDrop, handleComponentDrop } = useComponentDropHandlers({
    zoomLevel,
    setDroppedElements
  });
  
  const { handleImageDrop, handleNFTDrop, handleStickerDrop, handleFileUpload } = useMediaDropHandlers({
    zoomLevel,
    setDroppedElements
  });
  
  // Use the process drop data hook
  const { processDropData } = useProcessDropData({
    handleTemplateComponentDrop,
    handleComponentDrop,
    handleImageDrop,
    handleNFTDrop,
    handleStickerDrop,
    handleFileUpload
  });
  
  // Use the generic drop event handlers, providing our specific drop processor
  const { isDraggingOver, handleDragOver, handleDragLeave, handleDrop } = useDropEventHandlers({
    canvasRef,
    onDrop: processDropData
  });

  return {
    isDraggingOver,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};
