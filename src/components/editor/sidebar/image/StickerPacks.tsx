
import React, { useState, DragEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Sticker {
  id: string;
  url: string;
  label: string;
}

interface StickerPack {
  id: string;
  name: string;
  stickers: Sticker[];
}

const StickerPacks: React.FC = () => {
  // Sample sticker packs for web3 site customization
  const stickerPacks: StickerPack[] = [
    {
      id: "crypto-icons",
      name: "Crypto Icons",
      stickers: [
        { id: "bitcoin", url: "https://via.placeholder.com/80x80/F7931A/FFFFFF?text=BTC", label: "Bitcoin" },
        { id: "ethereum", url: "https://via.placeholder.com/80x80/627EEA/FFFFFF?text=ETH", label: "Ethereum" },
        { id: "solana", url: "https://via.placeholder.com/80x80/14F195/FFFFFF?text=SOL", label: "Solana" },
        { id: "cardano", url: "https://via.placeholder.com/80x80/0033AD/FFFFFF?text=ADA", label: "Cardano" },
        { id: "polkadot", url: "https://via.placeholder.com/80x80/E6007A/FFFFFF?text=DOT", label: "Polkadot" },
        { id: "bnb", url: "https://via.placeholder.com/80x80/F3BA2F/FFFFFF?text=BNB", label: "BNB" },
      ]
    },
    {
      id: "nft-badges",
      name: "NFT Badges",
      stickers: [
        { id: "verified", url: "https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=✓", label: "Verified" },
        { id: "rare", url: "https://via.placeholder.com/80x80/EC4899/FFFFFF?text=RARE", label: "Rare" },
        { id: "limited", url: "https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=LIMITED", label: "Limited" },
        { id: "exclusive", url: "https://via.placeholder.com/80x80/10B981/FFFFFF?text=EXCLUSIVE", label: "Exclusive" },
        { id: "genesis", url: "https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=GENESIS", label: "Genesis" },
        { id: "sold", url: "https://via.placeholder.com/80x80/EF4444/FFFFFF?text=SOLD", label: "Sold" },
      ]
    },
    {
      id: "web3-elements",
      name: "Web3 Elements",
      stickers: [
        { id: "wallet", url: "https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=WALLET", label: "Wallet" },
        { id: "blockchain", url: "https://via.placeholder.com/80x80/10B981/FFFFFF?text=CHAIN", label: "Blockchain" },
        { id: "token", url: "https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=TOKEN", label: "Token" },
        { id: "defi", url: "https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=DeFi", label: "DeFi" },
        { id: "dao", url: "https://via.placeholder.com/80x80/EC4899/FFFFFF?text=DAO", label: "DAO" },
        { id: "metaverse", url: "https://via.placeholder.com/80x80/6366F1/FFFFFF?text=META", label: "Metaverse" },
      ]
    },
    {
      id: "emoji-set",
      name: "Emojis",
      stickers: [
        { id: "rocket", url: "https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=🚀", label: "Rocket" },
        { id: "moon", url: "https://via.placeholder.com/80x80/6366F1/FFFFFF?text=🌙", label: "Moon" },
        { id: "diamond", url: "https://via.placeholder.com/80x80/EC4899/FFFFFF?text=💎", label: "Diamond" },
        { id: "fire", url: "https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=🔥", label: "Fire" },
        { id: "money", url: "https://via.placeholder.com/80x80/10B981/FFFFFF?text=💰", label: "Money" },
        { id: "star", url: "https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=⭐", label: "Star" },
      ]
    },
  ];

  const handleStickerDragStart = (e: DragEvent<HTMLDivElement>, sticker: Sticker) => {
    e.dataTransfer.setData("application/sticker", JSON.stringify({
      type: "sticker",
      url: sticker.url,
      label: sticker.label
    }));
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

  return (
    <div className="p-1">
      <Tabs defaultValue={stickerPacks[0].id} className="w-full">
        <TabsList className="grid grid-cols-4 h-8 mb-2 bg-cv-gray">
          {stickerPacks.map((pack) => (
            <TabsTrigger 
              key={pack.id} 
              value={pack.id}
              className="text-[9px] px-1 py-1 h-8"
            >
              {pack.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {stickerPacks.map((pack) => (
          <TabsContent key={pack.id} value={pack.id} className="mt-0">
            <div className="grid grid-cols-3 gap-1">
              {pack.stickers.map((sticker) => (
                <div
                  key={sticker.id}
                  className="cursor-grab relative group"
                  draggable
                  onDragStart={(e) => handleStickerDragStart(e, sticker)}
                >
                  <img
                    src={sticker.url}
                    alt={sticker.label}
                    className="w-full aspect-square object-contain rounded-md border border-cv-lightgray group-hover:border-cv-accent transition-colors"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-md transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs text-white font-medium px-1 py-0.5 rounded bg-black/70">Drag</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StickerPacks;
