
import React from "react";
import { TemplateStyles } from "../../../../types/templateStyles";
import EditableText from "./EditableText";

interface MarketplaceHeroProps {
  styles: TemplateStyles;
}

const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({ styles }) => {
  return (
    <div 
      className="w-full relative flex items-center justify-center px-6"
      style={{ 
        background: styles.bannerBg,
        color: styles.bannerTextColor,
        height: styles.bannerHeight
      }}
    >
      <div className="text-center z-10">
        <h1 className="relative inline-block">
          <EditableText 
            initialText="Discover, Collect, and Sell NFTs" 
            isHeading={true}
            className={`text-5xl font-bold mb-4 ${styles.headingFont}`}
          />
        </h1>
        
        <div className="relative inline-block">
          <EditableText 
            initialText="The world's largest digital marketplace for crypto collectibles and non-fungible tokens" 
            className={`text-xl mb-8 max-w-2xl mx-auto ${styles.bodyFont}`}
          />
        </div>
        
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
  );
};

export default MarketplaceHero;
