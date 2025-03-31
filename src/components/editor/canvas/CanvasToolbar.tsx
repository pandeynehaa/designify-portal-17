import React, { useState } from "react";
import { Plus, Type, Image, LayoutGrid, Monitor, Tablet, Smartphone, Move, MousePointer, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CanvasToolbarProps {
  deviceView: string;
  setDeviceView: (device: string) => void;
  activeTool: string;
  setActiveTool: (tool: string) => void;
  zoomLevel: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  onInsertText: () => void;
  onInsertImage: () => void;
  onInsertComponent: () => void;
  onInsertImagePlaceholder?: () => void;
}

const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  deviceView,
  setDeviceView,
  activeTool,
  setActiveTool,
  zoomLevel,
  handleZoomIn,
  handleZoomOut,
  onInsertText,
  onInsertImage,
  onInsertComponent,
  onInsertImagePlaceholder
}) => {
  const [insertMenuOpen, setInsertMenuOpen] = useState(false);

  return (
    <div className="bg-cv-gray/50 p-2 rounded-t-lg flex justify-between items-center border-b border-cv-lightgray/10">
      <div className="flex items-center space-x-1">
        {/* Left toolbar - Insert and Tools */}
        <DropdownMenu open={insertMenuOpen} onOpenChange={setInsertMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-xs text-cv-white hover:bg-cv-gray"
            >
              <Plus size={14} /> Insert
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cv-darkgray border-cv-lightgray/20">
            <DropdownMenuItem 
              className="text-cv-white hover:bg-cv-gray cursor-pointer" 
              onClick={() => {
                onInsertText();
                setInsertMenuOpen(false);
              }}
            >
              <Type size={14} className="mr-2" /> Text
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-cv-white hover:bg-cv-gray cursor-pointer" 
              onClick={() => {
                onInsertImage();
                setInsertMenuOpen(false);
              }}
            >
              <Image size={14} className="mr-2" /> Image
            </DropdownMenuItem>
            {onInsertImagePlaceholder && (
              <DropdownMenuItem 
                className="text-cv-white hover:bg-cv-gray cursor-pointer" 
                onClick={() => {
                  onInsertImagePlaceholder();
                  setInsertMenuOpen(false);
                }}
              >
                <FilePlus size={14} className="mr-2" /> Image Placeholder
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              className="text-cv-white hover:bg-cv-gray cursor-pointer" 
              onClick={() => {
                onInsertComponent();
                setInsertMenuOpen(false);
              }}
            >
              <LayoutGrid size={14} className="mr-2" /> Component
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Tool Selection */}
        <div className="flex items-center bg-cv-gray/50 rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 p-0 ${activeTool === 'select' ? 'bg-cv-accent text-white' : 'text-cv-white'}`}
            onClick={() => setActiveTool('select')}
            title="Select Tool"
          >
            <MousePointer size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 p-0 ${activeTool === 'move' ? 'bg-cv-accent text-white' : 'text-cv-white'}`}
            onClick={() => setActiveTool('move')}
            title="Move Tool"
          >
            <Move size={14} />
          </Button>
        </div>
      </div>
      
      {/* Rest of toolbar */}
      <div className="flex items-center space-x-2">
        {/* Device View Selection */}
        <div className="flex items-center bg-cv-gray/50 rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 p-0 ${deviceView === 'desktop' ? 'bg-cv-accent text-white' : 'text-cv-white'}`}
            onClick={() => setDeviceView('desktop')}
            title="Desktop View"
          >
            <Monitor size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 p-0 ${deviceView === 'tablet' ? 'bg-cv-accent text-white' : 'text-cv-white'}`}
            onClick={() => setDeviceView('tablet')}
            title="Tablet View"
          >
            <Tablet size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 p-0 ${deviceView === 'smartphone' ? 'bg-cv-accent text-white' : 'text-cv-white'}`}
            onClick={() => setDeviceView('smartphone')}
            title="Smartphone View"
          >
            <Smartphone size={14} />
          </Button>
        </div>
        
        {/* Zoom Controls */}
        <div className="flex items-center bg-cv-gray/50 rounded-md px-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 text-cv-white"
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            -
          </Button>
          <span className="text-xs text-cv-white">{zoomLevel}%</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 text-cv-white"
            onClick={handleZoomIn}
            title="Zoom In"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CanvasToolbar;
