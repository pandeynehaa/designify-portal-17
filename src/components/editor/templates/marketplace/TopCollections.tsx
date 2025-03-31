
import React from "react";
import { TemplateStyles } from "../../../../types/templateStyles";

interface TopCollectionsProps {
  styles: TemplateStyles;
}

const TopCollections: React.FC<TopCollectionsProps> = ({ styles }) => {
  return (
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
  );
};

export default TopCollections;
