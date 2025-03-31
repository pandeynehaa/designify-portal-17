
import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import StickerPacks from "./StickerPacks";

const StickersSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

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
          <StickerPacks />
        </div>
      )}
    </div>
  );
};

export default StickersSection;
