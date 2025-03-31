
import React from "react";
import { Wallet, Search, Filter, Grid3X3 } from "lucide-react";

const MarketplaceTemplate: React.FC = () => (
  <div className="h-full bg-[#121217] flex flex-col">
    {/* Header */}
    <div className="h-16 border-b border-gray-800 flex items-center px-6 bg-[#18181E]">
      <div className="font-display text-2xl text-white tracking-wider">NFTDROP</div>
      <div className="ml-auto flex items-center space-x-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search items..."
            className="bg-[#232329] text-gray-300 rounded-lg pl-9 pr-4 py-2 w-64 border border-gray-700"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>
        <button className="text-gray-300 hover:text-white transition-colors">Explore</button>
        <button className="text-gray-300 hover:text-white transition-colors">Collections</button>
        <button className="text-gray-300 hover:text-white transition-colors">Stats</button>
        <button className="bg-cv-purple text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Wallet className="h-4 w-4" />
          <span>Connect</span>
        </button>
      </div>
    </div>
    
    {/* Main Content */}
    <div className="flex-1 overflow-auto">
      {/* Featured Banner */}
      <div className="relative h-80 bg-gradient-to-r from-[#232329] to-[#18181E]">
        <div className="absolute inset-0 flex items-center px-12">
          <div className="w-1/2">
            <h1 className="font-display text-4xl text-white mb-4">DISCOVER, COLLECT, AND SELL EXTRAORDINARY NFTS</h1>
            <p className="text-gray-300 mb-6">The world's first and largest NFT marketplace</p>
            <div className="flex space-x-4">
              <button className="bg-cv-purple text-white px-6 py-3 rounded-lg font-medium">Explore</button>
              <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium">Create</button>
            </div>
          </div>
          <div className="w-1/2 flex justify-end">
            <div className="w-64 h-64 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-cv-purple via-blue-500 to-cv-purple/70 flex items-center justify-center">
                <div className="font-display text-2xl text-white">FEATURED NFT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trending Section */}
      <div className="px-8 py-8 bg-[#18181E]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-display text-2xl text-white">TRENDING COLLECTIONS</h2>
          <div className="flex items-center space-x-3">
            <button className="bg-[#232329] p-2 rounded-md text-gray-400">
              <Filter className="h-5 w-5" />
            </button>
            <button className="bg-[#232329] p-2 rounded-md text-gray-400">
              <Grid3X3 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="bg-[#232329] rounded-xl overflow-hidden border border-gray-800 transition-transform hover:scale-[1.02] cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center">
                <div className="w-24 h-24 rounded-xl bg-cv-purple/70 flex items-center justify-center text-white font-medium">
                  {i + 1}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-cv-purple mr-3 flex items-center justify-center text-xs text-white font-medium">
                    {(i % 3) + 1}K
                  </div>
                  <div>
                    <div className="text-white font-medium">CryptoCollection #{i + 1}</div>
                    <div className="text-gray-400 text-sm">Floor: {(i * 0.25 + 0.1).toFixed(2)} ETH</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default MarketplaceTemplate;
