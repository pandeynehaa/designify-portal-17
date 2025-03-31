
import React, { useState, useRef, useEffect } from "react";
import { useDeviceState } from "../../hooks/useDeviceState";
import { useSelectedElement } from "../../hooks/useSelectedElement";
import { useCanvasState } from "../../hooks/useCanvasState";
import CanvasToolbar from "./canvas/CanvasToolbar";
import CanvasEventHandlers from "./canvas/CanvasEventHandlers";
import CanvasView from "./canvas/CanvasView";
import CanvasTools from "./CanvasTools";
import { TemplateStyles } from "../../types/templateStyles";
import { toast } from "@/components/ui/use-toast";

interface CanvasAreaProps {
  activeTemplate: string;
  zoom: number;
  templateStyles: TemplateStyles;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({ 
  activeTemplate, 
  zoom, 
  templateStyles 
}) => {
  const { deviceView, setDeviceView, activeTool, setActiveTool } = useDeviceState();
  const [zoomLevel, setZoomLevel] = useState(zoom * 100);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { selectElement } = useSelectedElement();
  
  const {
    droppedElements,
    setDroppedElements,
    showGrid,
    toggleGrid,
    editMode,
    toggleEditMode,
    handleInsertText,
    handleInsertImage,
    handleInsertComponent,
    updateElement
  } = useCanvasState();
  
  // Update zoom level when zoom prop changes
  useEffect(() => {
    setZoomLevel(zoom * 100);
  }, [zoom]);
  
  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 10);
    }
  };
  
  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel(zoomLevel - 10);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only clear selection if clicking directly on the canvas (not on an element)
    if (e.target === e.currentTarget) {
      selectElement(null);
    }
  };
  
  // Expose updateElement function to window for PropertyPanel
  useEffect(() => {
    (window as any).updateCanvasElement = updateElement;
  }, []);
  
  return (
    <div className="flex flex-col flex-1 h-full">
      <CanvasToolbar
        deviceView={deviceView}
        setDeviceView={setDeviceView}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        zoomLevel={zoomLevel}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        showGrid={showGrid}
        toggleGrid={toggleGrid}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
        onInsertText={handleInsertText}
        onInsertImage={handleInsertImage}
        onInsertComponent={handleInsertComponent}
      />
      
      <CanvasEventHandlers
        canvasRef={canvasRef}
        zoomLevel={zoomLevel}
        setDroppedElements={setDroppedElements}
      >
        <CanvasView
          canvasRef={canvasRef}
          deviceView={deviceView}
          zoom={zoom}
          showGrid={showGrid}
          droppedElements={droppedElements}
          activeTool={activeTool}
          editMode={editMode}
          activeTemplate={activeTemplate}
          templateStyles={templateStyles}
          handleCanvasClick={handleCanvasClick}
        />
      </CanvasEventHandlers>
      
      <div 
        className={`absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-0 transition-opacity duration-300 bg-black/50 text-white text-xl font-medium`} 
        id="dropOverlay"
      >
        Drop to add to canvas
      </div>
      
      <CanvasTools 
        zoom={zoom} 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
        onReset={() => setZoomLevel(100)} 
      />
    </div>
  );
};

export default CanvasArea;
