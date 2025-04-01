
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import NFTItem from "./NFTItem";

interface NFTData {
  id: string;
  name: string;
  image: string;
  collection: string;
  marketplaceLink: string;
}

interface NFTCollectionGroupProps {
  collection: string;
  nfts: NFTData[];
  expanded: boolean;
  onToggle: (collection: string) => void;
  onDragStart: (e: React.DragEvent, nft: NFTData) => void;
  onNFTClick: (nft: NFTData) => void;
}

const NFTCollectionGroup: React.FC<NFTCollectionGroupProps> = ({
  collection,
  nfts,
  expanded,
  onToggle,
  onDragStart,
  onNFTClick
}) => {
  return (
    <Collapsible
      key={collection}
      open={expanded}
      onOpenChange={() => onToggle(collection)}
      className="mb-3"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-cv-gray/30 rounded-md text-cv-white text-sm">
        <span>{collection}</span>
        <span className="text-xs text-cv-white/60">{nfts.length} items</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {nfts.map((nft) => (
            <NFTItem 
              key={nft.id}
              nft={nft}
              onDragStart={onDragStart}
              onClick={() => onNFTClick(nft)}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default NFTCollectionGroup;
