
import React from "react";
import { TemplateStyles } from "../../../../types/templateStyles";

interface FeaturedCollectionsProps {
  styles: TemplateStyles;
}

const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ styles }) => {
  return (
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
  );
};

export default FeaturedCollections;
