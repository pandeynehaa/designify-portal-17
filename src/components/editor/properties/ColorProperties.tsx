
import React from "react";
import { TemplateStyles } from "../../../types/templateStyles";
import { Button } from "../../ui/button";

interface ColorPropertiesProps {
  templateStyles: TemplateStyles;
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
}

const ColorProperties: React.FC<ColorPropertiesProps> = ({ templateStyles, updateTemplateStyles }) => {
  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Background Colors</label>
        
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-editor-muted mb-1">Header Background</label>
            <input 
              type="color" 
              value={templateStyles.headerBg}
              onChange={(e) => updateTemplateStyles('headerBg', e.target.value)}
              className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
            />
          </div>
          
          <div>
            <label className="block text-xs text-editor-muted mb-1">Content Background</label>
            <input 
              type="color" 
              value={templateStyles.collectionBg}
              onChange={(e) => updateTemplateStyles('collectionBg', e.target.value)}
              className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
            />
          </div>
          
          <div>
            <label className="block text-xs text-editor-muted mb-1">Card Background</label>
            <input 
              type="color" 
              value={templateStyles.cardBg}
              onChange={(e) => updateTemplateStyles('cardBg', e.target.value)}
              className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
            />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Brand Colors</label>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-editor-muted mb-1">Accent Color</label>
            <div className="flex items-center">
              <input 
                type="color" 
                value={templateStyles.accentColor}
                onChange={(e) => updateTemplateStyles('accentColor', e.target.value)}
                className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-editor-muted mb-1">Button Color</label>
            <div className="flex items-center">
              <input 
                type="color" 
                value={templateStyles.buttonBg}
                onChange={(e) => updateTemplateStyles('buttonBg', e.target.value)}
                className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-editor-muted mb-1">Border Color</label>
            <div className="flex items-center">
              <input 
                type="color" 
                value={templateStyles.borderColor}
                onChange={(e) => updateTemplateStyles('borderColor', e.target.value)}
                className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            className="w-full justify-center text-xs" 
            variant="secondary"
            onClick={() => {
              updateTemplateStyles('accentColor', '#9b87f5');
              updateTemplateStyles('buttonBg', '#9b87f5');
            }}
          >
            Reset to Default Colors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ColorProperties;
