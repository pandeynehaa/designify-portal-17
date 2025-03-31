
import React from "react";
import { Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyLayersStateProps {
  handleAddLayer: () => void;
}

const EmptyLayersState: React.FC<EmptyLayersStateProps> = ({ handleAddLayer }) => {
  return (
    <div className="p-6 text-center">
      <Layers className="h-10 w-10 mx-auto mb-3 text-cv-purple/50" />
      <h3 className="font-medium text-cv-white mb-2">No Layers Created Yet</h3>
      <p className="text-sm text-cv-white/60 mb-4">
        Layers help you organize elements on your canvas
      </p>
      <Button 
        onClick={handleAddLayer}
        className="bg-cv-purple hover:bg-cv-purple/80"
      >
        <Plus size={14} className="mr-1" /> Add First Layer
      </Button>
    </div>
  );
};

export default EmptyLayersState;
