
import React, { useState, useEffect } from "react";
import { useCanvasState } from "../../../hooks/useCanvasState";
import { toast } from "@/components/ui/use-toast";
import NFTHeader from "./nft/NFTHeader";
import NFTCollectionGroup from "./nft/NFTCollectionGroup";
import EmptyWalletState from "./nft/EmptyWalletState";
import EmptyNFTState from "./nft/EmptyNFTState";
import NFTGuide from "./nft/NFTGuide";

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

interface NFTData {
  id: string;
  name: string;
  image: string;
  collection: string;
  marketplaceLink: string;
}

const NFTsTab: React.FC = () => {
  const { setDroppedElements } = useCanvasState();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletNFTs, setWalletNFTs] = useState<NFTData[]>([]);
  const [expandedCollections, setExpandedCollections] = useState<Record<string, boolean>>({});
  
  // Simulate wallet connection
  useEffect(() => {
    // In a real implementation, this would check for an actual wallet connection
    const checkWalletConnection = () => {
      // For demo purposes, we're setting this to true after a delay
      setTimeout(() => {
        setIsWalletConnected(true);
        setWalletNFTs(mockWalletNFTs);
        
        // Initialize expanded state for collections
        const collections: Record<string, boolean> = {};
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
  
  const handleDragStart = (e: React.DragEvent, nft: NFTData) => {
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
  
  const handleAddNFT = (nft: NFTData) => {
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
  const groupedNFTs: Record<string, NFTData[]> = walletNFTs.reduce((acc: Record<string, NFTData[]>, nft) => {
    if (!acc[nft.collection]) {
      acc[nft.collection] = [];
    }
    acc[nft.collection].push(nft);
    return acc;
  }, {});

  return (
    <div className="p-4 flex flex-col h-full">
      <NFTHeader 
        isWalletConnected={isWalletConnected}
        onRefresh={handleRefresh}
        onConnectWallet={handleConnectWallet}
      />
      
      {isWalletConnected && Object.keys(groupedNFTs).length > 0 ? (
        <div className="overflow-y-auto flex-1">
          {Object.entries(groupedNFTs).map(([collection, nfts]) => (
            <NFTCollectionGroup
              key={collection}
              collection={collection}
              nfts={nfts}
              expanded={expandedCollections[collection] || false}
              onToggle={toggleCollection}
              onDragStart={handleDragStart}
              onNFTClick={handleAddNFT}
            />
          ))}
        </div>
      ) : !isWalletConnected ? (
        <EmptyWalletState onConnectWallet={handleConnectWallet} />
      ) : (
        <EmptyNFTState />
      )}
      
      {isWalletConnected && <NFTGuide />}
    </div>
  );
};

export default NFTsTab;
