
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
    
    // Get the scroll container (Radix ScrollArea Viewport)
    const scrollContainer = canvasRef.current.closest('[data-radix-scroll-area-viewport]');
    
    // Calculate the drop position considering both horizontal and vertical scroll
    const scrollTop = scrollContainer?.scrollTop || 0;
    const scrollLeft = scrollContainer?.scrollLeft || 0;
    
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
