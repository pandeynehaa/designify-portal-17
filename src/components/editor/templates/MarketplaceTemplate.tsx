
import React, { useState } from "react";
import { TemplateStyles } from "../../../types/templateStyles";
import MarketplaceHeader from "./marketplace/MarketplaceHeader";
import MarketplaceHero from "./marketplace/MarketplaceHero";
import FeaturedCollections from "./marketplace/FeaturedCollections";
import TopCollections from "./marketplace/TopCollections";
import { useEditableText } from "../../../hooks/useEditableText";
import { useCanvasState } from "../../../hooks/useCanvasState";
import CanvasElements from "../CanvasElements";

interface MarketplaceTemplateProps {
  styles: TemplateStyles;
}

const MarketplaceTemplate: React.FC<MarketplaceTemplateProps> = ({ styles }) => {
  const { droppedElements, editMode } = useCanvasState();
  
  // Filter template components meant for this template
  const templateComponents = droppedElements.filter(
    el => el.type === "template-component" && el.content
  );
  
  // Group the template sections into an array for easier manipulation
  const templateSections = [
    { id: "header", component: <MarketplaceHeader styles={styles} /> },
    { id: "hero", component: <MarketplaceHero styles={styles} /> },
    { id: "featured", component: <FeaturedCollections styles={styles} /> },
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

// New MarketplaceFooter component
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
            <div className="text-2xl font-bold mb-4">NFT Market</div>
            <p className="text-sm opacity-70 mb-4">
              The world's largest digital marketplace for crypto collectibles and non-fungible tokens.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"></div>
            </div>
          </div>
          
          <div>
            <div className="text-lg font-medium mb-4">Marketplace</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors">All NFTs</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Art</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Collectibles</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Photography</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Virtual Worlds</a></li>
            </ul>
          </div>
          
          <div>
            <div className="text-lg font-medium mb-4">My Account</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Profile</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Favorites</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Watchlist</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">My Collections</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Settings</a></li>
            </ul>
          </div>
          
          <div>
            <div className="text-lg font-medium mb-4">Resources</div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Platform Status</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm opacity-70 mb-4 md:mb-0">
            © 2023 NFT Market. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketplaceTemplate;
