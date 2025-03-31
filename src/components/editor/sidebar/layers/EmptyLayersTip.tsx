
import React from "react";
import { Layers as LayersIcon } from "lucide-react";

const EmptyLayersTip: React.FC = () => {
  return (
    <div className="p-6 text-center text-sm text-cv-white/70 flex flex-col items-center">
      <LayersIcon className="mx-auto mb-3 h-12 w-12 opacity-50" />
      <p className="font-medium">No layers on canvas yet</p>
      <p className="mt-2 text-xs">Add elements using the Insert menu or drag items from the panels</p>
    </div>
  );
};

export default EmptyLayersTip;
