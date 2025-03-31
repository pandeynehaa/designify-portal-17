
import React from "react";
import { TemplateStyles } from "../../../types/templateStyles";
import ApplyToAllSites from "./ApplyToAllSites";
import ThemePresets from "./theme/ThemePresets";
import ThemeActions from "./theme/ThemeActions";
import ThemePreview from "./theme/ThemePreview";

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
      <ThemePresets 
        updateTemplateStyles={updateTemplateStyles} 
        applyToAllSites={applyToAllSites} 
      />
      
      <ThemePreview templateStyles={templateStyles} />
      
      <ThemeActions />

      {/* Add ApplyToAllSites component for individual properties */}
      <ApplyToAllSites
        property="accentColor"
        value={templateStyles.accentColor}
        onApply={applyToAllSites}
      />
    </div>
  );
};

export default ThemeProperties;
