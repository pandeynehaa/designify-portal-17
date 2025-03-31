
import React from "react";
import { 
  Layout, Type, Image, Layers, 
  Palette, Wand2, Sparkles, Grid3X3,
  Package as ItemsIcon, ImageIcon
} from "lucide-react";

interface SidebarTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SidebarTabs: React.FC<SidebarTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "layout", icon: Layout, label: "Layout" },
    { id: "typography", icon: Type, label: "Typography" },
    { id: "background", icon: ImageIcon, label: "Background" },
    { id: "images", icon: Image, label: "Images" },
    { id: "components", icon: Grid3X3, label: "Components" },
    { id: "items", icon: ItemsIcon, label: "Items" },
    { id: "layers", icon: Layers, label: "Layers" },
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
              ? "bg-cv-accent text-cv-white"
              : "text-cv-white hover:bg-cv-lightgray"
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
