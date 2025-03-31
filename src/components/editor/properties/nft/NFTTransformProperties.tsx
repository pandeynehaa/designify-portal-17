
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RotateCcw, Scale } from "lucide-react";
import { NFTData } from "../../../../types/canvasElement";

interface NFTTransformPropertiesProps {
  values: {
    rotation: number;
    scale: number;
    width: number;
    height: number;
  };
  elementPosition: {
    x: number;
    y: number;
  };
  handleChange: (field: string, value: any) => void;
  updateElementPosition: (updates: { x?: number; y?: number }) => void;
}

const NFTTransformProperties: React.FC<NFTTransformPropertiesProps> = ({
  values,
  elementPosition,
  handleChange,
  updateElementPosition
}) => {
  return (
    <div className="space-y-4 pt-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="rotation" className="text-xs text-editor-muted">Rotation</Label>
          <span className="text-xs">{values.rotation}°</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw size={16} className="text-editor-muted" />
          <Slider
            id="rotation"
            min={0}
            max={360}
            step={1}
            value={[values.rotation]}
            onValueChange={(value) => handleChange('rotation', value[0])}
            className="flex-1"
          />
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="scale" className="text-xs text-editor-muted">Scale</Label>
          <span className="text-xs">{values.scale.toFixed(1)}x</span>
        </div>
        <div className="flex items-center gap-2">
          <Scale size={16} className="text-editor-muted" />
          <Slider
            id="scale"
            min={0.5}
            max={3}
            step={0.1}
            value={[values.scale]}
            onValueChange={(value) => handleChange('scale', value[0])}
            className="flex-1"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="width" className="text-xs text-editor-muted mb-1.5">Width (px)</Label>
          <Input
            id="width"
            type="number"
            value={values.width}
            onChange={(e) => handleChange('width', parseInt(e.target.value) || 100)}
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
          />
        </div>
        <div>
          <Label htmlFor="height" className="text-xs text-editor-muted mb-1.5">Height (px)</Label>
          <Input
            id="height"
            type="number"
            value={values.height}
            onChange={(e) => handleChange('height', parseInt(e.target.value) || 100)}
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="pos-x" className="text-xs text-editor-muted mb-1.5">X Position</Label>
          <Input
            id="pos-x"
            type="number"
            value={elementPosition.x}
            onChange={(e) => updateElementPosition({ x: parseInt(e.target.value) || 0 })}
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
          />
        </div>
        <div>
          <Label htmlFor="pos-y" className="text-xs text-editor-muted mb-1.5">Y Position</Label>
          <Input
            id="pos-y"
            type="number"
            value={elementPosition.y}
            onChange={(e) => updateElementPosition({ y: parseInt(e.target.value) || 0 })}
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
          />
        </div>
      </div>
    </div>
  );
};

export default NFTTransformProperties;
