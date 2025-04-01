
import React from "react";
import { 
  Move, ZoomIn, ZoomOut, Undo, Redo, 
  Layers, Eye, Grid, RotateCcw, Edit, Sparkles
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface CanvasToolsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  showGrid: boolean;
  toggleGrid: () => void;
  editMode: boolean;
  toggleEditMode: () => void;
}

const CanvasTools: React.FC<CanvasToolsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  showGrid,
  toggleGrid,
  editMode,
  toggleEditMode
}) => {
  const handleMoveClick = () => {
    toast({
      title: "Move Tool",
      description: "Move tool activated"
    });
  };

  const handleLayersClick = () => {
    toast({
      title: "Layers",
      description: "Layers panel will be available soon"
    });
  };
  
  const handleMintNow = () => {
    toast({
      title: "Mint as NFT",
      description: "Your design is being prepared to be minted as an NFT"
    });
    
    // Simulate minting completion after a delay
    setTimeout(() => {
      toast({
        title: "NFT Minted Successfully",
        description: "Your design has been minted and is now available in the marketplace."
      });
    }, 3000);
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
          className={`p-1.5 rounded-full hover:bg-gray-100 transition-colors ${showGrid ? 'bg-cv-accent text-white' : ''}`}
          onClick={toggleGrid}
        >
          <Grid size={16} className={`${showGrid ? 'text-white' : 'text-gray-700'}`} />
        </button>
        
        <button 
          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          onClick={handleLayersClick}
        >
          <Layers size={16} className="text-gray-700" />
        </button>
        
        <div className="h-4 w-px bg-gray-200 mx-1"></div>
        
        <button
          className={`p-1.5 rounded-full hover:bg-gray-100 transition-colors ${!editMode ? 'bg-cv-accent text-white' : ''}`}
          onClick={toggleEditMode}
          title={editMode ? "Switch to Preview Mode" : "Switch to Edit Mode"}
        >
          {editMode ? (
            <Eye size={16} className="text-gray-700" />
          ) : (
            <Edit size={16} className="text-white" />
          )}
        </button>

        <button
          className="p-1.5 rounded-full bg-cv-accent hover:bg-cv-accent/90 transition-colors"
          onClick={handleMintNow}
          title="Mint as NFT"
        >
          <Sparkles size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default CanvasTools;
