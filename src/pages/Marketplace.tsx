
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { mockThemes } from "../data/mockThemes";
import MarketplaceHeader from "../components/marketplace/MarketplaceHeader";
import SearchFilter from "../components/marketplace/SearchFilter";
import ThemeSection from "../components/marketplace/ThemeSection";
import MarketplaceFooter from "../components/marketplace/MarketplaceFooter";

const Marketplace: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-6">
          <MarketplaceHeader />
          <SearchFilter view={view} setView={setView} />
          
          <ThemeSection title="Featured Themes" themes={mockThemes.slice(0, 3)} />
          <ThemeSection title="Popular Themes" themes={mockThemes.slice(3)} />
        </div>
      </main>
      
      <MarketplaceFooter />
    </div>
  );
};

export default Marketplace;
