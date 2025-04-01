
import React from "react";

interface UploadedImagesSectionProps {
  extractedImages?: string[];
}

const UploadedImagesSection: React.FC<UploadedImagesSectionProps> = ({ extractedImages = [] }) => {
  // Sample uploaded images (in a real app, these would come from state/context)
  const uploadedImages = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];
  
  // Combine uploaded and extracted images
  const allImages = [...uploadedImages, ...extractedImages];
  
  return (
    <div className="mt-4">
      <h3 className="text-xs text-editor-text font-medium mb-2">Uploaded Images</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {allImages.map((image, index) => (
          <div 
            key={index}
            className="aspect-square bg-editor-surface rounded-md overflow-hidden border border-editor-border cursor-grab hover:border-editor-highlight transition-colors"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", "image");
              e.dataTransfer.setData("application/json", JSON.stringify({
                type: "image",
                src: image
              }));
            }}
          >
            <img 
              src={image} 
              alt={`Uploaded image ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedImagesSection;
