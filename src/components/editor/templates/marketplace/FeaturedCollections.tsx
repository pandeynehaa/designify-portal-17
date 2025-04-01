
import React from "react";
import { TemplateStyles } from "../../../../types/templateStyles";
import { useIsMobile } from "../../../../hooks/use-mobile";
import EditableComponent from "../../shared/EditableComponent";

interface FeaturedCollectionsProps {
  styles: TemplateStyles;
}

const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ styles }) => {
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
            initialText="Featured Collections"
            isHeading={true}
            className="inline-block"
          />
        </h2>
        <button className="text-xs md:text-sm hover:underline">
          <EditableComponent initialText="View All" />
        </button>
      </div>
      
      <div 
        className="grid gap-3 md:gap-6"
        style={{ 
          gridTemplateColumns: `repeat(${getResponsiveGridColumns()}, minmax(0, 1fr))`,
          gap: isMobile ? '0.75rem' : styles.spacing 
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
                  <div className="font-bold text-base md:text-lg">Moonbirds #{item}23</div>
                  <div className="text-xs md:text-sm opacity-90">Floor: 2.5 ETH</div>
                </div>
              </div>
            </div>
            <div className="p-3 md:p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-sm md:text-base">Kevin's Collection</div>
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
              <div className="text-xs md:text-sm opacity-75">
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
