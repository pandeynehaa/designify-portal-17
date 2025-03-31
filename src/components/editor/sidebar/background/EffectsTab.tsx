
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

interface EffectsTabProps {
  blurAmount: number;
  opacity: number;
  enable3D: boolean;
  onBlurChange: (value: number[]) => void;
  onOpacityChange: (value: number[]) => void;
  on3DToggle: (checked: boolean) => void;
}

const EffectsTab: React.FC<EffectsTabProps> = ({
  blurAmount,
  opacity,
  enable3D,
  onBlurChange,
  onOpacityChange,
  on3DToggle
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs text-cv-white">Blur Effect</label>
          <span className="text-xs text-cv-lightgray">{blurAmount}px</span>
        </div>
        <Slider 
          defaultValue={[blurAmount]} 
          max={20} 
          step={1} 
          value={[blurAmount]}
          onValueChange={onBlurChange}
        />
      </div>
      
      <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs text-cv-white">Opacity</label>
          <span className="text-xs text-cv-lightgray">{opacity}%</span>
        </div>
        <Slider 
          defaultValue={[opacity]} 
          max={100} 
          step={1}
          value={[opacity]}
          onValueChange={onOpacityChange}
        />
      </div>
      
      <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div>
            <label className="text-xs text-cv-white block">3D Parallax Effect</label>
            <span className="text-xs text-cv-lightgray">Adds depth to background</span>
          </div>
          <Switch 
            checked={enable3D}
            onCheckedChange={on3DToggle}
          />
        </div>
      </div>
      
      <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
        <button 
          className="w-full px-3 py-2 bg-cv-accent rounded-md text-white text-sm hover:bg-cv-purple transition-colors"
          onClick={() => toast({
            title: "Effects Applied",
            description: "All background effects have been applied"
          })}
        >
          Apply Effects
        </button>
      </div>
    </div>
  );
};

export default EffectsTab;
