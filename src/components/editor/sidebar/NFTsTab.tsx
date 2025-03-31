
import React from "react";
import { useCanvasState } from "../../../hooks/useCanvasState";
import { Package, Upload, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock NFT data for demonstration
const mockNFTs = [
  {
    id: "nft-1",
    name: "Crypto Punk #3784",
    image: "https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=NFT+1",
    collection: "CryptoPunks",
    marketplaceLink: "/marketplace/nft-1"
  },
  {
    id: "nft-2",
    name: "Bored Ape #8067",
    image: "https://via.placeholder.com/100x100/10B981/FFFFFF?text=NFT+2",
    collection: "Bored Ape Yacht Club",
    marketplaceLink: "/marketplace/nft-2"
  },
  {
    id: "nft-3",
    name: "Doodle #452",
    image: "https://via.placeholder.com/100x100/F59E0B/FFFFFF?text=NFT+3",
    collection: "Doodles",
    marketplaceLink: "/marketplace/nft-3"
  }
];

const NFTsTab: React.FC = () => {
  const { setDroppedElements } = useCanvasState();
  
  const handleDragStart = (e: React.DragEvent, nft: any) => {
    e.dataTransfer.setData("componentType", "nft");
    e.dataTransfer.setData("nftData", JSON.stringify(nft));
    e.dataTransfer.effectAllowed = "copy";
  };
  
  const handleAddNFT = (nft: any) => {
    // Create a new NFT element
    const newNFT = {
      type: 'nft',
      id: `nft-${Date.now()}`,
      x: 150,
      y: 150,
      content: nft.image,
      nftData: {
        name: nft.name,
        image: nft.image,
        collection: nft.collection,
        marketplaceLink: nft.marketplaceLink,
        blurAmount: 0,
        glowColor: 'rgba(255, 255, 255, 0)',
        glowSpread: 0,
        rotation: 0,
        scale: 1
      }
    };
    
    // Add to canvas
    setDroppedElements((prev) => [...prev, newNFT]);
    
    toast({
      title: "NFT Added",
      description: `${nft.name} has been added to your canvas`
    });
  };
  
  const handleConnectWallet = () => {
    toast({
      title: "Connect Wallet",
      description: "Wallet connection feature will be available soon"
    });
  };
  
  const handleRefresh = () => {
    toast({
      title: "Refreshing NFTs",
      description: "Syncing your NFT collection with your wallet"
    });
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-cv-white">Your NFTs</h3>
        <div className="flex gap-1">
          <button
            onClick={handleRefresh}
            className="p-1.5 text-cv-white bg-cv-gray rounded hover:bg-cv-lightgray transition-colors"
            title="Refresh NFTs"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={handleConnectWallet}
            className="p-1.5 text-cv-white bg-cv-gray rounded hover:bg-cv-lightgray transition-colors"
            title="Connect Wallet"
          >
            <Upload size={14} />
          </button>
        </div>
      </div>
      
      {mockNFTs.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 overflow-y-auto">
          {mockNFTs.map((nft) => (
            <div 
              key={nft.id}
              className="bg-cv-gray/50 rounded-lg p-2 cursor-grab hover:bg-cv-gray transition-colors"
              draggable
              onDragStart={(e) => handleDragStart(e, nft)}
              onClick={() => handleAddNFT(nft)}
            >
              <img 
                src={nft.image} 
                alt={nft.name}
                className="w-full aspect-square object-cover rounded-md mb-2"
              />
              <div className="text-xs text-cv-white truncate font-medium">{nft.name}</div>
              <div className="text-xs text-cv-white/60 truncate">{nft.collection}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <Package className="h-12 w-12 text-cv-white/30 mb-3" />
          <h3 className="text-sm font-medium text-cv-white mb-1">No NFTs Found</h3>
          <p className="text-xs text-cv-white/60 mb-4">Connect your wallet to see your NFT collection</p>
          <button
            onClick={handleConnectWallet}
            className="px-4 py-2 bg-cv-accent text-white rounded-md text-sm hover:bg-cv-accent/90 transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-cv-gray/30 rounded-lg">
        <h4 className="text-xs font-medium text-cv-white mb-2">How to use NFTs</h4>
        <ul className="text-xs text-cv-white/70 space-y-1.5 list-disc pl-4">
          <li>Drag and drop NFTs onto your canvas</li>
          <li>Use Effects tab to add blur and glow effects</li>
          <li>Customize marketplace links in the properties panel</li>
          <li>Use Layers tab to organize your NFTs</li>
        </ul>
      </div>
    </div>
  );
};

export default NFTsTab;
