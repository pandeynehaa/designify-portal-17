
import React from "react";
import { TemplateStyles } from "../../../types/templateStyles";
import MarketplaceHeader from "./marketplace/MarketplaceHeader";
import MarketplaceHero from "./marketplace/MarketplaceHero";
import FeaturedCollections from "./marketplace/FeaturedCollections";
import TopCollections from "./marketplace/TopCollections";

interface MarketplaceTemplateProps {
  styles: TemplateStyles;
}

const MarketplaceTemplate: React.FC<MarketplaceTemplateProps> = ({ styles }) => {
  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <MarketplaceHeader styles={styles} />
      <MarketplaceHero styles={styles} />
      <FeaturedCollections styles={styles} />
      <TopCollections styles={styles} />
    </div>
  );
};

export default MarketplaceTemplate;
