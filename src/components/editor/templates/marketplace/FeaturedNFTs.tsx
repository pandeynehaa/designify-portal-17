
import React from "react";
import { TemplateStyles } from "../../../../types/templateStyles";
import EditableComponent from "../../shared/EditableComponent";
import { Heart } from "lucide-react";
import { useIsMobile } from "../../../../hooks/use-mobile";

interface FeaturedNFTsProps {
  styles: TemplateStyles;
  nfts: any[];
}

const FeaturedNFTs: React.FC<FeaturedNFTsProps> = ({ styles, nfts }) => {
  const isMobile = useIsMobile();
  
  // Adjust grid columns based on device size
  const getResponsiveGridColumns = () => {
    if (isMobile) {
      return 1; // Mobile: 1 column
    } else if (styles.gridColumns > 3 && window.innerWidth < 1024) {
      return 2; // Tablet: max 2 columns if original design has more than 3
    } else {
      return styles.gridColumns; // Desktop: use specified columns
    }
  };

  return (
    <div 
      className="w-full p-4 md:p-6"
      style={{ 
        backgroundColor: styles.collectionBg,
        color: styles.collectionTextColor
      }}
    >
      <div className="mb-4 md:mb-6 flex justify-between items-center">
        <h2 className={`text-xl md:text-2xl font-bold ${styles.headingFont}`}>
          <EditableComponent 
            initialText="Featured NFTs"
            isHeading={true}
            className="inline-block"
          />
        </h2>
        <div className="text-xs md:text-sm hover:underline cursor-pointer">
          <EditableComponent initialText="View All" />
        </div>
      </div>
      
      <div 
        className="grid gap-3 md:gap-6"
        style={{ 
          gridTemplateColumns: `repeat(${getResponsiveGridColumns()}, minmax(0, 1fr))`,
          gap: isMobile ? '0.75rem' : styles.spacing 
        }}
      >
        {nfts.map((nft, index) => (
          <div 
            key={index}
            className="overflow-hidden relative group"
            style={{ 
              backgroundColor: styles.cardBg,
              color: styles.cardTextColor,
              borderRadius: "0.5rem"
            }}
          >
            <div className="aspect-square bg-gray-800 relative overflow-hidden">
              <img 
                src={nft.image} 
                alt={nft.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3 md:p-4">
              <h3 className="font-medium truncate text-sm md:text-base">
                <EditableComponent initialText={nft.name} />
              </h3>
              <div className="text-xs md:text-sm opacity-75 mb-1">
                <EditableComponent initialText={`by ${nft.creator}`} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base">
                  <EditableComponent initialText={`${nft.price} ETH`} />
                </span>
                <span className="text-xs opacity-75 flex items-center">
                  <Heart size={isMobile ? 10 : 12} className="inline mr-1" />
                  {nft.likes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedNFTs;
