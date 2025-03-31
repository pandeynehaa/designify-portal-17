
import React, { useState, useRef, DragEvent, useEffect } from "react";
import { toast } from "../ui/use-toast";
import DeviceToolbar from "./DeviceToolbar";
import ZoomControls from "./ZoomControls";
import CanvasElements from "./CanvasElements";
import MarketplaceTemplate from "./templates/MarketplaceTemplate";
import DropsTemplate from "./templates/DropsTemplate";
import TokenGateTemplate from "./templates/TokenGateTemplate";
import BuyCoinTemplate from "./templates/BuyCoinTemplate";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { Edit, Crop, MousePointer, Move, Plus, Type, Image as ImageIcon, Layers } from "lucide-react";

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
  const [showGrid, setShowGrid] = useState(true);
  const [editMode, setEditMode] = useState(true);
  
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

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Highlight drop area
    if (canvasRef.current) {
      canvasRef.current.classList.add("drag-over");
    }
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Remove highlight
    if (canvasRef.current) {
      canvasRef.current.classList.remove("drag-over");
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Remove highlight
    if (canvasRef.current) {
      canvasRef.current.classList.remove("drag-over");
    }
    
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

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
    toast({
      title: editMode ? "Preview Mode" : "Edit Mode",
      description: editMode ? "Viewing the site as it will appear to users" : "You can now edit the site"
    });
  };
  
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="editor-toolbar justify-between">
        <div className="flex items-center space-x-2">
          <DeviceToolbar 
            deviceView={deviceView}
            setDeviceView={setDeviceView}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
          />
          
          <div className="h-6 border-r border-cv-lightgray mx-1"></div>
          
          <Menubar className="bg-transparent border-none p-0">
            <MenubarMenu>
              <MenubarTrigger className="px-2 hover:bg-cv-lightgray text-cv-white">Insert</MenubarTrigger>
              <MenubarContent className="bg-cv-darkgray border border-cv-lightgray">
                <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer">
                  <Type className="mr-2 h-4 w-4" />
                  <span>Text</span>
                </MenubarItem>
                <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  <span>Image</span>
                </MenubarItem>
                <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer">
                  <Layers className="mr-2 h-4 w-4" />
                  <span>Component</span>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${activeTool === 'select' ? 'bg-cv-accent text-cv-white' : 'text-cv-white hover:bg-cv-lightgray'}`}
            onClick={() => setActiveTool('select')}
          >
            <MousePointer size={14} />
          </button>
          <button 
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${activeTool === 'edit' ? 'bg-cv-accent text-cv-white' : 'text-cv-white hover:bg-cv-lightgray'}`}
            onClick={() => setActiveTool('edit')}
          >
            <Edit size={14} />
          </button>
          <button 
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${activeTool === 'move' ? 'bg-cv-accent text-cv-white' : 'text-cv-white hover:bg-cv-lightgray'}`}
            onClick={() => setActiveTool('move')}
          >
            <Move size={14} />
          </button>
          <button 
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${activeTool === 'crop' ? 'bg-cv-accent text-cv-white' : 'text-cv-white hover:bg-cv-lightgray'}`}
            onClick={() => setActiveTool('crop')}
          >
            <Crop size={14} />
          </button>
          
          <div className="h-5 border-r border-cv-lightgray mx-1"></div>
          
          <button
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors text-cv-white hover:bg-cv-lightgray ${showGrid ? 'bg-cv-lightgray' : ''}`}
            onClick={toggleGrid}
            title="Toggle Grid"
          >
            Grid
          </button>
          
          <button
            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors text-cv-white hover:bg-cv-lightgray ${!editMode ? 'bg-cv-lightgray' : ''}`}
            onClick={toggleEditMode}
            title="Toggle Preview Mode"
          >
            Preview
          </button>
        </div>
        
        <ZoomControls 
          zoomLevel={zoomLevel}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />
      </div>
      
      <div 
        className="flex-1 flex items-center justify-center bg-[#111111] overflow-auto relative p-8"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div 
          ref={canvasRef}
          className={`bg-white rounded-md shadow-2xl transition-all duration-300 transform origin-top relative ${
            deviceView === "desktop" ? "w-[1200px] h-[800px]" : 
            deviceView === "tablet" ? "w-[768px] h-[1024px]" : 
            "w-[375px] h-[667px]"
          } ${showGrid ? 'bg-grid-pattern' : ''}`}
          style={{ 
            transform: `scale(${zoom})`,
            overflow: "hidden",
            backgroundImage: showGrid ? 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)' : 'none',
            backgroundSize: showGrid ? '20px 20px' : '0',
          }}
        >
          {renderActiveTemplate()}
          <CanvasElements droppedElements={droppedElements} activeTool={activeTool} />
          
          {editMode && (
            <button 
              className="absolute right-4 bottom-4 p-2 bg-cv-accent rounded-full text-white shadow-lg hover:bg-cv-accent/90 transition-colors"
              title="Add Element"
            >
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>
      
      <div 
        className={`absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-0 transition-opacity duration-300 bg-black/50 text-white text-xl font-medium`} 
        id="dropOverlay"
      >
        Drop to add to canvas
      </div>
    </div>
  );
};

export default CanvasArea;
