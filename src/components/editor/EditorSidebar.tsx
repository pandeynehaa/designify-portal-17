
import React from "react";
import { Grid } from "lucide-react";
import SidebarTabs from "./sidebar/SidebarTabs";
import ComponentsTab from "./sidebar/ComponentsTab";
import ImagesTab from "./sidebar/ImagesTab";
import ThemeTab from "./sidebar/ThemeTab";
import AIThemeGenerator from "./sidebar/AIThemeGenerator";

interface EditorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="editor-panel w-64 flex flex-col h-full bg-white border-r border-gray-200 shadow-sm">
      <div className="editor-toolbar justify-between bg-white border-b border-gray-200">
        <span className="text-gray-800 text-sm font-medium">Design Tools</span>
        <button className="editor-button p-1.5 text-gray-600 hover:text-gray-900">
          <Grid size={14} />
        </button>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === "components" && <ComponentsTab />}
        {activeTab === "images" && <ImagesTab />}
        {activeTab === "theme" && <ThemeTab />}
      </div>
      
      <AIThemeGenerator />
    </div>
  );
};

export default EditorSidebar;
