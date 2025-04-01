
import React from "react";

interface TypographyTabProps {
  previewData: any;
}

const TypographyTab: React.FC<TypographyTabProps> = ({ previewData }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-xs text-editor-muted mb-2">Heading Typography</div>
          <div className="p-3 bg-editor-surface border border-editor-border rounded-md mb-4">
            <div className="text-xs text-editor-muted mb-2 flex flex-wrap">
              <span className="mr-4">Font: <strong>{previewData.raw.typography.heading.fontFamily}</strong></span>
              <span className="mr-4">Size: <strong>{previewData.raw.typography.heading.size}</strong></span>
              <span className="mr-4">Weight: <strong>{previewData.raw.typography.heading.weight}</strong></span>
              <span className="mr-4">Transform: <strong>{previewData.raw.typography.heading.transform}</strong></span>
            </div>
            <div 
              style={{ 
                fontFamily: previewData.raw.typography.heading.fontFamily,
                fontSize: previewData.raw.typography.heading.size,
                fontWeight: previewData.raw.typography.heading.weight,
                lineHeight: previewData.raw.typography.heading.lineHeight,
                letterSpacing: previewData.raw.typography.heading.letterSpacing,
                textTransform: previewData.raw.typography.heading.transform as any,
                fontStyle: previewData.raw.typography.heading.style,
                color: previewData.raw.colors.text.heading
              }}
            >
              Heading Example
            </div>
          </div>
          
          <div className="text-xs text-editor-muted mb-2">Body Typography</div>
          <div className="p-3 bg-editor-surface border border-editor-border rounded-md">
            <div className="text-xs text-editor-muted mb-2 flex flex-wrap">
              <span className="mr-4">Font: <strong>{previewData.raw.typography.body.fontFamily}</strong></span>
              <span className="mr-4">Size: <strong>{previewData.raw.typography.body.size}</strong></span>
              <span className="mr-4">Weight: <strong>{previewData.raw.typography.body.weight}</strong></span>
            </div>
            <div 
              style={{ 
                fontFamily: previewData.raw.typography.body.fontFamily,
                fontSize: previewData.raw.typography.body.size,
                fontWeight: previewData.raw.typography.body.weight,
                lineHeight: previewData.raw.typography.body.lineHeight,
                letterSpacing: previewData.raw.typography.body.letterSpacing,
                color: previewData.raw.colors.text.body
              }}
            >
              This is an example of body text using the extracted font settings. The text should reflect the font family, size, weight and other typography settings found on the website.
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-editor-muted mb-2">Button Typography</div>
          <div className="mb-4">
            <div className="text-xs text-editor-muted mb-2 flex flex-wrap">
              <span className="mr-4">Font: <strong>{previewData.raw.typography.button.fontFamily}</strong></span>
              <span className="mr-4">Size: <strong>{previewData.raw.typography.button.size}</strong></span>
              <span className="mr-4">Weight: <strong>{previewData.raw.typography.button.weight}</strong></span>
              <span className="mr-4">Transform: <strong>{previewData.raw.typography.button.transform}</strong></span>
            </div>
            <button 
              className="py-2 px-4 rounded-md text-white mb-4" 
              style={{ 
                backgroundColor: previewData.raw.colors.primary,
                fontFamily: previewData.raw.typography.button.fontFamily,
                fontSize: previewData.raw.typography.button.size,
                fontWeight: previewData.raw.typography.button.weight,
                textTransform: previewData.raw.typography.button.transform as any,
                borderRadius: previewData.raw.buttons.borderRadius,
                padding: previewData.raw.buttons.padding
              }}
            >
              Button Example
            </button>
          </div>
          
          <div className="text-xs text-editor-muted mb-2">Typography Preview</div>
          <div 
            className="p-4 rounded-md"
            style={{ backgroundColor: previewData.raw.colors.background.dark }}
          >
            <div 
              style={{ 
                fontFamily: previewData.raw.typography.heading.fontFamily,
                fontSize: previewData.raw.typography.heading.size,
                fontWeight: previewData.raw.typography.heading.weight,
                lineHeight: previewData.raw.typography.heading.lineHeight,
                letterSpacing: previewData.raw.typography.heading.letterSpacing,
                textTransform: previewData.raw.typography.heading.transform as any,
                fontStyle: previewData.raw.typography.heading.style,
                color: previewData.raw.colors.text.heading,
                marginBottom: previewData.raw.spacing.base
              }}
            >
              Sample Header
            </div>
            <div 
              style={{ 
                fontFamily: previewData.raw.typography.body.fontFamily,
                fontSize: previewData.raw.typography.body.size,
                fontWeight: previewData.raw.typography.body.weight,
                lineHeight: previewData.raw.typography.body.lineHeight,
                letterSpacing: previewData.raw.typography.body.letterSpacing,
                color: previewData.raw.colors.text.body,
                marginBottom: previewData.raw.spacing.base
              }}
            >
              This is a preview of how text might appear on the website with the extracted font settings applied.
            </div>
            <button 
              style={{ 
                backgroundColor: previewData.raw.colors.primary,
                fontFamily: previewData.raw.typography.button.fontFamily,
                fontSize: previewData.raw.typography.button.size,
                fontWeight: previewData.raw.typography.button.weight,
                textTransform: previewData.raw.typography.button.transform as any,
                color: previewData.raw.colors.text.button,
                borderRadius: previewData.raw.buttons.borderRadius,
                padding: previewData.raw.buttons.padding
              }}
            >
              Click Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographyTab;
