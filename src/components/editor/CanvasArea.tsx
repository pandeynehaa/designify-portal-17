import React, { useState, useRef } from "react";
import { useDeviceState } from "../../hooks/useDeviceState";
import DeviceToolbar from "./DeviceToolbar";
import ZoomControls from "./ZoomControls";
import CanvasElements from "./CanvasElements";
import CanvasTools from "./CanvasTools";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { Edit, Crop, MousePointer, Move, Type, Image as ImageIcon, Layers } from "lucide-react";
import { TemplateStyles } from "../../types/templateStyles";
import { CanvasElement } from "../../types/canvasElement";
import CanvasEventHandlers from "./canvas/CanvasEventHandlers";
import TemplateRenderer from "./canvas/TemplateRenderer";
import CanvasActionButton from "./canvas/CanvasActionButton";
import { useSelectedElement } from "../../hooks/useSelectedElement";
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
  const [droppedElements, setDroppedElements] = useState<CanvasElement[]>([]);
  const [showGrid, setShowGrid] = useState(true);
  const [editMode, setEditMode] = useState(true);
  const { selectedElement, selectElement } = useSelectedElement();
  
  React.useEffect(() => {
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

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
    toast({
      title: editMode ? "Preview Mode" : "Edit Mode",
      description: editMode ? "Now viewing the design in preview mode" : "Now editing the design"
    });
  };

  const handleInsertText = () => {
    const newId = `text-${Date.now()}`;
    setDroppedElements([
      ...droppedElements,
      {
        type: 'component',
        id: newId,
        x: 100,
        y: 100,
        content: 'New Text Element'
      }
    ]);
    toast({
      title: "Text Added",
      description: "New text element has been added to the canvas"
    });
  };

  const handleInsertImage = () => {
    const newId = `image-${Date.now()}`;
    setDroppedElements([
      ...droppedElements,
      {
        type: 'image',
        id: newId,
        x: 150,
        y: 150,
        content: 'https://via.placeholder.com/150'
      }
    ]);
    toast({
      title: "Image Added",
      description: "New image element has been added to the canvas"
    });
  };

  const handleInsertComponent = () => {
    const newId = `component-${Date.now()}`;
    setDroppedElements([
      ...droppedElements,
      {
        type: 'component',
        id: newId,
        x: 200,
        y: 200,
        content: 'Button'
      }
    ]);
    toast({
      title: "Component Added",
      description: "New component has been added to the canvas"
    });
  };
  
  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setDroppedElements(elements => 
      elements.map(element => 
        element.id === id ? { ...element, ...updates } : element
      )
    );
    
    toast({
      title: "Element Updated",
      description: "Changes have been applied to the element"
    });
  };
  
  React.useEffect(() => {
    (window as any).updateCanvasElement = updateElement;
  }, []);
  
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
                <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer" onClick={handleInsertText}>
                  <Type className="mr-2 h-4 w-4" />
                  <span>Text</span>
                </MenubarItem>
                <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer" onClick={handleInsertImage}>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  <span>Image</span>
                </MenubarItem>
                <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer" onClick={handleInsertComponent}>
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
      
      <CanvasEventHandlers
        canvasRef={canvasRef}
        zoomLevel={zoomLevel}
        setDroppedElements={setDroppedElements}
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
          <TemplateRenderer activeTemplate={activeTemplate} templateStyles={templateStyles} />
          <CanvasElements droppedElements={droppedElements} activeTool={activeTool} />
          <CanvasActionButton editMode={editMode} templateStyles={templateStyles} />
        </div>
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
