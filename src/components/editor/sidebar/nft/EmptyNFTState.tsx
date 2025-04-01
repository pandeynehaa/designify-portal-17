
import React from "react";
import { Package } from "lucide-react";

const EmptyNFTState: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
      <Package className="h-12 w-12 text-cv-white/30 mb-3" />
      <h3 className="text-sm font-medium text-cv-white mb-1">No NFTs Found</h3>
      <p className="text-xs text-cv-white/60 mb-4">We couldn't find any NFTs in your connected wallet</p>
    </div>
  );
};

export default EmptyNFTState;
