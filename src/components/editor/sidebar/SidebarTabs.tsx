
import React from "react";
import { 
  Layout, Type, Image, Layers, 
  Grid, Palette, Wand2, Sparkles
} from "lucide-react";

interface SidebarTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SidebarTabs: React.FC<SidebarTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "layout", icon: Layout, label: "Layout" },
    { id: "typography", icon: Type, label: "Typography" },
    { id: "images", icon: Image, label: "Images" },
    { id: "components", icon: Layers, label: "Components" },
    { id: "colors", icon: Palette, label: "Colors" },
    { id: "effects", icon: Sparkles, label: "Effects" },
    { id: "theme", icon: Wand2, label: "Theme" },
  ];

  return (
    <div className="p-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-theme-primary text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <tab.icon size={16} className="mr-3" />
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SidebarTabs;
