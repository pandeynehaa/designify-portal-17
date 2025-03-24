
import React, { useState, useRef, DragEvent } from "react";
import { 
  Monitor, Smartphone, Tablet, 
  ZoomIn, ZoomOut, MousePointer, Move,
  Eye, Share2, PlusSquare, MinusSquare
} from "lucide-react";
import { toast } from "../ui/use-toast";

interface CanvasAreaProps {
  activeTemplate: string;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({ activeTemplate }) => {
  const [deviceView, setDeviceView] = useState("desktop");
  const [zoomLevel, setZoomLevel] = useState(100);
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
    
    // Get the drop position relative to the canvas
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    // Check if it's a component or an image
    const componentData = e.dataTransfer.getData("application/component");
    const imageData = e.dataTransfer.getData("application/image");
    
    if (componentData) {
      // It's a component being dragged from the sidebar
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
      // It's an image being dragged from the images panel
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
      // It's a file being dragged from the file system
      Array.from(e.dataTransfer.files).forEach(file => {
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
    }
  };

  // Render the dropped elements on the canvas
  const renderDroppedElements = () => {
    return droppedElements.map(element => {
      const style = {
        position: 'absolute' as const,
        left: `${element.x}px`,
        top: `${element.y}px`,
        cursor: activeTool === 'select' ? 'pointer' : 'move',
      };
      
      if (element.type === 'component') {
        return (
          <div key={element.id} style={style} className="p-2 bg-white border border-gray-200 rounded shadow-sm">
            {element.content}
          </div>
        );
      } else if (element.type === 'image') {
        return (
          <img 
            key={element.id} 
            src={element.content} 
            alt="Dropped image" 
            style={style}
            className="max-w-[300px] max-h-[300px] rounded shadow-sm"
          />
        );
      }
      return null;
    });
  };
  
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="editor-toolbar justify-between">
        <div className="flex items-center space-x-3">
          <button
            className={`p-1.5 rounded-md ${deviceView === "desktop" ? "bg-editor-highlight" : "hover:bg-editor-surface"} toolbar-button-hover`}
            onClick={() => setDeviceView("desktop")}
          >
            <Monitor size={16} className="text-editor-text" />
          </button>
          <button
            className={`p-1.5 rounded-md ${deviceView === "tablet" ? "bg-editor-highlight" : "hover:bg-editor-surface"} toolbar-button-hover`}
            onClick={() => setDeviceView("tablet")}
          >
            <Tablet size={16} className="text-editor-text" />
          </button>
          <button
            className={`p-1.5 rounded-md ${deviceView === "mobile" ? "bg-editor-highlight" : "hover:bg-editor-surface"} toolbar-button-hover`}
            onClick={() => setDeviceView("mobile")}
          >
            <Smartphone size={16} className="text-editor-text" />
          </button>
          
          <div className="h-4 border-r border-editor-border mx-1"></div>
          
          <button
            className={`p-1.5 rounded-md ${activeTool === "select" ? "bg-editor-highlight" : "hover:bg-editor-surface"} toolbar-button-hover`}
            onClick={() => setActiveTool("select")}
          >
            <MousePointer size={14} className="text-editor-text" />
          </button>
          <button
            className={`p-1.5 rounded-md ${activeTool === "move" ? "bg-editor-highlight" : "hover:bg-editor-surface"} toolbar-button-hover`}
            onClick={() => setActiveTool("move")}
          >
            <Move size={14} className="text-editor-text" />
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <button className="p-1.5 hover:bg-editor-surface rounded-md toolbar-button-hover" onClick={handleZoomOut}>
              <MinusSquare size={14} className="text-editor-text" />
            </button>
            <span className="text-xs text-editor-text">{zoomLevel}%</span>
            <button className="p-1.5 hover:bg-editor-surface rounded-md toolbar-button-hover" onClick={handleZoomIn}>
              <PlusSquare size={14} className="text-editor-text" />
            </button>
          </div>
          
          <div className="h-4 border-r border-editor-border mx-1"></div>
          
          <button className="p-1.5 hover:bg-editor-surface rounded-md toolbar-button-hover">
            <Eye size={16} className="text-editor-text" />
          </button>
          <button className="p-1.5 hover:bg-editor-surface rounded-md toolbar-button-hover">
            <Share2 size={16} className="text-editor-text" />
          </button>
        </div>
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
            transform: `scale(${zoomLevel / 100})`,
            overflow: "hidden" 
          }}
        >
          {/* Template content */}
          {activeTemplate === "marketplace" && <MarketplaceTemplate />}
          {activeTemplate === "drops" && <DropsTemplate />}
          {activeTemplate === "token-gate" && <TokenGateTemplate />}
          {activeTemplate === "buy-coin" && <BuyCoinTemplate />}
          
          {/* Render the dragged and dropped elements */}
          {renderDroppedElements()}
        </div>
      </div>
      
      {/* Drag and drop instruction overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-0 transition-opacity duration-300 bg-black/50 text-white text-xl font-medium" id="dropOverlay">
        Drop to add to canvas
      </div>
    </div>
  );
};

// Template components (simplified for the prototype)
const MarketplaceTemplate: React.FC = () => (
  <div className="h-full bg-gray-50 flex flex-col">
    <div className="h-16 border-b border-gray-200 flex items-center px-6 bg-white">
      <div className="w-36 h-6 bg-gray-200 rounded-md"></div>
      <div className="ml-auto flex space-x-4">
        <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
    
    <div className="p-6">
      <div className="mb-8">
        <div className="w-64 h-10 bg-gray-200 rounded-md mb-4"></div>
        <div className="w-full h-6 bg-gray-200 rounded-md"></div>
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="w-full h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="w-3/4 h-5 bg-gray-200 rounded-md mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DropsTemplate: React.FC = () => (
  <div className="h-full bg-gray-900 flex flex-col">
    <div className="h-16 border-b border-gray-800 flex items-center px-6 bg-gray-800">
      <div className="w-36 h-6 bg-gray-700 rounded-md"></div>
      <div className="ml-auto flex space-x-4">
        <div className="w-20 h-6 bg-gray-700 rounded-md"></div>
        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      </div>
    </div>
    
    <div className="flex-1 flex">
      <div className="w-1/2 p-8">
        <div className="mb-6">
          <div className="w-3/4 h-10 bg-gray-800 rounded-md mb-4"></div>
          <div className="w-full h-5 bg-gray-800 rounded-md mb-2"></div>
          <div className="w-full h-5 bg-gray-800 rounded-md"></div>
        </div>
        
        <div className="w-full h-12 bg-blue-600 rounded-md mb-4"></div>
        <div className="w-full h-12 bg-gray-800 rounded-md"></div>
      </div>
      
      <div className="w-1/2 p-8 flex justify-center items-center">
        <div className="w-full h-[400px] bg-gray-800 rounded-md"></div>
      </div>
    </div>
  </div>
);

const TokenGateTemplate: React.FC = () => (
  <div className="h-full bg-gray-100 flex items-center justify-center p-8">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
      <div className="h-20 bg-gray-800 flex items-center justify-center">
        <div className="w-36 h-8 bg-gray-700 rounded-md"></div>
      </div>
      
      <div className="p-6">
        <div className="w-full h-8 bg-gray-200 rounded-md mb-6"></div>
        
        <div className="space-y-4 mb-6">
          <div className="w-full h-6 bg-gray-200 rounded-md"></div>
          <div className="w-3/4 h-6 bg-gray-200 rounded-md"></div>
        </div>
        
        <div className="w-full h-12 bg-blue-600 rounded-md mb-4"></div>
        <div className="w-full h-4 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  </div>
);

const BuyCoinTemplate: React.FC = () => (
  <div className="h-full bg-gray-50 flex flex-col">
    <div className="h-16 border-b border-gray-200 flex items-center px-6 bg-white">
      <div className="w-36 h-6 bg-gray-200 rounded-md"></div>
      <div className="ml-auto flex space-x-4">
        <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
    
    <div className="flex flex-col items-center justify-center flex-1 p-8">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
        </div>
        <div className="w-48 h-8 bg-gray-200 rounded-md mx-auto mb-2"></div>
        <div className="w-64 h-4 bg-gray-200 rounded-md mx-auto"></div>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="w-1/2 h-6 bg-gray-200 rounded-md mb-4"></div>
        <div className="w-full h-12 bg-gray-100 rounded-md mb-6"></div>
        
        <div className="mb-6">
          <div className="w-full h-6 bg-gray-200 rounded-md mb-2"></div>
          <div className="w-full h-6 bg-gray-200 rounded-md"></div>
        </div>
        
        <div className="w-full h-12 bg-blue-600 rounded-md"></div>
      </div>
    </div>
  </div>
);

export default CanvasArea;
