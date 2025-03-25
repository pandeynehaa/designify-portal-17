
import React, { useState, useRef, DragEvent } from "react";
import { toast } from "../ui/use-toast";
import DeviceToolbar from "./DeviceToolbar";
import ZoomControls from "./ZoomControls";
import CanvasElements from "./CanvasElements";
import MarketplaceTemplate from "./templates/MarketplaceTemplate";
import DropsTemplate from "./templates/DropsTemplate";
import TokenGateTemplate from "./templates/TokenGateTemplate";
import BuyCoinTemplate from "./templates/BuyCoinTemplate";

interface CanvasAreaProps {
  activeTemplate: string;
  zoom: number;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({ activeTemplate, zoom }) => {
  const [deviceView, setDeviceView] = useState("desktop");
  const [zoomLevel, setZoomLevel] = useState(zoom * 100);
  const [activeTool, setActiveTool] = useState("select");
  const canvasRef = useRef<HTMLDivElement>(null);
  const [droppedElements, setDroppedElements] = useState<Array<{type: string, id: string, x: number, y: number, content?: string}>>([]);
  
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

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    const componentData = e.dataTransfer.getData("application/component");
    const imageData = e.dataTransfer.getData("application/image");
    
    if (componentData) {
      const component = JSON.parse(componentData);
      const newElement = {
        type: "component",
        id: `component-${Date.now()}`,
        x: x / (zoomLevel / 100),
        y: y / (zoomLevel / 100),
        content: component.name
      };
      
      setDroppedElements(prev => [...prev, newElement]);
      toast({
        title: "Component Added",
        description: `Added ${component.name} to the canvas`
      });
    } else if (imageData) {
      const image = JSON.parse(imageData);
      const newElement = {
        type: "image",
        id: `image-${Date.now()}`,
        x: x / (zoomLevel / 100),
        y: y / (zoomLevel / 100),
        content: image.url
      };
      
      setDroppedElements(prev => [...prev, newElement]);
      toast({
        title: "Image Added",
        description: "Image added to the canvas"
      });
    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files, x, y);
    }
  };

  const handleFileUpload = (files: FileList, x: number, y: number) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newElement = {
              type: "image",
              id: `image-${Date.now()}`,
              x: x / (zoomLevel / 100),
              y: y / (zoomLevel / 100),
              content: event.target.result as string
            };
            
            setDroppedElements(prev => [...prev, newElement]);
          }
        };
        reader.readAsDataURL(file);
        
        toast({
          title: "Image Uploaded",
          description: "Your image was added to the canvas"
        });
      }
    });
  };

  const renderActiveTemplate = () => {
    switch (activeTemplate) {
      case "marketplace":
        return <MarketplaceTemplate />;
      case "drops":
        return <DropsTemplate />;
      case "token-gate":
        return <TokenGateTemplate />;
      case "buy-coin":
        return <BuyCoinTemplate />;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="editor-toolbar justify-between">
        <DeviceToolbar 
          deviceView={deviceView}
          setDeviceView={setDeviceView}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
        />
        
        <ZoomControls 
          zoomLevel={zoomLevel}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />
      </div>
      
      <div 
        className="flex-1 flex items-center justify-center bg-[#181818] overflow-auto relative p-8"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div 
          ref={canvasRef}
          className={`bg-white rounded-md shadow-2xl transition-all duration-300 transform origin-top relative ${
            deviceView === "desktop" ? "w-[1200px] h-[800px]" : 
            deviceView === "tablet" ? "w-[768px] h-[1024px]" : 
            "w-[375px] h-[667px]"
          }`}
          style={{ 
            transform: `scale(${zoom})`,
            overflow: "hidden" 
          }}
        >
          {renderActiveTemplate()}
          <CanvasElements droppedElements={droppedElements} activeTool={activeTool} />
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-0 transition-opacity duration-300 bg-black/50 text-white text-xl font-medium" id="dropOverlay">
        Drop to add to canvas
      </div>
    </div>
  );
};

export default CanvasArea;
