
import React from "react";
import { Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyLayersStateProps {
  handleAddLayer: () => void;
}

const EmptyLayersState: React.FC<EmptyLayersStateProps> = ({ handleAddLayer }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center text-cv-white/60">
      <Layers size={40} className="mb-4 opacity-40" />
      <h3 className="text-lg font-medium mb-2">No Layers Yet</h3>
      <p className="text-sm mb-6">
        Create layers to organize and manage your canvas elements
      </p>
      <Button onClick={handleAddLayer} variant="secondary" className="bg-cv-accent hover:bg-cv-accent/90 text-white">
        <Plus size={16} className="mr-2" /> Create New Layer
      </Button>
    </div>
  );
};

export default EmptyLayersState;
