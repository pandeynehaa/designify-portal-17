
import React, { useState, DragEvent } from "react";
import { ChevronDown, ChevronRight, Upload } from "lucide-react";

const UploadedImagesSection: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  
  // Sample uploaded images (could be stored in local storage or fetched from an API)
  const uploadedImages = [
    { id: "uploaded1", url: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300", label: "Uploaded Image 1" },
  ];

  // Handle dragging of images
  const handleImageDragStart = (e: DragEvent<HTMLDivElement>, image: any) => {
    e.dataTransfer.setData("application/image", JSON.stringify(image));
    e.dataTransfer.effectAllowed = "copy";
    
    // Show visual feedback
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.zIndex = '50';
    }
    
    // Reset the drop overlay after dragging ends
    const resetOverlay = () => {
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.zIndex = '0';
      }
      window.removeEventListener('dragend', resetOverlay);
    };
    
    window.addEventListener('dragend', resetOverlay);
  };

  return (
    <div className="image-section">
      <button 
        className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-cv-white hover:bg-cv-gray"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <Upload size={14} className="mr-2" />
          <span>Uploaded Images</span>
        </div>
        {expanded ? (
          <ChevronDown size={14} />
        ) : (
          <ChevronRight size={14} />
        )}
      </button>
      
      {expanded && (
        <div className="grid grid-cols-2 gap-2 mt-2 px-2">
          {uploadedImages.length > 0 ? (
            uploadedImages.map((image) => (
              <div 
                key={image.id}
                className="cursor-grab relative group"
                draggable
                onDragStart={(e) => handleImageDragStart(e, image)}
              >
                <img 
                  src={image.url} 
                  alt={image.label} 
                  className="w-full h-20 object-cover rounded-md border border-cv-lightgray group-hover:border-cv-accent transition-colors"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-md transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-xs text-white font-medium px-2 py-1 rounded bg-black/70">Drag me</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-4 text-cv-white/50 text-sm">
              No uploaded images yet
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadedImagesSection;
