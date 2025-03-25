
import { useState } from "react";

export const useCanvasZoom = (initialZoom: number = 1) => {
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
