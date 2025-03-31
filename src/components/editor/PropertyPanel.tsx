import React from "react";
import { X, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, ChevronDown, Eye, EyeOff } from "lucide-react";
import { TemplateStyles } from "../../pages/DesignEditor";
import { Button } from "../ui/button";

interface PropertyPanelProps {
  activeTab: string;
  onClose: () => void;
  templateStyles: TemplateStyles;
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ 
  activeTab, 
  onClose, 
  templateStyles, 
  updateTemplateStyles 
}) => {
  return (
    <div className="editor-panel w-72 flex flex-col h-full">
      <div className="editor-toolbar justify-between">
        <span className="text-editor-text text-sm font-medium capitalize">{activeTab} Properties</span>
        <button className="editor-button p-1.5" onClick={onClose}>
          <X size={14} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {activeTab === "typography" && (
          <TypographyProperties 
            templateStyles={templateStyles} 
            updateTemplateStyles={updateTemplateStyles} 
          />
        )}
        {activeTab === "colors" && (
          <ColorProperties 
            templateStyles={templateStyles} 
            updateTemplateStyles={updateTemplateStyles} 
          />
        )}
        {activeTab === "images" && <ImageProperties />}
        {activeTab === "layout" && (
          <LayoutProperties 
            templateStyles={templateStyles} 
            updateTemplateStyles={updateTemplateStyles} 
          />
        )}
        {activeTab === "effects" && <EffectsProperties />}
        {activeTab === "theme" && (
          <ThemeProperties 
            templateStyles={templateStyles} 
            updateTemplateStyles={updateTemplateStyles} 
          />
        )}
      </div>
    </div>
  );
};

interface StylePropertyProps {
  templateStyles: TemplateStyles;
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
}

const TypographyProperties: React.FC<StylePropertyProps> = ({ templateStyles, updateTemplateStyles }) => {
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
    </div>
  );
};

const ColorProperties: React.FC<StylePropertyProps> = ({ templateStyles, updateTemplateStyles }) => {
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

const ImageProperties: React.FC = () => (
  <div className="p-4 space-y-4">
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Image Source</label>
      <div className="flex">
        <input
          type="text"
          value="assets/image.jpg"
          className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          placeholder="URL or file path"
        />
      </div>
      <div className="mt-2 flex space-x-2">
        <button className="editor-button flex-1 justify-center text-xs">
          Replace
        </button>
        <button className="editor-button flex-1 justify-center text-xs">
          Upload
        </button>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Dimensions</label>
      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-xs text-editor-muted">Width</label>
          <input
            type="text"
            value="300"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-editor-muted">Height</label>
          <input
            type="text"
            value="200"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          />
        </div>
      </div>
      <div className="mt-2">
        <label className="inline-flex items-center">
          <input type="checkbox" className="bg-editor-surface border-editor-border rounded mr-2" checked />
          <span className="text-xs text-editor-text">Maintain aspect ratio</span>
        </label>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Image Effects</label>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-editor-text">Opacity</span>
          <div className="w-24 bg-editor-surface h-1 rounded-full">
            <div className="bg-blue-500 h-1 rounded-full w-3/4"></div>
          </div>
          <input
            type="text"
            value="75%"
            className="w-12 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1 text-center"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-editor-text">Blur</span>
          <div className="w-24 bg-editor-surface h-1 rounded-full">
            <div className="bg-blue-500 h-1 rounded-full w-1/4"></div>
          </div>
          <input
            type="text"
            value="2px"
            className="w-12 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1 text-center"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-editor-text">Brightness</span>
          <div className="w-24 bg-editor-surface h-1 rounded-full">
            <div className="bg-blue-500 h-1 rounded-full w-1/2"></div>
          </div>
          <input
            type="text"
            value="100%"
            className="w-12 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1 text-center"
          />
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Border Radius</label>
      <input
        type="text"
        value="8px"
        className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
      />
    </div>
  </div>
);

const LayoutProperties: React.FC<StylePropertyProps> = ({ templateStyles, updateTemplateStyles }) => {
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

const EffectsProperties: React.FC = () => (
  <div className="p-4 space-y-4">
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Shadow</label>
      <div className="flex space-x-2 mb-2">
        <select className="flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
          <option>Custom</option>
        </select>
        <button className="bg-editor-surface border border-editor-border rounded-md px-3 py-2">
          <ChevronDown size={14} className="text-editor-text" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-editor-muted">X Offset</label>
          <input
            type="text"
            value="0px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Y Offset</label>
          <input
            type="text"
            value="4px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Blur</label>
          <input
            type="text"
            value="8px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Spread</label>
          <input
            type="text"
            value="0px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
      </div>
      <div className="mt-2">
        <label className="block text-xs text-editor-muted mb-1">Color</label>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md bg-black/20 border border-editor-border"></div>
          <input
            type="text"
            value="rgba(0,0,0,0.2)"
            className="ml-2 flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-1"
          />
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Opacity</label>
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-editor-surface h-1 rounded-full">
          <div className="bg-blue-500 h-1 rounded-full w-full"></div>
        </div>
        <input
          type="text"
          value="100%"
          className="w-16 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1 text-center"
        />
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Blur</label>
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-editor-surface h-1 rounded-full">
          <div className="bg-blue-500 h-1 rounded-full w-0"></div>
        </div>
        <input
          type="text"
          value="0px"
          className="w-16 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1 text-center"
        />
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Blend Mode</label>
      <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
        <option>Normal</option>
        <option>Multiply</option>
        <option>Screen</option>
        <option>Overlay</option>
        <option>Darken</option>
        <option>Lighten</option>
      </select>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Transforms</label>
      <button className="editor-button w-full justify-center text-xs mb-2">
        Add Transform
      </button>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-editor-surface rounded-md">
          <span className="text-xs text-editor-text">Rotate: 0°</span>
          <X size={12} className="text-editor-muted cursor-pointer" />
        </div>
        <div className="flex items-center justify-between p-2 bg-editor-surface rounded-md">
          <span className="text-xs text-editor-text">Scale: 1</span>
          <X size={12} className="text-editor-muted cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
);

const ThemeProperties: React.FC<StylePropertyProps> = ({ templateStyles, updateTemplateStyles }) => {
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

export default PropertyPanel;
