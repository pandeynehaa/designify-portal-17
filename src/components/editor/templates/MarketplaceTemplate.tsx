
import React, { useState } from "react";
import { TemplateStyles } from "../../../types/templateStyles";
import MarketplaceHeader from "./marketplace/MarketplaceHeader";
import MarketplaceHero from "./marketplace/MarketplaceHero";
import FeaturedCollections from "./marketplace/FeaturedCollections";
import TopCollections from "./marketplace/TopCollections";
import { useCanvasState } from "../../../hooks/useCanvasState";
import CanvasElements from "../CanvasElements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Grid, List } from "lucide-react";
import EditableComponent from "../shared/EditableComponent";

interface MarketplaceTemplateProps {
  styles: TemplateStyles;
}

const MarketplaceTemplate: React.FC<MarketplaceTemplateProps> = ({ styles }) => {
  const { droppedElements, editMode } = useCanvasState();
  const [view, setView] = useState<"grid" | "list">("grid");
  
  // Filter template components meant for this template
  const templateComponents = droppedElements.filter(
    el => el.type === "template-component" && el.content
  );
  
  // Mock featured NFTs for template
  const featuredNFTs = [
    {
      id: "1",
      name: "Digital Dreamscape #42",
      image: "https://via.placeholder.com/400x400/4F46E5/FFFFFF?text=Featured+1",
      creator: "Digital Dreams Studio",
      price: "0.85",
      likes: 342
    },
    {
      id: "2",
      name: "Neon Warrior #15",
      image: "https://via.placeholder.com/400x400/10B981/FFFFFF?text=Featured+2",
      creator: "NeonArtLab",
      price: "1.2",
      likes: 221
    },
    {
      id: "3",
      name: "Cosmic Journey #7",
      image: "https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Featured+3",
      creator: "Cosmic Creators",
      price: "0.75",
      likes: 189
    },
    {
      id: "4",
      name: "Abstract Reality #19",
      image: "https://via.placeholder.com/400x400/EC4899/FFFFFF?text=Featured+4",
      creator: "Abstract Studios",
      price: "2.5",
      likes: 278
    }
  ];
  
  // Group the template sections into an array for easier manipulation
  const templateSections = [
    { id: "header", component: <MarketplaceHeader styles={styles} /> },
    { id: "hero", component: <MarketplaceHero styles={styles} /> },
    { id: "featured", component: <FeaturedNFTs styles={styles} nfts={featuredNFTs} /> },
    { id: "collections", component: <FeaturedCollections styles={styles} /> },
    { id: "top", component: <TopCollections styles={styles} /> },
    { id: "footer", component: <MarketplaceFooter styles={styles} /> }
  ];

  // Function to render template with injected components
  const renderTemplateWithComponents = () => {
    // If no template components were dropped, just render the normal sections
    if (templateComponents.length === 0) {
      return templateSections.map((section) => (
        <div key={section.id} className="w-full">
          {section.component}
        </div>
      ));
    }

    // Sort template components by y position
    const sortedComponents = [...templateComponents].sort((a, b) => a.y - b.y);
    
    // Initialize output with the first section
    let result = [<div key="section-0" className="w-full">{templateSections[0].component}</div>];
    
    // Insert components at appropriate positions between sections
    sortedComponents.forEach((component, index) => {
      // Calculate which section this component should appear after
      // Normalize y value to map to section indices
      const sectionPosition = Math.min(
        Math.floor((component.y / 1000) * (templateSections.length - 1)) + 1,
        templateSections.length - 1
      );
      
      // Add the component
      result.push(
        <div 
          key={`component-${component.id}`} 
          className="w-full py-4 border-y border-dashed border-theme-primary/30"
          style={{ minHeight: "100px" }}
        >
          <div className="text-center text-theme-primary py-4">
            {editMode ? `Dropped Component: ${component.content}` : null}
          </div>
        </div>
      );
      
      // Add the next section if available
      if (sectionPosition < templateSections.length) {
        result.push(
          <div key={`section-${sectionPosition}`} className="w-full">
            {templateSections[sectionPosition].component}
          </div>
        );
      }
    });

    // Add remaining sections that weren't added
    const lastAddedSection = result.length / 2; // Considering components and sections
    for (let i = lastAddedSection; i < templateSections.length; i++) {
      result.push(
        <div key={`section-${i}`} className="w-full">
          {templateSections[i].component}
        </div>
      );
    }

    return result;
  };

  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      {renderTemplateWithComponents()}
    </div>
  );
};

// Featured NFTs component for the marketplace template
const FeaturedNFTs: React.FC<{ styles: TemplateStyles; nfts: any[] }> = ({ styles, nfts }) => {
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

// MarketplaceFooter component
const MarketplaceFooter: React.FC<{ styles: TemplateStyles }> = ({ styles }) => {
  return (
    <footer 
      className="w-full px-6 py-8 border-t"
      style={{ 
        backgroundColor: styles.headerBg,
        borderColor: styles.borderColor,
        color: styles.headerTextColor
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <EditableComponent initialText="NFT Market" isHeading={true} />
            </div>
            <p className="text-sm opacity-70 mb-4">
              <EditableComponent initialText="The world's largest digital marketplace for crypto collectibles and non-fungible tokens." />
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"></div>
            </div>
          </div>
          
          <div>
            <div className="text-lg font-medium mb-4">
              <EditableComponent initialText="Marketplace" isHeading={true} />
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="All NFTs" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Art" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Collectibles" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Photography" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Virtual Worlds" /></a></li>
            </ul>
          </div>
          
          <div>
            <div className="text-lg font-medium mb-4">
              <EditableComponent initialText="My Account" isHeading={true} />
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Profile" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Favorites" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Watchlist" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="My Collections" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Settings" /></a></li>
            </ul>
          </div>
          
          <div>
            <div className="text-lg font-medium mb-4">
              <EditableComponent initialText="Resources" isHeading={true} />
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Help Center" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Platform Status" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Partners" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Blog" /></a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Newsletter" /></a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm opacity-70 mb-4 md:mb-0">
            <EditableComponent initialText="© 2023 NFT Market. All rights reserved." />
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Privacy Policy" /></a>
            <a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Terms of Service" /></a>
            <a href="#" className="hover:text-purple-400 transition-colors"><EditableComponent initialText="Cookie Policy" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketplaceTemplate;
