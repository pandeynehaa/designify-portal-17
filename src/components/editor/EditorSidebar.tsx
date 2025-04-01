
import React from "react";
import SidebarTabs from "./SidebarTabs";
import BackgroundTab from "./sidebar/BackgroundTab";
import ComponentsTab from "./sidebar/ComponentsTab";
import ImagesTab from "./sidebar/ImagesTab";
import LayersTab from "./sidebar/LayersTab";
import NFTsTab from "./sidebar/NFTsTab";
import ThemeTab from "./sidebar/ThemeTab";
import AIThemeGenerator from "./sidebar/AIThemeGenerator";

export interface EditorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  extractedImages?: string[];
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ 
  activeTab, 
  setActiveTab,
  extractedImages = []
}) => {
  return (
    <div className="w-56 h-full flex flex-col bg-cv-gray border-r border-cv-lightgray">
      <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto">
        {activeTab === "background" && <BackgroundTab />}
        {activeTab === "components" && <ComponentsTab />}
        {activeTab === "images" && <ImagesTab extractedImages={extractedImages} />}
        {activeTab === "layers" && <LayersTab />}
        {activeTab === "nfts" && <NFTsTab />}
        {activeTab === "theme" && <ThemeTab />}
      </div>
      
      <AIThemeGenerator />
    </div>
  );
};

export default EditorSidebar;
