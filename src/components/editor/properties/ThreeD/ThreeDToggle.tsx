
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ThreeDToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const ThreeDToggle: React.FC<ThreeDToggleProps> = ({ enabled, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <Label htmlFor="enable3D" className="text-xs text-editor-muted">3D Perspective Effect</Label>
        <Switch
          id="enable3D"
          checked={enabled}
          onCheckedChange={onChange}
        />
      </div>
      <p className="text-xs text-gray-500">
        Adds depth and dimensionality to your canvas design
      </p>
    </div>
  );
};

export default ThreeDToggle;
