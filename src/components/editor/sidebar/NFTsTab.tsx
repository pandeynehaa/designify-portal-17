
import React, { useState } from "react";
import { 
  Image, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Wallet,
  Link,
  RotateCcw,
  Scale,
  CircleFadingPlus
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock NFT data - would be replaced with real wallet connection
const mockNFTs = [
  {
    id: "nft-1",
    name: "Crypto Punk #8923",
    image: "https://via.placeholder.com/150?text=NFT1",
    collection: "CryptoPunks"
  },
  {
    id: "nft-2",
    name: "Bored Ape #221",
    image: "https://via.placeholder.com/150?text=NFT2",
    collection: "BAYC"
  },
  {
    id: "nft-3",
    name: "Doodle #7823",
    image: "https://via.placeholder.com/150?text=NFT3",
    collection: "Doodles"
  },
  {
    id: "nft-4",
    name: "Azuki #1432",
    image: "https://via.placeholder.com/150?text=NFT4",
    collection: "Azuki"
  }
];

interface NFTItemProps {
  nft: {
    id: string;
    name: string;
    image: string;
    collection: string;
  };
}

const NFTItem: React.FC<NFTItemProps> = ({ nft }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("application/nft", JSON.stringify({
      type: "nft",
      id: nft.id,
      name: nft.name,
      image: nft.image,
      collection: nft.collection,
      marketplaceLink: `/marketplace/asset/${nft.id}`
    }));
    
    e.dataTransfer.effectAllowed = "copy";
    
    // Show visual feedback
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.zIndex = '50';
    }
    
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
    <div 
      className="flex flex-col p-2 border border-gray-200 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-grab"
      draggable
      onDragStart={handleDragStart}
    >
      <img 
        src={nft.image} 
        alt={nft.name} 
        className="w-full h-24 object-cover rounded-md mb-2" 
      />
      <div className="text-xs font-medium truncate">{nft.name}</div>
      <div className="text-xs text-gray-400 truncate">{nft.collection}</div>
    </div>
  );
};

const NFTsTab: React.FC = () => {
  const [expandedCollections, setExpandedCollections] = useState<string[]>(["All"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  
  const nftCollections = [
    { id: "All", name: "All NFTs", items: mockNFTs },
    { id: "CryptoPunks", name: "CryptoPunks", items: mockNFTs.filter(nft => nft.collection === "CryptoPunks") },
    { id: "BAYC", name: "Bored Ape Yacht Club", items: mockNFTs.filter(nft => nft.collection === "BAYC") },
    { id: "Doodles", name: "Doodles", items: mockNFTs.filter(nft => nft.collection === "Doodles") },
    { id: "Azuki", name: "Azuki", items: mockNFTs.filter(nft => nft.collection === "Azuki") }
  ];

  const toggleCollection = (collectionId: string) => {
    if (expandedCollections.includes(collectionId)) {
      setExpandedCollections(expandedCollections.filter(id => id !== collectionId));
    } else {
      setExpandedCollections([...expandedCollections, collectionId]);
    }
  };

  const connectWallet = () => {
    // In a real app, this would connect to MetaMask or other wallet
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to your wallet"
    });
    setIsConnected(true);
  };

  // Filter NFTs based on search query
  const filteredCollections = nftCollections.map(collection => ({
    ...collection,
    items: collection.items.filter(nft => 
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(collection => collection.items.length > 0);

  return (
    <div className="p-2 border-t border-gray-200 h-full flex flex-col">
      <div className="px-2 pb-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search NFTs..."
            className="w-full py-1.5 pl-9 pr-3 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {!isConnected ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Wallet size={48} className="mb-4 text-gray-400" />
          <h3 className="text-sm font-medium mb-2">Connect Your Wallet</h3>
          <p className="text-xs text-gray-400 text-center mb-4">
            Connect your wallet to access your NFTs and drag them onto the canvas.
          </p>
          <button 
            className="px-4 py-2 bg-cv-accent rounded-lg text-white text-sm font-medium hover:bg-cv-accent/90 transition-colors"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="mb-2 px-2">
            <div className="flex items-center space-x-2">
              <Wallet size={14} className="text-green-500" />
              <span className="text-xs font-medium">Wallet Connected</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between px-2 py-2 mb-2">
            <span className="text-xs font-semibold">Your NFTs</span>
            <div className="flex items-center text-xs text-gray-400">
              <span>Drag to canvas</span>
              <Image size={12} className="ml-1" />
            </div>
          </div>
          
          {filteredCollections.map((collection) => (
            <div key={collection.id} className="mb-3">
              <button 
                className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => toggleCollection(collection.id)}
              >
                <span>{collection.name}</span>
                {expandedCollections.includes(collection.id) ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
              
              {expandedCollections.includes(collection.id) && (
                <div className="grid grid-cols-2 gap-2 p-2">
                  {collection.items.map((nft) => (
                    <NFTItem key={nft.id} nft={nft} />
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="p-3 bg-gray-100/10 rounded-lg mx-2 mt-4">
            <div className="text-xs font-medium mb-2">Design Tools</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                <Scale size={16} className="mb-1" />
                <span>Scale</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                <RotateCcw size={16} className="mb-1" />
                <span>Rotate</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                <CircleFadingPlus size={16} className="mb-1" />
                <span>Add Glow</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-white/5 rounded-lg">
                <Link size={16} className="mb-1" />
                <span>Link</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTsTab;
