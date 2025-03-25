
import React from "react";
import { Upload } from "lucide-react";

interface CanvasDropOverlayProps {
  isVisible: boolean;
}

const CanvasDropOverlay: React.FC<CanvasDropOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute inset-0 bg-theme-primary/10 border-2 border-dashed border-theme-primary/50 rounded-lg flex items-center justify-center z-40 pointer-events-none animate-pulse">
      <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center">
        <div className="w-12 h-12 bg-theme-primary/10 rounded-full flex items-center justify-center mb-3">
          <Upload size={20} className="text-theme-primary" />
        </div>
        <p className="text-gray-800 font-medium">Drop to add to canvas</p>
        <p className="text-gray-500 text-sm">Release to place your element</p>
      </div>
    </div>
  );
};

export default CanvasDropOverlay;
