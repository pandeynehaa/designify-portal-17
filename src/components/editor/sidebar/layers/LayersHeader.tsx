
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayersHeaderProps {
  handleAddLayer: () => void;
}

const LayersHeader: React.FC<LayersHeaderProps> = ({ handleAddLayer }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-medium text-cv-white uppercase">Layers</h3>
      <Button 
        size="sm" 
        variant="ghost" 
        onClick={handleAddLayer}
        className="h-7 px-2 text-cv-white"
      >
        <Plus size={14} className="mr-1" /> Add Layer
      </Button>
    </div>
  );
};

export default LayersHeader;
