
import React from "react";
import { Grid, PanelLeft, PanelRight, Save } from "lucide-react";
import SidebarTabs from "./SidebarTabs"; 
import ComponentsTab from "./sidebar/ComponentsTab";
import ImagesTab from "./sidebar/ImagesTab";
import ThemeTab from "./sidebar/ThemeTab";
import LayersPanel from "./sidebar/LayersPanel";
import AIThemeGenerator from "./sidebar/AIThemeGenerator";
import NFTsTab from "./sidebar/NFTsTab";
import BackgroundTab from "./sidebar/BackgroundTab";
import SavedDesignsPanel from "./sidebar/SavedDesignsPanel";
import { toast } from "@/components/ui/use-toast";
import { useCanvasUIState } from "@/hooks/useCanvasUIState";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface EditorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { showLeftSidebar, toggleLeftSidebar } = useCanvasUIState();

  const handleGridClick = () => {
    toast({
      title: "Panel Layout",
      description: "Panel layout options will be available soon"
    });
  };

  return (
    <Collapsible
      open={showLeftSidebar}
      onOpenChange={toggleLeftSidebar}
      className="editor-panel w-64 flex flex-col h-full bg-cv-darkgray border-r border-cv-lightgray shadow-sm transition-all duration-300 ease-in-out"
    >
      <div className="editor-toolbar justify-between bg-cv-gray border-b border-cv-lightgray">
        <span className="text-cv-white text-sm font-medium">Design Tools</span>
        <div className="flex items-center gap-2">
          <button 
            className="editor-button p-1.5 text-cv-white hover:text-cv-white"
            onClick={handleGridClick}
          >
            <Grid size={14} />
          </button>
          <CollapsibleTrigger asChild>
            <button className="editor-button p-1.5 text-cv-white hover:text-cv-white">
              <PanelLeft size={14} />
            </button>
          </CollapsibleTrigger>
        </div>
      </div>
      
      <CollapsibleContent className="flex flex-col flex-1 overflow-y-auto">
        <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === "components" && <ComponentsTab />}
        {activeTab === "images" && <ImagesTab />}
        {activeTab === "items" && <NFTsTab />}
        {activeTab === "layers" && <LayersPanel />}
        {activeTab === "saved" && <SavedDesignsPanel />}
        {activeTab === "theme" && <ThemeTab />}
        {activeTab === "background" && <BackgroundTab />}
      </CollapsibleContent>
      
      <AIThemeGenerator />
    </Collapsible>
  );
};

export default EditorSidebar;
