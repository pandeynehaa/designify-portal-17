
import React, { useState, useEffect } from "react";
import { useCanvasState } from "../../../hooks/useCanvasState";
import { Package, Wallet, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Mock wallet NFT data for demonstration
const mockWalletNFTs = [
  {
    id: "nft-wallet-1",
    name: "Crypto Punk #3784",
    image: "https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=NFT+1",
    collection: "CryptoPunks",
    marketplaceLink: "/marketplace/nft-1"
  },
  {
    id: "nft-wallet-2",
    name: "Bored Ape #8067",
    image: "https://via.placeholder.com/100x100/10B981/FFFFFF?text=NFT+2",
    collection: "Bored Ape Yacht Club",
    marketplaceLink: "/marketplace/nft-2"
  },
  {
    id: "nft-wallet-3",
    name: "Doodle #452",
    image: "https://via.placeholder.com/100x100/F59E0B/FFFFFF?text=NFT+3",
    collection: "Doodles",
    marketplaceLink: "/marketplace/nft-3"
  },
  {
    id: "nft-wallet-4",
    name: "Azuki #1287",
    image: "https://via.placeholder.com/100x100/EC4899/FFFFFF?text=NFT+4",
    collection: "Azuki",
    marketplaceLink: "/marketplace/nft-4"
  },
  {
    id: "nft-wallet-5",
    name: "CloneX #8241",
    image: "https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=NFT+5",
    collection: "CloneX",
    marketplaceLink: "/marketplace/nft-5"
  }
];

const NFTsTab: React.FC = () => {
  const { setDroppedElements } = useCanvasState();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletNFTs, setWalletNFTs] = useState([]);
  const [expandedCollections, setExpandedCollections] = useState({});
  
  // Simulate wallet connection
  useEffect(() => {
    // In a real implementation, this would check for an actual wallet connection
    const checkWalletConnection = () => {
      // For demo purposes, we're setting this to true after a delay
      setTimeout(() => {
        setIsWalletConnected(true);
        setWalletNFTs(mockWalletNFTs);
        
        // Initialize expanded state for collections
        const collections = {};
        mockWalletNFTs.forEach(nft => {
          if (!collections[nft.collection]) {
            collections[nft.collection] = true; // Default to expanded
          }
        });
        setExpandedCollections(collections);
        
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been connected successfully"
        });
      }, 500);
    };
    
    checkWalletConnection();
  }, []);
  
  const handleDragStart = (e: React.DragEvent, nft: any) => {
    e.dataTransfer.setData("application/nft", JSON.stringify(nft));
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
      title: "Connecting Wallet",
      description: "Please approve the connection request in your wallet"
    });
    
    // Simulate wallet connection process
    setTimeout(() => {
      setIsWalletConnected(true);
      setWalletNFTs(mockWalletNFTs);
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully"
      });
    }, 1000);
  };
  
  const handleRefresh = () => {
    toast({
      title: "Refreshing NFTs",
      description: "Syncing your NFT collection with your wallet"
    });
    
    // Simulate refresh
    setTimeout(() => {
      toast({
        title: "NFTs Refreshed",
        description: "Your NFT collection is up to date"
      });
    }, 1000);
  };
  
  const toggleCollection = (collection: string) => {
    setExpandedCollections(prev => ({
      ...prev,
      [collection]: !prev[collection]
    }));
  };
  
  // Group NFTs by collection
  const groupedNFTs = walletNFTs.reduce((acc, nft) => {
    if (!acc[nft.collection]) {
      acc[nft.collection] = [];
    }
    acc[nft.collection].push(nft);
    return acc;
  }, {});

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-cv-white">Your NFTs</h3>
        <div className="flex gap-1">
          <button
            onClick={handleRefresh}
            className="p-1.5 text-cv-white bg-cv-gray rounded hover:bg-cv-lightgray transition-colors"
            title="Refresh NFTs"
            disabled={!isWalletConnected}
          >
            <RefreshCw size={14} />
          </button>
          {!isWalletConnected && (
            <button
              onClick={handleConnectWallet}
              className="p-1.5 text-cv-white bg-cv-gray rounded hover:bg-cv-lightgray transition-colors"
              title="Connect Wallet"
            >
              <Wallet size={14} />
            </button>
          )}
        </div>
      </div>
      
      {isWalletConnected && Object.keys(groupedNFTs).length > 0 ? (
        <div className="overflow-y-auto flex-1">
          {Object.entries(groupedNFTs).map(([collection, nfts]) => (
            <Collapsible
              key={collection}
              open={expandedCollections[collection]}
              onOpenChange={() => toggleCollection(collection)}
              className="mb-3"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-cv-gray/30 rounded-md text-cv-white text-sm">
                <span>{collection}</span>
                <span className="text-xs text-cv-white/60">{nfts.length} items</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {nfts.map((nft) => (
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
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      ) : !isWalletConnected ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <Wallet className="h-12 w-12 text-cv-white/30 mb-3" />
          <h3 className="text-sm font-medium text-cv-white mb-1">No Wallet Connected</h3>
          <p className="text-xs text-cv-white/60 mb-4">Connect your wallet to see your NFT collection</p>
          <button
            onClick={handleConnectWallet}
            className="px-4 py-2 bg-cv-accent text-white rounded-md text-sm hover:bg-cv-accent/90 transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <Package className="h-12 w-12 text-cv-white/30 mb-3" />
          <h3 className="text-sm font-medium text-cv-white mb-1">No NFTs Found</h3>
          <p className="text-xs text-cv-white/60 mb-4">We couldn't find any NFTs in your connected wallet</p>
        </div>
      )}
      
      {isWalletConnected && (
        <div className="mt-4 p-3 bg-cv-gray/30 rounded-lg">
          <h4 className="text-xs font-medium text-cv-white mb-2">How to use NFTs</h4>
          <ul className="text-xs text-cv-white/70 space-y-1.5 list-disc pl-4">
            <li>Drag and drop NFTs onto your canvas</li>
            <li>Click on an NFT to add it directly to the canvas</li>
            <li>Use Effects tab to add blur and glow effects</li>
            <li>Customize marketplace links in the properties panel</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NFTsTab;
