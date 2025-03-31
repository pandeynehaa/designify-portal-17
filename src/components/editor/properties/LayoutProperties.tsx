import React from "react";
import { TemplateStyles } from "../../../types/templateStyles";

interface LayoutPropertiesProps {
  templateStyles: TemplateStyles;
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
}

const LayoutProperties: React.FC<LayoutPropertiesProps> = ({ templateStyles, updateTemplateStyles }) => {
  const handleHeightChange = (section: 'headerHeight' | 'bannerHeight', value: string) => {
    updateTemplateStyles(section, value);
  };
  
  const handleGridColumnsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTemplateStyles('gridColumns', parseInt(e.target.value));
  };
  
  const handleBorderRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTemplateStyles('buttonRadius', e.target.value);
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Section Heights</label>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-editor-muted">Header Height</label>
            <select 
              className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
              value={templateStyles.headerHeight}
              onChange={(e) => handleHeightChange('headerHeight', e.target.value)}
            >
              <option value="3rem">Small (48px)</option>
              <option value="4rem">Medium (64px)</option>
              <option value="5rem">Large (80px)</option>
              <option value="6rem">Extra Large (96px)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-editor-muted">Banner Height</label>
            <select 
              className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
              value={templateStyles.bannerHeight}
              onChange={(e) => handleHeightChange('bannerHeight', e.target.value)}
            >
              <option value="12rem">Small (192px)</option>
              <option value="16rem">Medium (256px)</option>
              <option value="20rem">Large (320px)</option>
              <option value="24rem">Extra Large (384px)</option>
              <option value="30rem">Hero (480px)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Grid Layout</label>
        <div>
          <label className="block text-xs text-editor-muted">Columns</label>
          <select 
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
            value={templateStyles.gridColumns}
            onChange={handleGridColumnsChange}
          >
            <option value="1">1 Column</option>
            <option value="2">2 Columns</option>
            <option value="3">3 Columns</option>
            <option value="4">4 Columns</option>
            <option value="5">5 Columns</option>
            <option value="6">6 Columns</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Border Radius</label>
        <select 
          className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          value={templateStyles.buttonRadius}
          onChange={handleBorderRadiusChange}
        >
          <option value="0">None (0px)</option>
          <option value="0.25rem">Extra Small (4px)</option>
          <option value="0.5rem">Small (8px)</option>
          <option value="0.75rem">Medium (12px)</option>
          <option value="1rem">Large (16px)</option>
          <option value="1.5rem">Extra Large (24px)</option>
          <option value="9999px">Full (Rounded)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Spacing</label>
        <select 
          className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          value={templateStyles.spacing}
          onChange={(e) => updateTemplateStyles('spacing', e.target.value)}
        >
          <option value="0.5rem">Extra Small (8px)</option>
          <option value="1rem">Small (16px)</option>
          <option value="1.5rem">Medium (24px)</option>
          <option value="2rem">Large (32px)</option>
          <option value="2.5rem">Extra Large (40px)</option>
        </select>
      </div>
    </div>
  );
};

export default LayoutProperties;
