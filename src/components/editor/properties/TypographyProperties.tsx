import React from "react";
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react";
import { TemplateStyles } from "../../../types/templateStyles";
import ApplyToAllSites from "./ApplyToAllSites";

interface TypographyPropertiesProps {
  templateStyles: TemplateStyles;
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
  applyToAllSites: (property: keyof TemplateStyles, value: any) => void;
}

const TypographyProperties: React.FC<TypographyPropertiesProps> = ({ 
  templateStyles, 
  updateTemplateStyles,
  applyToAllSites
}) => {
  const fonts = [
    { value: "font-display", label: "Bebas Neue (Display)" },
    { value: "font-sans", label: "Gravity (Sans)" },
    { value: "font-serif", label: "Serif" },
    { value: "font-mono", label: "Monospace" }
  ];

  const handleHeadingFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTemplateStyles('headingFont', e.target.value);
  };

  const handleBodyFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTemplateStyles('bodyFont', e.target.value);
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Heading Font</label>
        <div className="flex">
          <select 
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
            value={templateStyles.headingFont}
            onChange={handleHeadingFontChange}
          >
            {fonts.map(font => (
              <option key={font.value} value={font.value}>{font.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Body Font</label>
        <div className="flex">
          <select 
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
            value={templateStyles.bodyFont}
            onChange={handleBodyFontChange}
          >
            {fonts.map(font => (
              <option key={font.value} value={font.value}>{font.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-editor-muted mb-1.5">Text Colors</label>
          
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-editor-muted mb-1">Header Text</label>
              <input 
                type="color" 
                value={templateStyles.headerTextColor}
                onChange={(e) => updateTemplateStyles('headerTextColor', e.target.value)}
                className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
            
            <div>
              <label className="block text-xs text-editor-muted mb-1">Banner Text</label>
              <input 
                type="color" 
                value={templateStyles.bannerTextColor}
                onChange={(e) => updateTemplateStyles('bannerTextColor', e.target.value)}
                className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
            
            <div>
              <label className="block text-xs text-editor-muted mb-1">Content Text</label>
              <input 
                type="color" 
                value={templateStyles.collectionTextColor}
                onChange={(e) => updateTemplateStyles('collectionTextColor', e.target.value)}
                className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
            
            <div>
              <label className="block text-xs text-editor-muted mb-1">Card Text</label>
              <input 
                type="color" 
                value={templateStyles.cardTextColor}
                onChange={(e) => updateTemplateStyles('cardTextColor', e.target.value)}
                className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
            
            <div>
              <label className="block text-xs text-editor-muted mb-1">Button Text</label>
              <input 
                type="color" 
                value={templateStyles.buttonTextColor}
                onChange={(e) => updateTemplateStyles('buttonTextColor', e.target.value)}
                className="w-full h-8 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Font Style</label>
        <div className="flex space-x-2">
          <button className="flex-1 bg-editor-highlight p-2 rounded-md flex items-center justify-center">
            <Bold size={16} className="text-editor-text" />
          </button>
          <button className="flex-1 bg-editor-surface p-2 rounded-md flex items-center justify-center">
            <Italic size={16} className="text-editor-text" />
          </button>
          <button className="flex-1 bg-editor-surface p-2 rounded-md flex items-center justify-center">
            <Underline size={16} className="text-editor-text" />
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Alignment</label>
        <div className="flex space-x-2">
          <button className="flex-1 bg-editor-highlight p-2 rounded-md flex items-center justify-center">
            <AlignLeft size={16} className="text-editor-text" />
          </button>
          <button className="flex-1 bg-editor-surface p-2 rounded-md flex items-center justify-center">
            <AlignCenter size={16} className="text-editor-text" />
          </button>
          <button className="flex-1 bg-editor-surface p-2 rounded-md flex items-center justify-center">
            <AlignRight size={16} className="text-editor-text" />
          </button>
        </div>
      </div>

      <ApplyToAllSites
        property="headingFont"
        value={templateStyles.headingFont}
        onApply={applyToAllSites}
      />
      
      <ApplyToAllSites
        property="bodyFont"
        value={templateStyles.bodyFont}
        onApply={applyToAllSites}
      />
    </div>
  );
};

export default TypographyProperties;
