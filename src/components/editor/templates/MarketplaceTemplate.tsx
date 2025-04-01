
import React, { useState } from "react";
import { TemplateStyles } from "../../../types/templateStyles";
import MarketplaceHeader from "./marketplace/MarketplaceHeader";
import MarketplaceHero from "./marketplace/MarketplaceHero";
import FeaturedCollections from "./marketplace/FeaturedCollections";
import TopCollections from "./marketplace/TopCollections";
import FeaturedNFTs from "./marketplace/FeaturedNFTs";
import MarketplaceFooter from "./marketplace/MarketplaceFooter";
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

export default MarketplaceTemplate;
