
import React from "react";
import { Eye } from "lucide-react";
import { Button } from "../../ui/button";
import { TemplateStyles } from "../../../types/templateStyles";
import { toast } from "@/hooks/use-toast"; 

interface ThemePropertiesProps {
  templateStyles: TemplateStyles;
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
}

const ThemeProperties: React.FC<ThemePropertiesProps> = ({ templateStyles, updateTemplateStyles }) => {
  const applyPresetTheme = (theme: 'default' | 'dark' | 'light' | 'colorful') => {
    switch (theme) {
      case 'default':
        updateTemplateStyles('accentColor', '#9b87f5');
        updateTemplateStyles('buttonBg', '#9b87f5');
        updateTemplateStyles('headerBg', '#18181E');
        updateTemplateStyles('collectionBg', '#18181E');
        updateTemplateStyles('cardBg', '#232329');
        updateTemplateStyles('headerTextColor', 'white');
        updateTemplateStyles('bannerTextColor', 'white');
        updateTemplateStyles('collectionTextColor', 'white');
        updateTemplateStyles('cardTextColor', 'white');
        updateTemplateStyles('buttonTextColor', 'white');
        break;
      case 'dark':
        updateTemplateStyles('accentColor', '#7E69AB');
        updateTemplateStyles('buttonBg', '#7E69AB');
        updateTemplateStyles('headerBg', '#111111');
        updateTemplateStyles('collectionBg', '#111111');
        updateTemplateStyles('cardBg', '#1A1A1A');
        updateTemplateStyles('headerTextColor', '#CCCCCC');
        updateTemplateStyles('bannerTextColor', '#CCCCCC');
        updateTemplateStyles('collectionTextColor', '#CCCCCC');
        updateTemplateStyles('cardTextColor', '#CCCCCC');
        updateTemplateStyles('buttonTextColor', '#FFFFFF');
        break;
      case 'light':
        updateTemplateStyles('accentColor', '#b6a8f8');
        updateTemplateStyles('buttonBg', '#b6a8f8');
        updateTemplateStyles('headerBg', '#FFFFFF');
        updateTemplateStyles('collectionBg', '#F5F5F5');
        updateTemplateStyles('cardBg', '#FFFFFF');
        updateTemplateStyles('headerTextColor', '#333333');
        updateTemplateStyles('bannerTextColor', '#333333');
        updateTemplateStyles('collectionTextColor', '#333333');
        updateTemplateStyles('cardTextColor', '#333333');
        updateTemplateStyles('buttonTextColor', '#FFFFFF');
        break;
      case 'colorful':
        updateTemplateStyles('accentColor', '#b6a8f8');
        updateTemplateStyles('buttonBg', '#9b87f5');
        updateTemplateStyles('headerBg', '#1F1D36');
        updateTemplateStyles('collectionBg', '#3F3351');
        updateTemplateStyles('cardBg', '#864879');
        updateTemplateStyles('headerTextColor', '#FFFFFF');
        updateTemplateStyles('bannerTextColor', '#FFFFFF');
        updateTemplateStyles('collectionTextColor', '#FFFFFF');
        updateTemplateStyles('cardTextColor', '#FFFFFF');
        updateTemplateStyles('buttonTextColor', '#FFFFFF');
        break;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Theme Presets</label>
        <div className="space-y-2">
          <Button 
            variant="secondary" 
            className="w-full text-xs"
            onClick={() => applyPresetTheme('default')}
          >
            <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-1.5"></div>
            Default Theme
          </Button>
          <Button 
            variant="secondary" 
            className="w-full text-xs"
            onClick={() => applyPresetTheme('dark')}
          >
            <div className="w-3 h-3 rounded-full bg-[#111111] mr-1.5"></div>
            Dark Theme
          </Button>
          <Button 
            variant="secondary" 
            className="w-full text-xs"
            onClick={() => applyPresetTheme('light')}
          >
            <div className="w-3 h-3 rounded-full bg-[#F5F5F5] mr-1.5"></div>
            Light Theme
          </Button>
          <Button 
            variant="secondary" 
            className="w-full text-xs"
            onClick={() => applyPresetTheme('colorful')}
          >
            <div className="w-3 h-3 rounded-full bg-[#864879] mr-1.5"></div>
            Colorful Theme
          </Button>
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Current Theme Colors</label>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="w-8 h-8 rounded-md" style={{ backgroundColor: templateStyles.accentColor }}></div>
          <div className="w-8 h-8 rounded-md" style={{ backgroundColor: templateStyles.buttonBg }}></div>
          <div className="w-8 h-8 rounded-md" style={{ backgroundColor: templateStyles.headerBg }}></div>
          <div className="w-8 h-8 rounded-md" style={{ backgroundColor: templateStyles.cardBg }}></div>
        </div>
      </div>
      
      <div>
        <Button 
          className="w-full bg-cv-purple hover:bg-cv-purple/90 text-white"
          onClick={() => {
            toast({
              title: "Theme Saved",
              description: "Your custom theme has been saved to your library."
            });
          }}
        >
          Save Theme to Library
        </Button>
      </div>
      
      <div>
        <Button 
          variant="outline" 
          className="w-full border-cv-purple text-cv-purple hover:bg-cv-purple hover:text-white"
          onClick={() => {
            toast({
              title: "Theme Exported",
              description: "Your theme settings have been exported to a file."
            });
          }}
        >
          Export Theme Settings
        </Button>
      </div>
      
      <div className="border-t border-editor-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-editor-muted">Apply Theme to All Pages</span>
          <button className="p-1 rounded-md bg-editor-surface hover:bg-editor-highlight transition-colors">
            <Eye size={16} className="text-editor-text" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeProperties;
