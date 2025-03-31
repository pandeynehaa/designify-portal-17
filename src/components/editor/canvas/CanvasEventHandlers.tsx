
import React from "react";
import { useCanvasDragDrop } from "../../../hooks/useCanvasDragDrop";

interface CanvasEventHandlersProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  zoomLevel: number;
  setDroppedElements: React.Dispatch<React.SetStateAction<Array<{
    type: string;
    id: string;
    x: number;
    y: number;
    content?: string;
  }>>>;
  children: React.ReactNode;
}

const CanvasEventHandlers: React.FC<CanvasEventHandlersProps> = ({
  canvasRef,
  zoomLevel,
  setDroppedElements,
  children
}) => {
  const { handleDragOver, handleDragLeave, handleDrop } = useCanvasDragDrop({
    canvasRef,
    zoomLevel,
    setDroppedElements
  });

  return (
    <div 
      className="flex-1 flex items-center justify-center bg-[#111111] overflow-auto relative p-8"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default CanvasEventHandlers;
