
import React from "react";
import { TemplateStyles } from "../../../types/templateStyles";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ApplyToAllSites from "./ApplyToAllSites";

interface BackgroundPropertiesProps {
  templateStyles: TemplateStyles;
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
  applyToAllSites: (property: keyof TemplateStyles, value: any) => void;
}

const BackgroundProperties: React.FC<BackgroundPropertiesProps> = ({
  templateStyles,
  updateTemplateStyles,
  applyToAllSites
}) => {
  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Background Type</label>
        <select
          className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          value={templateStyles.bannerBg.startsWith('bg-') ? 'gradient' : 'color'}
          onChange={(e) => {
            const type = e.target.value;
            if (type === 'gradient') {
              updateTemplateStyles('bannerBg', 'bg-gradient-to-r from-[#232329] to-[#18181E]');
            } else {
              updateTemplateStyles('bannerBg', '#232329');
            }
          }}
        >
          <option value="color">Solid Color</option>
          <option value="gradient">Gradient</option>
        </select>
      </div>
      
      {!templateStyles.bannerBg.startsWith('bg-') && (
        <div>
          <label className="block text-xs text-editor-muted mb-1">Banner Background</label>
          <input
            type="color"
            value={templateStyles.bannerBg}
            onChange={(e) => updateTemplateStyles('bannerBg', e.target.value)}
            className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
          />
        </div>
      )}
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="enable3D" className="text-xs text-editor-muted">Enable 3D Effect</Label>
          <Switch
            id="enable3D"
            checked={templateStyles.enable3D}
            onCheckedChange={(checked) => updateTemplateStyles('enable3D', checked)}
          />
        </div>
        <p className="text-xs text-gray-500">
          Enables a 3D perspective effect on the canvas template
        </p>
      </div>
      
      <ApplyToAllSites
        property="enable3D"
        value={templateStyles.enable3D}
        onApply={applyToAllSites}
      />
    </div>
  );
};

export default BackgroundProperties;
