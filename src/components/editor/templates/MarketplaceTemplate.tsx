
import React from "react";
import { TemplateStyles } from "../../../types/templateStyles";

interface MarketplaceTemplateProps {
  styles: TemplateStyles;
}

const MarketplaceTemplate: React.FC<MarketplaceTemplateProps> = ({ styles }) => {
  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      {/* Header */}
      <header 
        style={{ 
          backgroundColor: styles.headerBg,
          color: styles.headerTextColor,
          height: styles.headerHeight 
        }}
        className="w-full flex items-center px-6 border-b border-gray-800"
      >
        <div className="flex-1 flex items-center">
          <div className="text-2xl font-bold mr-8">NFT Market</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-purple-400">Explore</a>
            <a href="#" className="hover:text-purple-400">Stats</a>
            <a href="#" className="hover:text-purple-400">Resources</a>
            <a href="#" className="hover:text-purple-400">Create</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search items, collections..." 
              className="bg-gray-800 rounded-lg px-4 py-2 w-48 lg:w-64 text-sm"
            />
          </div>
          <div 
            style={{ 
              backgroundColor: styles.buttonBg, 
              color: styles.buttonTextColor,
              borderRadius: styles.buttonRadius
            }}
            className="px-4 py-2 font-medium text-sm"
          >
            Connect Wallet
          </div>
        </div>
      </header>
      
      {/* Hero Banner */}
      <div 
        className="w-full relative flex items-center justify-center px-6"
        style={{ 
          background: styles.bannerBg,
          color: styles.bannerTextColor,
          height: styles.bannerHeight
        }}
      >
        <div className="text-center z-10">
          <h1 className={`text-5xl font-bold mb-4 ${styles.headingFont}`}>Discover, Collect, and Sell NFTs</h1>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${styles.bodyFont}`}>
            The world's largest digital marketplace for crypto collectibles and non-fungible tokens
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              style={{ 
                backgroundColor: styles.buttonBg, 
                color: styles.buttonTextColor,
                borderRadius: styles.buttonRadius
              }}
              className="px-8 py-3 font-medium"
            >
              Explore
            </button>
            <button 
              className="px-8 py-3 font-medium border-2"
              style={{ 
                borderColor: styles.borderColor,
                borderRadius: styles.buttonRadius
              }}
            >
              Create
            </button>
          </div>
        </div>
        <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-r from-purple-900 to-blue-900"></div>
      </div>
      
      {/* Featured Collections */}
      <div 
        className="w-full p-6"
        style={{ 
          backgroundColor: styles.collectionBg,
          color: styles.collectionTextColor
        }}
      >
        <div className="mb-6 flex justify-between items-center">
          <h2 className={`text-2xl font-bold ${styles.headingFont}`}>Featured Collections</h2>
          <button className="text-sm hover:underline">View All</button>
        </div>
        
        <div 
          className="grid gap-6"
          style={{ 
            gridTemplateColumns: `repeat(${styles.gridColumns}, minmax(0, 1fr))`,
            gap: styles.spacing 
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item}
              className="overflow-hidden relative"
              style={{ 
                backgroundColor: styles.cardBg,
                color: styles.cardTextColor,
                borderRadius: "0.5rem"
              }}
            >
              <div className="aspect-square bg-gray-800 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30 flex items-end p-4">
                  <div>
                    <div className="font-bold text-lg">Moonbirds #{item}23</div>
                    <div className="text-sm opacity-90">Floor: 2.5 ETH</div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Kevin's Collection</div>
                  <div 
                    className="text-xs px-2 py-1"
                    style={{ 
                      backgroundColor: styles.accentColor,
                      borderRadius: styles.buttonRadius
                    }}
                  >
                    New
                  </div>
                </div>
                <div className="text-sm opacity-75">
                  24 items · 5 owners
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Top Collections */}
      <div 
        className="w-full p-6"
        style={{ 
          backgroundColor: styles.collectionBg,
          color: styles.collectionTextColor
        }}
      >
        <h2 className={`text-2xl font-bold mb-6 ${styles.headingFont}`}>Top Collections</h2>
        
        <div className="overflow-hidden rounded-lg border" style={{ borderColor: styles.borderColor }}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div 
              key={item}
              className="flex items-center p-4 hover:bg-gray-800 transition-colors"
              style={{ 
                borderBottom: index < 4 ? `1px solid ${styles.borderColor}` : 'none'
              }}
            >
              <div className="text-lg font-medium mr-4 opacity-50 w-6 text-center">{item}</div>
              <div className="w-12 h-12 rounded-full bg-gray-700 mr-4"></div>
              <div className="flex-1">
                <div className="font-medium">Bored Ape Yacht Club</div>
                <div className="text-sm opacity-75">Floor: 68.49 ETH</div>
              </div>
              <div className="text-right">
                <div className="font-medium">527.6K ETH</div>
                <div className="text-sm text-green-400">+78.9%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceTemplate;
