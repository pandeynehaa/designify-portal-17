
import React from "react";
import { TemplateStyles } from "../../../../types/templateStyles";
import EditableComponent from "../../shared/EditableComponent";

interface MarketplaceFooterProps {
  styles: TemplateStyles;
}

const MarketplaceFooter: React.FC<MarketplaceFooterProps> = ({ styles }) => {
  return (
    <footer 
      className="w-full px-6 py-8 border-t"
      style={{ 
        backgroundColor: styles.headerBg,
        borderColor: styles.borderColor,
        color: styles.headerTextColor
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <EditableComponent initialText="NFT Market" isHeading={true} />
            </div>
            <p className="text-sm opacity-70 mb-4">
              <EditableComponent initialText="The world's largest digital marketplace for crypto collectibles and non-fungible tokens." />
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"></div>
            </div>
          </div>
          
          <div>
            <div className="text-lg font-medium mb-4">
              <EditableComponent initialText="Marketplace" isHeading={true} />
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="All NFTs" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Art" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Collectibles" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Photography" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Virtual Worlds" /></a></li>
            </ul>
          </div>
          
          <div>
            <div className="text-lg font-medium mb-4">
              <EditableComponent initialText="My Account" isHeading={true} />
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Profile" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Favorites" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Watchlist" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="My Collections" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Settings" /></a></li>
            </ul>
          </div>
          
          <div>
            <div className="text-lg font-medium mb-4">
              <EditableComponent initialText="Resources" isHeading={true} />
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Help Center" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Platform Status" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Partners" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Blog" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Newsletter" /></a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm opacity-70 mb-4 md:mb-0">
            <EditableComponent initialText="© 2023 NFT Market. All rights reserved." />
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Privacy Policy" /></a>
            <a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Terms of Service" /></a>
            <a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Cookie Policy" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketplaceFooter;
