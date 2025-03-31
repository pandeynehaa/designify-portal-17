
import React from "react";
import { toast } from "@/components/ui/use-toast";

const SOLID_COLORS = [
  "#1A1F2C", "#6E59A5", "#8E9196", "#7E69AB", "#9b87f5", 
  "#F2FCE2", "#FEF7CD", "#FEC6A1", "#E5DEFF", "#FFDEE2"
];

interface ColorTabProps {
  onColorSelect: (color: string) => void;
}

const ColorTab: React.FC<ColorTabProps> = ({ onColorSelect }) => {
  const handleApplySolidColor = (color: string) => {
    onColorSelect(color);
    toast({
      title: "Background Updated",
      description: `Solid color ${color} applied to the background`
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2 mb-4">
        {SOLID_COLORS.map((color, index) => (
          <div 
            key={index}
            className="w-full aspect-square rounded-md cursor-pointer hover:ring-2 hover:ring-cv-accent transition-all"
            style={{ background: color }}
            onClick={() => handleApplySolidColor(color)}
            title={color}
          />
        ))}
      </div>
      
      <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
        <label className="block text-xs text-cv-white mb-1">Custom Color</label>
        <div className="flex gap-2">
          <input 
            type="color" 
            className="w-10 h-10 rounded cursor-pointer" 
            onChange={(e) => handleApplySolidColor(e.target.value)}
          />
          <input
            type="text"
            placeholder="#RRGGBB"
            className="flex-1 bg-cv-gray border border-cv-lightgray rounded px-2 py-1 text-sm text-cv-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorTab;
