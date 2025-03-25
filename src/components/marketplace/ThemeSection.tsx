
import React from "react";
import MarketplaceCard from "../MarketplaceCard";

interface ThemeSectionProps {
  title: string;
  themes: Array<{
    name: string;
    author: string;
    price: string;
    likes: number;
    downloads: number;
    image: string;
    colors: string[];
  }>;
}

const ThemeSection: React.FC<ThemeSectionProps> = ({ title, themes }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-semibold text-foreground">{title}</h2>
        <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme, index) => (
          <MarketplaceCard key={index} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default ThemeSection;
