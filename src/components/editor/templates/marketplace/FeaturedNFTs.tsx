
import React from "react";
import { TemplateStyles } from "../../../../types/templateStyles";
import EditableComponent from "../../shared/EditableComponent";
import { Heart } from "lucide-react";

interface FeaturedNFTsProps {
  styles: TemplateStyles;
  nfts: any[];
}

const FeaturedNFTs: React.FC<FeaturedNFTsProps> = ({ styles, nfts }) => {
  return (
    <div 
      className="w-full p-6"
      style={{ 
        backgroundColor: styles.collectionBg,
        color: styles.collectionTextColor
      }}
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${styles.headingFont}`}>
          <EditableComponent 
            initialText="Featured NFTs"
            isHeading={true}
            className="inline-block"
          />
        </h2>
        <div className="text-sm hover:underline cursor-pointer">
          <EditableComponent initialText="View All" />
        </div>
      </div>
      
      <div 
        className="grid gap-6"
        style={{ 
          gridTemplateColumns: `repeat(${styles.gridColumns}, minmax(0, 1fr))`,
          gap: styles.spacing 
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
            <div className="p-4">
              <h3 className="font-medium truncate">
                <EditableComponent initialText={nft.name} />
              </h3>
              <div className="text-sm opacity-75 mb-1">
                <EditableComponent initialText={`by ${nft.creator}`} />
              </div>
              <div className="flex justify-between items-center">
                <span>
                  <EditableComponent initialText={`${nft.price} ETH`} />
                </span>
                <span className="text-xs opacity-75">
                  <Heart size={12} className="inline mr-1" />
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
