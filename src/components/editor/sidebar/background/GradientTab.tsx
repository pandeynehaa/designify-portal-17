
import React from "react";
import { toast } from "@/components/ui/use-toast";

const GRADIENT_PRESETS = [
  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
  "linear-gradient(to top, #e6b980 0%, #eacda3 100%)",
  "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)",
  "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
  "linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)",
  "linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)",
  "linear-gradient(to right, #243949 0%, #517fa4 100%)",
];

interface GradientTabProps {
  onGradientSelect: (gradient: string) => void;
}

const GradientTab: React.FC<GradientTabProps> = ({ onGradientSelect }) => {
  const handleApplyGradient = (gradient: string) => {
    onGradientSelect(gradient);
    toast({
      title: "Background Updated",
      description: "Gradient applied to the background"
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 mb-4">
        {GRADIENT_PRESETS.map((gradient, index) => (
          <div 
            key={index}
            className="h-20 rounded-md cursor-pointer hover:ring-2 hover:ring-cv-accent transition-all"
            style={{ background: gradient }}
            onClick={() => handleApplyGradient(gradient)}
          />
        ))}
      </div>
      
      <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
        <label className="block text-xs text-cv-white mb-1">Custom Gradient</label>
        <input
          type="text"
          placeholder="linear-gradient(...)"
          className="w-full bg-cv-gray border border-cv-lightgray rounded px-2 py-1 text-sm text-cv-white"
        />
        <div className="flex gap-2 mt-2">
          <div className="flex items-center gap-1">
            <label className="text-xs text-cv-white">Start:</label>
            <input type="color" className="w-8 h-8 rounded cursor-pointer" />
          </div>
          <div className="flex items-center gap-1">
            <label className="text-xs text-cv-white">End:</label>
            <input type="color" className="w-8 h-8 rounded cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientTab;
