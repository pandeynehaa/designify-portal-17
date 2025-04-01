
import React from "react";
import { TemplateStyles } from "../../../../types/templateStyles";
import EditableComponent from "../../shared/EditableComponent";
import { useIsMobile } from "../../../../hooks/use-mobile";

interface MarketplaceHeroProps {
  styles: TemplateStyles;
}

const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({ styles }) => {
  const isMobile = useIsMobile();
  
  // Adjust banner height based on device size
  const getResponsiveBannerHeight = () => {
    if (isMobile) {
      return 'auto'; // Automatic height for mobile to accommodate content
    }
    return styles.bannerHeight;
  };

  return (
    <div 
      className="w-full relative flex items-center justify-center px-4 md:px-6 py-10 md:py-0"
      style={{ 
        background: styles.bannerBg,
        color: styles.bannerTextColor,
        height: getResponsiveBannerHeight()
      }}
    >
      <div className="text-center z-10 max-w-full">
        <h1 className="relative inline-block">
          <EditableComponent 
            initialText="Discover, Collect, and Sell NFTs" 
            isHeading={true}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 ${styles.headingFont}`}
          />
        </h1>
        
        <div className="relative inline-block">
          <EditableComponent 
            initialText="The world's largest digital marketplace for crypto collectibles and non-fungible tokens" 
            className={`text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-xs sm:max-w-md md:max-w-2xl mx-auto ${styles.bodyFont}`}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div 
            style={{ 
              backgroundColor: styles.buttonBg, 
              color: styles.buttonTextColor,
              borderRadius: styles.buttonRadius
            }}
            className="px-6 py-2.5 md:px-8 md:py-3 font-medium cursor-pointer w-full sm:w-auto text-center"
          >
            <EditableComponent initialText="Explore" />
          </div>
          <div 
            className="px-6 py-2.5 md:px-8 md:py-3 font-medium border-2 cursor-pointer w-full sm:w-auto text-center"
            style={{ 
              borderColor: styles.borderColor,
              borderRadius: styles.buttonRadius
            }}
          >
            <EditableComponent initialText="Create" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-r from-purple-900 to-blue-900"></div>
    </div>
  );
};

export default MarketplaceHero;
