
import React from "react";

interface LayoutTabProps {
  previewData: any;
}

const LayoutTab: React.FC<LayoutTabProps> = ({ previewData }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-xs text-editor-muted mb-2">Spacing Guidelines</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-editor-text">Base Spacing:</span>
              <span className="text-xs font-medium text-editor-text">{previewData.raw.spacing.base}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-editor-text">Section Spacing:</span>
              <span className="text-xs font-medium text-editor-text">{previewData.raw.spacing.section}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-editor-text">Grid Gap:</span>
              <span className="text-xs font-medium text-editor-text">{previewData.raw.spacing.gridGap}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-xs text-editor-muted mb-2">Spacing Visualization</div>
            <div className="bg-editor-surface border border-editor-border rounded-md p-3">
              <div className="bg-editor-highlight p-2 rounded-md mb-2" style={{ marginBottom: previewData.raw.spacing.base }}>
                <div className="text-xs text-editor-text">Base Spacing</div>
              </div>
              <div className="bg-editor-highlight p-2 rounded-md" style={{ marginBottom: previewData.raw.spacing.section }}>
                <div className="text-xs text-editor-text">Section Spacing</div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-editor-muted mb-2">Grid Example</div>
          <div className="bg-editor-surface border border-editor-border rounded-md p-3">
            <div className="grid grid-cols-2 gap-2" style={{ gap: previewData.raw.spacing.gridGap }}>
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="aspect-video flex items-center justify-center"
                  style={{ 
                    backgroundColor: previewData.raw.colors.primary,
                    borderRadius: previewData.raw.borderRadius
                  }}
                >
                  <span className="text-white text-xs">Grid Item {i}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-xs text-editor-muted mb-2">Border Radius</div>
            <div className="bg-editor-surface border border-editor-border rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-editor-text">Border Radius:</span>
                <span className="text-xs font-medium text-editor-text">{previewData.raw.borderRadius}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div 
                  className="aspect-square bg-editor-highlight flex items-center justify-center" 
                  style={{ borderRadius: previewData.raw.borderRadius }}
                >
                  <span className="text-xs text-editor-text">Small</span>
                </div>
                <div 
                  className="aspect-square bg-editor-highlight flex items-center justify-center" 
                  style={{ borderRadius: previewData.raw.borderRadius }}
                >
                  <span className="text-xs text-editor-text">Medium</span>
                </div>
                <div 
                  className="aspect-square bg-editor-highlight flex items-center justify-center" 
                  style={{ borderRadius: previewData.raw.borderRadius }}
                >
                  <span className="text-xs text-editor-text">Large</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutTab;
