
import React from "react";
import { Wallet, Search, Filter, Grid3X3 } from "lucide-react";

export interface MarketplaceTemplateProps {
  styles?: {
    // Header styles
    headerBg?: string;
    headerTextColor?: string;
    headerHeight?: string;
    // Banner styles
    bannerBg?: string;
    bannerTextColor?: string;
    bannerHeight?: string;
    // Collection styles
    collectionBg?: string;
    collectionTextColor?: string;
    cardBg?: string;
    cardTextColor?: string;
    accentColor?: string;
    borderColor?: string;
    // Button styles
    buttonBg?: string;
    buttonTextColor?: string;
    buttonRadius?: string;
    // Typography
    headingFont?: string;
    bodyFont?: string;
    // Layout
    gridColumns?: number;
    spacing?: string;
  };
}

const MarketplaceTemplate: React.FC<MarketplaceTemplateProps> = ({ styles = {} }) => {
  // Default styles that can be overridden by props
  const {
    headerBg = "#18181E",
    headerTextColor = "white",
    headerHeight = "4rem", // 64px
    bannerBg = "bg-gradient-to-r from-[#232329] to-[#18181E]",
    bannerTextColor = "white",
    bannerHeight = "20rem", // 320px
    collectionBg = "#18181E",
    collectionTextColor = "white",
    cardBg = "#232329",
    cardTextColor = "white",
    accentColor = "#9b87f5", // Culture Vault purple
    borderColor = "#333333",
    buttonBg = "#9b87f5", // Culture Vault purple
    buttonTextColor = "white",
    buttonRadius = "0.5rem", // 8px
    headingFont = "font-display",
    bodyFont = "font-sans",
    gridColumns = 4,
    spacing = "1.5rem" // 24px
  } = styles;

  return (
    <div className="h-full bg-[#121217] flex flex-col">
      {/* Header */}
      <div 
        className="border-b border-gray-800 flex items-center px-6"
        style={{ 
          backgroundColor: headerBg, 
          color: headerTextColor,
          height: headerHeight
        }}
      >
        <div className={`${headingFont} text-2xl tracking-wider`} style={{ color: headerTextColor }}>NFTDROP</div>
        <div className="ml-auto flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search items..."
              className="bg-[#232329] rounded-lg pl-9 pr-4 py-2 w-64 border border-gray-700"
              style={{ color: headerTextColor }}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          <button className="hover:text-white transition-colors" style={{ color: headerTextColor }}>Explore</button>
          <button className="hover:text-white transition-colors" style={{ color: headerTextColor }}>Collections</button>
          <button className="hover:text-white transition-colors" style={{ color: headerTextColor }}>Stats</button>
          <button 
            className="flex items-center space-x-2" 
            style={{ 
              backgroundColor: buttonBg,
              color: buttonTextColor,
              borderRadius: buttonRadius,
              padding: '0.5rem 1rem',
            }}
          >
            <Wallet className="h-4 w-4" />
            <span>Connect</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Featured Banner */}
        <div 
          className="relative" 
          style={{ 
            height: bannerHeight,
            background: bannerBg.startsWith('bg-') ? undefined : bannerBg
          }}
          className={bannerBg.startsWith('bg-') ? bannerBg : undefined}
        >
          <div className="absolute inset-0 flex items-center px-12">
            <div className="w-1/2">
              <h1 
                className={`${headingFont} text-4xl mb-4`} 
                style={{ color: bannerTextColor }}
              >
                DISCOVER, COLLECT, AND SELL EXTRAORDINARY NFTS
              </h1>
              <p 
                className={`${bodyFont} mb-6`} 
                style={{ color: bannerTextColor }}
              >
                The world's first and largest NFT marketplace
              </p>
              <div className="flex space-x-4">
                <button 
                  style={{ 
                    backgroundColor: buttonBg,
                    color: buttonTextColor,
                    borderRadius: buttonRadius,
                    padding: '0.75rem 1.5rem',
                    fontWeight: 500
                  }}
                >
                  Explore
                </button>
                <button 
                  style={{ 
                    backgroundColor: 'transparent',
                    color: buttonTextColor,
                    borderRadius: buttonRadius,
                    padding: '0.75rem 1.5rem',
                    fontWeight: 500,
                    border: `1px solid ${buttonTextColor}`
                  }}
                >
                  Create
                </button>
              </div>
            </div>
            <div className="w-1/2 flex justify-end">
              <div className="w-64 h-64 overflow-hidden" style={{ borderRadius: buttonRadius }}>
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(to bottom right, ${accentColor}, rgba(${parseInt(accentColor.slice(1, 3), 16)}, ${parseInt(accentColor.slice(3, 5), 16)}, ${parseInt(accentColor.slice(5, 7), 16)}, 0.7))`
                  }}
                >
                  <div 
                    className={`${headingFont} text-2xl`}
                    style={{ color: buttonTextColor }}
                  >
                    FEATURED NFT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trending Section */}
        <div className="px-8 py-8" style={{ backgroundColor: collectionBg }}>
          <div className="flex justify-between items-center mb-8">
            <h2 
              className={`${headingFont} text-2xl`}
              style={{ color: collectionTextColor }}
            >
              TRENDING COLLECTIONS
            </h2>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-md text-gray-400" style={{ backgroundColor: cardBg }}>
                <Filter className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-md text-gray-400" style={{ backgroundColor: cardBg }}>
                <Grid3X3 className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` }}>
            {Array(8).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer border"
                style={{ 
                  backgroundColor: cardBg,
                  borderRadius: buttonRadius,
                  borderColor: borderColor
                }}
              >
                <div 
                  className="h-48 flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(to bottom right, ${accentColor}30, ${accentColor}30)`
                  }}
                >
                  <div 
                    className="w-24 h-24 flex items-center justify-center text-white font-medium rounded-xl"
                    style={{ 
                      backgroundColor: `${accentColor}70`,
                      color: buttonTextColor
                    }}
                  >
                    {i + 1}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-full mr-3 flex items-center justify-center text-xs font-medium"
                      style={{ 
                        backgroundColor: accentColor,
                        color: buttonTextColor
                      }}
                    >
                      {(i % 3) + 1}K
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: cardTextColor }}>CryptoCollection #{i + 1}</div>
                      <div className="text-sm text-gray-400">Floor: {(i * 0.25 + 0.1).toFixed(2)} ETH</div>
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
};

export default MarketplaceTemplate;
