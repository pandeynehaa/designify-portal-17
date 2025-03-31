
import { DragEvent } from "react";
import { CanvasElement } from "../types/canvasElement";
import { useDropEventHandlers } from "./drag-drop/useDropEventHandlers";
import { useComponentDropHandlers } from "./drag-drop/useComponentDropHandlers";
import { useMediaDropHandlers } from "./drag-drop/useMediaDropHandlers";

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
  const { handleTemplateComponentDrop, handleComponentDrop } = useComponentDropHandlers({
    zoomLevel,
    setDroppedElements
  });
  
  const { handleImageDrop, handleNFTDrop, handleFileUpload } = useMediaDropHandlers({
    zoomLevel,
    setDroppedElements
  });
  
  // Process drop data and delegate to the appropriate handler
  const processDropData = (e: DragEvent<HTMLDivElement>, x: number, y: number) => {
    const componentData = e.dataTransfer.getData("application/component");
    const imageData = e.dataTransfer.getData("application/image");
    const nftData = e.dataTransfer.getData("application/nft");
    const templateData = e.dataTransfer.getData("application/template-component");
    
    if (templateData) {
      handleTemplateComponentDrop(templateData, x, y);
    } else if (componentData) {
      handleComponentDrop(componentData, x, y);
    } else if (imageData) {
      handleImageDrop(imageData, x, y);
    } else if (nftData) {
      handleNFTDrop(nftData, x, y);
    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files, x, y);
    }
  };
  
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
