
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface NFTEffectsPropertiesProps {
  values: {
    blurAmount: number;
    glowSpread: number;
    glowColor: string;
  };
  handleChange: (field: string, value: any) => void;
}

const NFTEffectsProperties: React.FC<NFTEffectsPropertiesProps> = ({ values, handleChange }) => {
  return (
    <div className="space-y-4 pt-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="blur" className="text-xs text-editor-muted">Blur Amount</Label>
          <span className="text-xs">{values.blurAmount}px</span>
        </div>
        <Slider
          id="blur"
          min={0}
          max={10}
          step={0.5}
          value={[values.blurAmount]}
          onValueChange={(value) => handleChange('blurAmount', value[0])}
        />
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="glowSpread" className="text-xs text-editor-muted">Glow Spread</Label>
          <span className="text-xs">{values.glowSpread}px</span>
        </div>
        <Slider
          id="glowSpread"
          min={0}
          max={30}
          step={1}
          value={[values.glowSpread]}
          onValueChange={(value) => handleChange('glowSpread', value[0])}
        />
      </div>
      
      <div>
        <Label htmlFor="glowColor" className="text-xs text-editor-muted mb-1.5">Glow Color</Label>
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-md border border-gray-300" 
            style={{ backgroundColor: values.glowColor }}
          />
          <Input
            id="glowColor"
            type="color"
            value={values.glowColor}
            onChange={(e) => handleChange('glowColor', e.target.value)}
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
          />
        </div>
      </div>
    </div>
  );
};

export default NFTEffectsProperties;
