
import React, { useState } from "react";
import { 
  Layout, Type, Image, Square, Layers, 
  Grid, Palette, Wand2, Shapes, Sparkles,
  ChevronRight, ChevronDown
} from "lucide-react";

interface EditorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ activeTab, setActiveTab }) => {
  const [componentsExpanded, setComponentsExpanded] = useState(true);
  
  const tabs = [
    { id: "layout", icon: Layout, label: "Layout" },
    { id: "typography", icon: Type, label: "Typography" },
    { id: "images", icon: Image, label: "Images" },
    { id: "components", icon: Layers, label: "Components" },
    { id: "colors", icon: Palette, label: "Colors" },
    { id: "effects", icon: Sparkles, label: "Effects" },
    { id: "theme", icon: Wand2, label: "Theme" },
  ];
  
  const componentCategories = [
    { id: "web3", label: "Web3 Components", items: ["NFT Card", "Wallet Connect", "Token Gate", "Price Display"] },
    { id: "ui", label: "UI Components", items: ["Button", "Card", "Modal", "Table"] },
    { id: "layout", label: "Layout", items: ["Container", "Grid", "Flex", "Divider"] },
  ];

  return (
    <div className="editor-panel w-64 flex flex-col h-full">
      <div className="editor-toolbar justify-between">
        <span className="text-editor-text text-sm font-medium">Editor Tools</span>
        <button className="editor-button p-1.5">
          <Grid size={14} />
        </button>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-editor-accent text-white"
                  : "text-editor-text hover:bg-editor-surface"
              }`}
            >
              <tab.icon size={16} className="mr-3" />
              {tab.label}
            </button>
          ))}
        </div>
        
        {activeTab === "components" && (
          <div className="p-2 border-t border-editor-border">
            {componentCategories.map((category) => (
              <div key={category.id} className="mb-3">
                <button 
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-editor-text hover:bg-editor-surface"
                  onClick={() => setComponentsExpanded(!componentsExpanded)}
                >
                  <span>{category.label}</span>
                  {componentsExpanded ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>
                
                {componentsExpanded && (
                  <div className="ml-2 pl-2 border-l border-editor-border mt-1">
                    {category.items.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center px-3 py-1.5 rounded-md text-sm text-editor-muted hover:bg-editor-surface hover:text-editor-text transition-colors cursor-grab"
                      >
                        <Shapes size={14} className="mr-2 opacity-70" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "theme" && (
          <div className="p-4 border-t border-editor-border">
            <div className="bg-editor-surface p-3 rounded-md">
              <div className="text-xs font-medium text-editor-text mb-2">Current Theme</div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-theme-primary"></div>
                <div className="w-6 h-6 rounded-full bg-theme-secondary"></div>
                <div className="w-6 h-6 rounded-full bg-theme-accent"></div>
                <div className="w-6 h-6 rounded-full bg-theme-neutral"></div>
              </div>
              <button className="editor-button-primary w-full justify-center">
                Edit Theme
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-editor-border">
        <button className="editor-button-primary w-full justify-center flex items-center">
          <Wand2 size={14} className="mr-2" />
          AI Theme Generator
        </button>
      </div>
    </div>
  );
};

export default EditorSidebar;
