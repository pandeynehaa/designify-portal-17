
import React from "react";
import { Heart, Share2, Download } from "lucide-react";

interface MarketplaceCardProps {
  theme: {
    name: string;
    author: string;
    price: string;
    likes: number;
    downloads: number;
    image: string;
    colors: string[];
  };
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ theme }) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-border/60 hover:shadow-card transition-all duration-300 hover:translate-y-[-2px] hover-scale">
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        <img 
          src={theme.image} 
          alt={theme.name}
          className="w-full h-full object-cover"
        />
        <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-black/10 to-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center">
          <div className="flex space-x-1.5">
            {theme.colors.map((color, index) => (
              <div 
                key={index} 
                className="w-5 h-5 rounded-full border border-white/30" 
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors">
              <Heart size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors">
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-foreground">{theme.name}</h3>
            <p className="text-sm text-muted-foreground">by {theme.author}</p>
          </div>
          <div className="bg-theme-primary/10 text-theme-primary font-medium text-sm px-2 py-0.5 rounded">
            {theme.price}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-border/60 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Heart size={14} className="mr-1" />
            {theme.likes}
          </div>
          <div className="flex items-center">
            <Download size={14} className="mr-1" />
            {theme.downloads}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;
