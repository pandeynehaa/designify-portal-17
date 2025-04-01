
import React from "react";

interface AssetsTabProps {
  previewData: any;
}

const AssetsTab: React.FC<AssetsTabProps> = ({ previewData }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <div className="text-xs text-editor-muted mb-2">Logo</div>
          <div className="bg-editor-surface border border-editor-border rounded-md p-3 mb-4">
            <img 
              src={previewData.raw.logo} 
              alt="Extracted Logo" 
              className="max-h-16 max-w-full mx-auto"
            />
          </div>
          
          <div className="text-xs text-editor-muted mb-2">Extracted Images</div>
          <div className="grid grid-cols-3 gap-3">
            {previewData.raw.images.map((image: string, index: number) => (
              <div key={index} className="bg-editor-surface border border-editor-border rounded-md p-2">
                <img 
                  src={image} 
                  alt={`Extracted Image ${index + 1}`} 
                  className="w-full h-auto rounded-md"
                />
                <div className="text-xs text-editor-muted text-center mt-2">Image {index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsTab;
