
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export const useCanvasDrop = () => {
  const [dropOverlayVisible, setDropOverlayVisible] = useState(false);
  
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setDropOverlayVisible(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setDropOverlayVisible(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setDropOverlayVisible(false);
    };

    const canvas = document.getElementById('canvas-area');
    if (canvas) {
      canvas.addEventListener('dragover', handleDragOver);
      canvas.addEventListener('dragleave', handleDragLeave);
      canvas.addEventListener('drop', handleDrop);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('dragover', handleDragOver);
        canvas.removeEventListener('dragleave', handleDragLeave);
        canvas.removeEventListener('drop', handleDrop);
      }
    };
  }, []);

  const handleFileDrop = () => {
    toast({
      title: "File Upload",
      description: "You can upload files by dragging them directly onto the canvas."
    });
  };

  return {
    dropOverlayVisible,
    setDropOverlayVisible,
    handleFileDrop
  };
};
