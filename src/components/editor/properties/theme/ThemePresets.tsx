
import React from "react";
import { Button } from "@/components/ui/button";
import { TemplateStyles } from "@/types/templateStyles";
import { applyPresetTheme, applyPresetThemeToAllSites } from "@/utils/themePresets";

interface ThemePresetsProps {
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
  applyToAllSites: (property: keyof TemplateStyles, value: any) => void;
}

const ThemePresets: React.FC<ThemePresetsProps> = ({ 
  updateTemplateStyles, 
  applyToAllSites 
}) => {
  return (
    <>
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Theme Presets</label>
        <div className="space-y-2">
          <Button 
            variant="secondary" 
            className="w-full text-xs"
            onClick={() => applyPresetTheme('default', updateTemplateStyles)}
          >
            <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-1.5"></div>
            Default Theme
          </Button>
          <Button 
            variant="secondary" 
            className="w-full text-xs"
            onClick={() => applyPresetTheme('dark', updateTemplateStyles)}
          >
            <div className="w-3 h-3 rounded-full bg-[#111111] mr-1.5"></div>
            Dark Theme
          </Button>
          <Button 
            variant="secondary" 
            className="w-full text-xs"
            onClick={() => applyPresetTheme('light', updateTemplateStyles)}
          >
            <div className="w-3 h-3 rounded-full bg-[#F5F5F5] mr-1.5"></div>
            Light Theme
          </Button>
          <Button 
            variant="secondary" 
            className="w-full text-xs"
            onClick={() => applyPresetTheme('colorful', updateTemplateStyles)}
          >
            <div className="w-3 h-3 rounded-full bg-[#864879] mr-1.5"></div>
            Colorful Theme
          </Button>
        </div>
      </div>

      <div className="border-t border-editor-border pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-editor-muted">Apply Preset to All Sites</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs border-cv-purple text-cv-purple hover:bg-cv-purple hover:text-white"
            onClick={() => applyPresetThemeToAllSites('default', applyToAllSites)}
          >
            Default Theme
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs border-cv-purple text-cv-purple hover:bg-cv-purple hover:text-white"
            onClick={() => applyPresetThemeToAllSites('dark', applyToAllSites)}
          >
            Dark Theme
          </Button>
        </div>
      </div>
    </>
  );
};

export default ThemePresets;
