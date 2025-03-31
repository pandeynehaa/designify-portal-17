
import React from "react";
import { Grid } from "lucide-react";
import SidebarTabs from "./sidebar/SidebarTabs";
import ComponentsTab from "./sidebar/ComponentsTab";
import ImagesTab from "./sidebar/ImagesTab";
import ThemeTab from "./sidebar/ThemeTab";
import LayersTab from "./sidebar/LayersTab";
import AIThemeGenerator from "./sidebar/AIThemeGenerator";
import { toast } from "@/components/ui/use-toast";

interface EditorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ activeTab, setActiveTab }) => {
  const handleGridClick = () => {
    toast({
      title: "Panel Layout",
      description: "Panel layout options will be available soon"
    });
  };

  return (
    <div className="editor-panel w-64 flex flex-col h-full bg-cv-darkgray border-r border-cv-lightgray shadow-sm">
      <div className="editor-toolbar justify-between bg-cv-gray border-b border-cv-lightgray">
        <span className="text-cv-white text-sm font-medium">Design Tools</span>
        <button 
          className="editor-button p-1.5 text-cv-white hover:text-cv-white"
          onClick={handleGridClick}
        >
          <Grid size={14} />
        </button>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === "components" && <ComponentsTab />}
        {activeTab === "images" && <ImagesTab />}
        {activeTab === "layers" && <LayersTab />}
        {activeTab === "theme" && <ThemeTab />}
      </div>
      
      <AIThemeGenerator />
    </div>
  );
};

export default EditorSidebar;
