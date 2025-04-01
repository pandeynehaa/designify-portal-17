
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
import { useCanvasZoom } from "@/hooks/useCanvasZoom";

interface CanvasAreaProps {
  activeTemplate: string;
  zoom: number;
  templateStyles: TemplateStyles;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({ 
  activeTemplate, 
  zoom: initialZoom, 
  templateStyles 
}) => {
  const { deviceView, setDeviceView, activeTool, setActiveTool } = useDeviceState();
  const canvasRef = useRef<HTMLDivElement>(null);
  const { selectElement } = useSelectedElement();
  const { zoom, setZoom, handleZoomIn, handleZoomOut, handleZoomReset } = useCanvasZoom(initialZoom);
  
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
    handleInsertImagePlaceholder,
    updateElement,
    updateBackgroundProperties
  } = useCanvasState();
  
  useEffect(() => {
    setZoom(initialZoom);
  }, [initialZoom, setZoom]);

  useEffect(() => {
    if (canvasRef.current) {
      if (templateStyles.enable3D) {
        canvasRef.current.classList.add('vr-perspective');
      } else {
        canvasRef.current.classList.remove('vr-perspective');
      }
    }
  }, [templateStyles.enable3D]);
  
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      selectElement(null);
    }
  };
  
  useEffect(() => {
    (window as any).updateCanvasElement = updateElement;
  }, []);
  
  return (
    <div className="flex flex-col flex-1 h-full bg-cv-gray/30 backdrop-blur-md rounded-lg">
      <CanvasToolbar
        deviceView={deviceView}
        setDeviceView={setDeviceView}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        onInsertText={handleInsertText}
        onInsertImage={handleInsertImage}
        onInsertComponent={handleInsertComponent}
        onInsertImagePlaceholder={handleInsertImagePlaceholder}
      />
      
      <div className="flex-1 relative overflow-auto p-4 canvas-content">
        <CanvasEventHandlers
          canvasRef={canvasRef}
          zoomLevel={zoom * 100}
          setDroppedElements={setDroppedElements}
        >
          <div className="w-full h-full flex items-center justify-center vr-perspective">
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
          </div>
        </CanvasEventHandlers>
      </div>
      
      <div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-0 transition-opacity duration-300 bg-black/50 text-white text-xl font-medium"
        id="dropOverlay"
      >
        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl border border-white/20 shadow-2xl">
          Drop to add to canvas
        </div>
      </div>
      
      <CanvasTools 
        zoom={zoom} 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
        onReset={handleZoomReset}
        showGrid={showGrid}
        toggleGrid={toggleGrid}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
      />
    </div>
  );
};

export default CanvasArea;
