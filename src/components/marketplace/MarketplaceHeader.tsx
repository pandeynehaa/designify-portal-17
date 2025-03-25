
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const MarketplaceHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Theme Marketplace</h1>
        <p className="text-muted-foreground">Discover and purchase community-created themes for your Web3 sites</p>
      </div>
      
      <div className="mt-4 md:mt-0">
        <Link to="/editor" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors">
          Create Theme
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
