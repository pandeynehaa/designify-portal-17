
import { useState } from "react";
import { CanvasZoomReturn } from "../types/hookTypes";

export const useCanvasZoom = (initialZoom: number = 1): CanvasZoomReturn => {
  const [zoom, setZoom] = useState(initialZoom);
  
  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };
  
  return {
    zoom,
    setZoom,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset
  };
};
