
import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

export const useCanvasZoom = (initialZoom: number = 1) => {
  const [zoom, setZoom] = useState<number>(initialZoom);
  
  const handleZoomIn = useCallback(() => {
    setZoom(prevZoom => {
      const newZoom = Math.min(prevZoom + 0.1, 2);
      return parseFloat(newZoom.toFixed(1));
    });
  }, []);
  
  const handleZoomOut = useCallback(() => {
    setZoom(prevZoom => {
      const newZoom = Math.max(prevZoom - 0.1, 0.1);
      return parseFloat(newZoom.toFixed(1));
    });
  }, []);
  
  const handleZoomReset = useCallback(() => {
    setZoom(1);
    toast({
      title: "Zoom Reset",
      description: "Canvas zoom has been reset to 100%"
    });
  }, []);

  return {
    zoom,
    setZoom,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset
  };
};
