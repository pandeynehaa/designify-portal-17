
import React from "react";
import { TemplateStyles } from "../../../../types/templateStyles";

interface MarketplaceHeaderProps {
  styles: TemplateStyles;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({ styles }) => {
  return (
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
  );
};

export default MarketplaceHeader;
