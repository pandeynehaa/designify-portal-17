
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import ThreeDToggle from "../../properties/ThreeD/ThreeDToggle";

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
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <Label className="text-xs text-cv-white">Blur Amount</Label>
          <span className="text-xs text-cv-white">{blurAmount}px</span>
        </div>
        <Slider 
          value={[blurAmount]} 
          min={0} 
          max={20} 
          step={0.5} 
          onValueChange={onBlurChange} 
        />
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <Label className="text-xs text-cv-white">Opacity</Label>
          <span className="text-xs text-cv-white">{opacity}%</span>
        </div>
        <Slider 
          value={[opacity]} 
          min={0} 
          max={100} 
          step={1} 
          onValueChange={onOpacityChange} 
        />
      </div>
      
      <ThreeDToggle enabled={enable3D} onChange={on3DToggle} />
    </div>
  );
};

export default EffectsTab;
