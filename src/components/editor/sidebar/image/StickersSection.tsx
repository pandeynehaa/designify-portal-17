
import React, { useState, DragEvent } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import StickerPacks from "./StickerPacks";

interface StickersSectionProps {
  // We can add props in the future if needed
}

const StickersSection: React.FC<StickersSectionProps> = () => {
  const [expanded, setExpanded] = useState(false);
  
  // Handle dragging of stickers
  const handleStickerDragStart = (e: DragEvent<HTMLDivElement>, sticker: any) => {
    e.dataTransfer.setData("application/sticker", JSON.stringify(sticker));
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
    <div className="border-b border-cv-lightgray/30">
      <div 
        className="flex items-center justify-between p-2 cursor-pointer hover:bg-cv-gray/30"
        onClick={() => setExpanded(!expanded)}
      >
        <h4 className="text-xs font-medium text-cv-white">Stickers</h4>
        <button className="text-cv-lightgray">
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>
      
      {expanded && (
        <div className="pb-2">
          <StickerPacks onStickerDragStart={handleStickerDragStart} />
        </div>
      )}
    </div>
  );
};

export default StickersSection;
