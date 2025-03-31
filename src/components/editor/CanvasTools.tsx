
import React from "react";
import { 
  Move, ZoomIn, ZoomOut, Undo, Redo, 
  Layers, Eye, EyeOff, Lock, Unlock, 
  AlignLeft, AlignCenter, AlignRight,
  Grid, RotateCcw
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface CanvasToolsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

const CanvasTools: React.FC<CanvasToolsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset
}) => {
  const handleMoveClick = () => {
    toast({
      title: "Move Tool",
      description: "Move tool activated"
    });
  };

  const handleGridClick = () => {
    toast({
      title: "Grid",
      description: "Grid toggle will be available soon"
    });
  };

  const handleLayersClick = () => {
    toast({
      title: "Layers",
      description: "Layers panel will be available soon"
    });
  };

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center">
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-full px-3 py-1.5 flex items-center space-x-2 border border-gray-200/50">
        <button 
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          onClick={onZoomOut}
        >
          <ZoomOut size={16} className="text-gray-700" />
        </button>
        
        <div className="px-2 text-xs font-medium text-gray-700">
          {Math.round(zoom * 100)}%
        </div>
        
        <button 
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          onClick={onZoomIn}
        >
          <ZoomIn size={16} className="text-gray-700" />
        </button>
        
        <div className="h-4 w-px bg-gray-200 mx-1"></div>
        
        <button 
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          onClick={onReset}
        >
          <RotateCcw size={16} className="text-gray-700" />
        </button>
      </div>
      
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-full px-3 py-1.5 ml-3 flex items-center space-x-2 border border-gray-200/50">
        <button 
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          onClick={handleMoveClick}
        >
          <Move size={16} className="text-gray-700" />
        </button>
        
        <button 
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          onClick={handleGridClick}
        >
          <Grid size={16} className="text-gray-700" />
        </button>
        
        <button 
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          onClick={handleLayersClick}
        >
          <Layers size={16} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default CanvasTools;
