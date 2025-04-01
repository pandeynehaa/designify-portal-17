
import React from "react";

const NFTGuide: React.FC = () => {
  return (
    <div className="mt-4 p-3 bg-cv-gray/30 rounded-lg">
      <h4 className="text-xs font-medium text-cv-white mb-2">How to use NFTs</h4>
      <ul className="text-xs text-cv-white/70 space-y-1.5 list-disc pl-4">
        <li>Drag and drop NFTs onto your canvas</li>
        <li>Click on an NFT to add it directly to the canvas</li>
        <li>Use Effects tab to add blur and glow effects</li>
        <li>Customize marketplace links in the properties panel</li>
      </ul>
    </div>
  );
};

export default NFTGuide;
