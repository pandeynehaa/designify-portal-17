
import React from "react";

interface NFTData {
  id: string;
  name: string;
  image: string;
  collection: string;
  marketplaceLink: string;
}

interface NFTItemProps {
  nft: NFTData;
  onDragStart: (e: React.DragEvent, nft: NFTData) => void;
  onClick: () => void;
}

const NFTItem: React.FC<NFTItemProps> = ({ nft, onDragStart, onClick }) => {
  return (
    <div 
      className="bg-cv-gray/50 rounded-lg p-2 cursor-grab hover:bg-cv-gray transition-colors"
      draggable
      onDragStart={(e) => onDragStart(e, nft)}
      onClick={onClick}
    >
      <img 
        src={nft.image} 
        alt={nft.name}
        className="w-full aspect-square object-cover rounded-md mb-2"
      />
      <div className="text-xs text-cv-white truncate font-medium">{nft.name}</div>
    </div>
  );
};

export default NFTItem;
