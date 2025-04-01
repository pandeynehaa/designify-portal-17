
import React from "react";
import { TemplateStyles } from "../../../types/templateStyles";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ApplyToAllSites from "./ApplyToAllSites";
import ThreeDToggle from "./ThreeD/ThreeDToggle";

interface ThemePropertiesProps {
  templateStyles: TemplateStyles;
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
  applyToAllSites: (property: keyof TemplateStyles, value: any) => void;
}

const ThemeProperties: React.FC<ThemePropertiesProps> = ({ 
  templateStyles, 
  updateTemplateStyles,
  applyToAllSites
}) => {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Theme Settings</h3>
        <p className="text-xs text-editor-muted mb-4">
          Configure global theme settings that apply across all templates.
        </p>
      </div>
      
      <div className="space-y-4 border-t border-editor-border pt-4">
        <ThreeDToggle 
          enabled={templateStyles.enable3D} 
          onChange={(enabled) => updateTemplateStyles('enable3D', enabled)}
        />
      </div>
      
      <ApplyToAllSites
        property="enable3D"
        value={templateStyles.enable3D}
        onApply={applyToAllSites}
      />
    </div>
  );
};

export default ThemeProperties;
