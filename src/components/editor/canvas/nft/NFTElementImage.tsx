
import React from "react";
import { Link } from "lucide-react";
import { NFTData } from "@/types/canvasElement";

interface NFTElementImageProps {
  nftData: NFTData;
  editMode: boolean;
}

const NFTElementImage: React.FC<NFTElementImageProps> = ({ nftData, editMode }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <img 
        src={nftData.image} 
        alt={nftData.name || "NFT Item"} 
        className="max-w-full max-h-full object-contain rounded shadow-sm"
      />
      
      {!editMode && (
        <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1.5 text-white">
          <Link size={14} />
        </div>
      )}
    </div>
  );
};

export default NFTElementImage;
