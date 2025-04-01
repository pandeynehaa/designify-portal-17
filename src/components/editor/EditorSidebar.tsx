
import React from "react";
import SidebarTabs from "./SidebarTabs";
import BackgroundTab from "./sidebar/BackgroundTab";
import ComponentsTab from "./sidebar/ComponentsTab";
import ImagesTab from "./sidebar/ImagesTab";
import LayersTab from "./sidebar/LayersTab";
import NFTsTab from "./sidebar/NFTsTab";
import ThemeTab from "./sidebar/ThemeTab";
import AIThemeGenerator from "./sidebar/AIThemeGenerator";
import { ChevronLeft } from "lucide-react";
import { useCanvasUIState } from "@/hooks/useCanvasUIState";

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
  const { showLeftSidebar, toggleLeftSidebar } = useCanvasUIState();
  
  return (
    <div className={`h-full flex flex-col bg-cv-gray border-r border-cv-lightgray transition-all duration-300 ${
      showLeftSidebar ? 'w-56' : 'w-10'
    }`}>
      <div className="flex items-center justify-between border-b border-cv-lightgray">
        {showLeftSidebar ? (
          <>
            <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <button 
              onClick={toggleLeftSidebar}
              className="p-2 text-cv-white hover:text-cv-accent"
            >
              <ChevronLeft size={16} />
            </button>
          </>
        ) : (
          <button 
            onClick={toggleLeftSidebar}
            className="p-2 mx-auto text-cv-white hover:text-cv-accent"
          >
            <ChevronLeft size={16} className="transform rotate-180" />
          </button>
        )}
      </div>
      
      {showLeftSidebar && (
        <div className="flex-1 overflow-y-auto">
          {activeTab === "background" && <BackgroundTab />}
          {activeTab === "components" && <ComponentsTab />}
          {activeTab === "images" && <ImagesTab extractedImages={extractedImages} />}
          {activeTab === "layers" && <LayersTab />}
          {activeTab === "items" && <NFTsTab />}
          {activeTab === "theme" && <ThemeTab />}
        </div>
      )}
      
      {showLeftSidebar && <AIThemeGenerator />}
    </div>
  );
};

export default EditorSidebar;
