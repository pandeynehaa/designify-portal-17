
import React from "react";

interface ColorsTabProps {
  previewData: any;
}

const ColorsTab: React.FC<ColorsTabProps> = ({ previewData }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-xs text-editor-muted mb-2">Color Palette</div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div 
              className="w-full aspect-square rounded-md" 
              style={{ backgroundColor: previewData.raw.colors.primary }}
              title="Primary"
            ></div>
            <div 
              className="w-full aspect-square rounded-md" 
              style={{ backgroundColor: previewData.raw.colors.secondary }}
              title="Secondary"
            ></div>
            <div 
              className="w-full aspect-square rounded-md" 
              style={{ backgroundColor: previewData.raw.colors.accent }}
              title="Accent"
            ></div>
            <div 
              className="w-full aspect-square rounded-md" 
              style={{ backgroundColor: previewData.raw.colors.border }}
              title="Border"
            ></div>
          </div>
          
          <div className="text-xs text-editor-muted mb-2">Background Colors</div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <div className="text-xs text-editor-muted mb-1">Dark</div>
              <div 
                className="w-full h-8 rounded-md" 
                style={{ backgroundColor: previewData.raw.colors.background.dark }}
              ></div>
            </div>
            <div>
              <div className="text-xs text-editor-muted mb-1">Light</div>
              <div 
                className="w-full h-8 rounded-md" 
                style={{ backgroundColor: previewData.raw.colors.background.light }}
              ></div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-editor-muted mb-2">Text Colors</div>
          <div className="space-y-3 mb-4">
            <div>
              <div className="text-xs text-editor-muted mb-1">Heading</div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-md" 
                  style={{ backgroundColor: previewData.raw.colors.text.heading }}
                ></div>
                <span className="text-xs text-editor-text">
                  {previewData.raw.colors.text.heading}
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-editor-muted mb-1">Body</div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-md" 
                  style={{ backgroundColor: previewData.raw.colors.text.body }}
                ></div>
                <span className="text-xs text-editor-text">
                  {previewData.raw.colors.text.body}
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-editor-muted mb-1">Button</div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-md" 
                  style={{ backgroundColor: previewData.raw.colors.text.button }}
                ></div>
                <span className="text-xs text-editor-text">
                  {previewData.raw.colors.text.button}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-editor-muted mb-2">Button Colors</div>
          <div className="space-y-2">
            <button 
              className="w-full py-2 px-4 text-white text-sm font-medium" 
              style={{ 
                backgroundColor: previewData.raw.colors.primary,
                borderRadius: previewData.raw.buttons.borderRadius,
                padding: previewData.raw.buttons.padding
              }}
            >
              Primary Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorsTab;
