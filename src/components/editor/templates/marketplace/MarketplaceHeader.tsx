
import React from "react";
import { TemplateStyles } from "../../../../types/templateStyles";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "../../../../hooks/use-mobile";

interface MarketplaceHeaderProps {
  styles: TemplateStyles;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({ styles }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <header 
      style={{ 
        backgroundColor: styles.headerBg,
        color: styles.headerTextColor,
        height: isMobile ? 'auto' : styles.headerHeight
      }}
      className="w-full flex flex-col md:flex-row md:items-center px-4 md:px-6 py-3 md:py-0 border-b border-gray-800 relative"
    >
      <div className="flex items-center justify-between md:justify-start md:flex-1">
        <div className="text-xl md:text-2xl font-bold mr-8">NFT Market</div>
        
        {/* Mobile menu toggle */}
        <button 
          className="block md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-purple-400">Explore</a>
          <a href="#" className="hover:text-purple-400">Stats</a>
          <a href="#" className="hover:text-purple-400">Resources</a>
          <a href="#" className="hover:text-purple-400">Create</a>
        </nav>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="flex flex-col space-y-3 py-3 md:hidden">
          <a href="#" className="hover:text-purple-400">Explore</a>
          <a href="#" className="hover:text-purple-400">Stats</a>
          <a href="#" className="hover:text-purple-400">Resources</a>
          <a href="#" className="hover:text-purple-400">Create</a>
        </nav>
      )}
      
      <div className={`${mobileMenuOpen ? 'mt-4' : 'mt-0'} md:mt-0 flex items-center space-x-3 ${isMobile ? 'w-full justify-between' : ''}`}>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-gray-800 rounded-lg px-3 py-2 w-36 md:w-48 lg:w-64 text-xs md:text-sm"
          />
          <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
        </div>
        <div 
          style={{ 
            backgroundColor: styles.buttonBg, 
            color: styles.buttonTextColor,
            borderRadius: styles.buttonRadius
          }}
          className="px-3 py-1.5 md:px-4 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap"
        >
          Connect Wallet
        </div>
      </div>
    </header>
  );
};

export default MarketplaceHeader;
