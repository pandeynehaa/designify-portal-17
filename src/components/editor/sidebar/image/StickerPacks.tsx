
import React, { useState, DragEvent } from "react";
import { Sticker } from "lucide-react";

interface StickerPacksProps {
  onStickerDragStart?: (e: DragEvent<HTMLDivElement>, sticker: any) => void;
}

const StickerPacks: React.FC<StickerPacksProps> = ({ onStickerDragStart }) => {
  const [activeTab, setActiveTab] = useState("crypto");
  
  // Sample sticker packs
  const stickerPacks = {
    crypto: [
      { id: "crypto1", url: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025", label: "Bitcoin" },
      { id: "crypto2", url: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025", label: "Ethereum" },
      { id: "crypto3", url: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=025", label: "Cardano" },
      { id: "crypto4", url: "https://cryptologos.cc/logos/solana-sol-logo.png?v=025", label: "Solana" }
    ],
    badges: [
      { id: "badge1", url: "https://via.placeholder.com/100/6366F1/FFFFFF?text=NFT", label: "NFT Badge" },
      { id: "badge2", url: "https://via.placeholder.com/100/3B82F6/FFFFFF?text=Web3", label: "Web3 Badge" },
      { id: "badge3", url: "https://via.placeholder.com/100/10B981/FFFFFF?text=Verified", label: "Verified Badge" }
    ],
    emojis: [
      { id: "emoji1", url: "https://em-content.zobj.net/thumbs/120/apple/325/rocket_1f680.png", label: "Rocket" },
      { id: "emoji2", url: "https://em-content.zobj.net/thumbs/120/apple/325/money-bag_1f4b0.png", label: "Money Bag" },
      { id: "emoji3", url: "https://em-content.zobj.net/thumbs/120/apple/325/gem-stone_1f48e.png", label: "Gem" },
      { id: "emoji4", url: "https://em-content.zobj.net/thumbs/120/apple/325/fire_1f525.png", label: "Fire" }
    ]
  };

  const handleStickerDrag = (e: DragEvent<HTMLDivElement>, sticker: any) => {
    if (onStickerDragStart) {
      onStickerDragStart(e, sticker);
    }
  };

  return (
    <div className="px-2">
      <div className="flex border-b border-cv-lightgray/30 mb-2">
        <button
          className={`text-xs px-3 py-1 ${activeTab === "crypto" ? "border-b-2 border-cv-accent text-cv-accent" : "text-cv-white/70"}`}
          onClick={() => setActiveTab("crypto")}
        >
          Crypto
        </button>
        <button
          className={`text-xs px-3 py-1 ${activeTab === "badges" ? "border-b-2 border-cv-accent text-cv-accent" : "text-cv-white/70"}`}
          onClick={() => setActiveTab("badges")}
        >
          Badges
        </button>
        <button
          className={`text-xs px-3 py-1 ${activeTab === "emojis" ? "border-b-2 border-cv-accent text-cv-accent" : "text-cv-white/70"}`}
          onClick={() => setActiveTab("emojis")}
        >
          Emojis
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {stickerPacks[activeTab as keyof typeof stickerPacks].map((sticker) => (
          <div 
            key={sticker.id}
            className="cursor-grab relative group"
            draggable
            onDragStart={(e) => handleStickerDrag(e, sticker)}
          >
            <div className="w-full pb-[100%] relative">
              <img 
                src={sticker.url} 
                alt={sticker.label} 
                className="absolute inset-0 w-full h-full object-contain p-1"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-md transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-[10px] text-white font-medium px-1 py-0.5 rounded bg-black/70">Drag</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickerPacks;
