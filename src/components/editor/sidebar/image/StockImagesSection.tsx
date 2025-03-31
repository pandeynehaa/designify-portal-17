
import React, { useState, DragEvent } from "react";
import { ChevronDown, ChevronRight, Image } from "lucide-react";

const StockImagesSection: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  
  // Sample images for the Images tab
  const sampleImages = [
    { id: "img1", url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300", label: "Woman with Laptop" },
    { id: "img2", url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300", label: "Laptop Screen" },
    { id: "img3", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300", label: "Circuit Board" },
    { id: "img4", url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300", label: "Code Screen" },
    { id: "img5", url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300", label: "MacBook User" },
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
          <Image size={14} className="mr-2" />
          <span>Stock Images</span>
        </div>
        {expanded ? (
          <ChevronDown size={14} />
        ) : (
          <ChevronRight size={14} />
        )}
      </button>
      
      {expanded && (
        <div className="grid grid-cols-2 gap-2 mt-2 px-2">
          {sampleImages.map((image) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default StockImagesSection;
