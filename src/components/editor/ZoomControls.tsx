
import React from "react";
import { Eye, Share2, PlusSquare, MinusSquare } from "lucide-react";

interface ZoomControlsProps {
  zoomLevel: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  handleZoomIn,
  handleZoomOut
}) => {
  return (
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
  );
};

export default ZoomControls;
