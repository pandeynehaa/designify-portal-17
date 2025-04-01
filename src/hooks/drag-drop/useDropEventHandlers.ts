
import { useState, DragEvent } from "react";
import { CanvasDragDropReturn } from "../../types/canvasDragDropTypes";

interface UseDropEventHandlersProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  onDrop: (e: DragEvent<HTMLDivElement>, x: number, y: number) => void;
}

export const useDropEventHandlers = ({
  canvasRef,
  onDrop
}: UseDropEventHandlersProps): CanvasDragDropReturn => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (canvasRef.current) {
      canvasRef.current.classList.add("drag-over");
    }
    
    // Show visual feedback for dropping area
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.zIndex = '50';
      
      // Add wiggle animation class
      overlay.classList.add('wiggle-animation');
    }
    
    setIsDraggingOver(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (canvasRef.current) {
      canvasRef.current.classList.remove("drag-over");
    }
    
    // Hide visual feedback
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.zIndex = '0';
      
      // Remove wiggle animation
      overlay.classList.remove('wiggle-animation');
    }
    
    setIsDraggingOver(false);
  };

  const handleDropEvent = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (canvasRef.current) {
      canvasRef.current.classList.remove("drag-over");
    }
    
    // Hide drop overlay
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.zIndex = '0';
      overlay.classList.remove('wiggle-animation');
    }
    
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    
    // Calculate the drop position considering scroll
    const scrollTop = canvasRef.current.parentElement?.scrollTop || 0;
    const scrollLeft = canvasRef.current.parentElement?.scrollLeft || 0;
    
    const x = e.clientX - canvasRect.left + scrollLeft;
    const y = e.clientY - canvasRect.top + scrollTop;
    
    // Call the provided drop handler with coordinates
    onDrop(e, x, y);
    
    setIsDraggingOver(false);
  };

  return {
    isDraggingOver,
    handleDragOver,
    handleDragLeave,
    handleDrop: handleDropEvent
  };
};
