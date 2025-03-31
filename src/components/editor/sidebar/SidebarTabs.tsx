
import React from "react";
import { 
  Layers, 
  PanelTop, 
  Image, 
  Grid3X3, 
  Palette, 
  Bookmark,
  CircleDashed 
} from "lucide-react";

interface SidebarTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: "components", icon: <Grid3X3 size={18} />, label: "Components" },
  { id: "images", icon: <Image size={18} />, label: "Images" },
  { id: "items", icon: <CircleDashed size={18} />, label: "NFTs" },
  { id: "layers", icon: <Layers size={18} />, label: "Layers" },
  { id: "saved", icon: <Bookmark size={18} />, label: "Saved" },
  { id: "theme", icon: <Palette size={18} />, label: "Theme" },
  { id: "background", icon: <PanelTop size={18} />, label: "Background" }
];

const SidebarTabs: React.FC<SidebarTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex overflow-x-auto bg-cv-gray border-b border-cv-lightgray">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`flex-1 flex flex-col items-center justify-center py-2 px-1 min-w-[70px] transition-colors ${
            activeTab === tab.id
              ? "text-cv-accent border-b-2 border-cv-accent"
              : "text-cv-white hover:text-cv-lightgray hover:bg-cv-lightgray/10"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          <div className="mb-1">{tab.icon}</div>
          <span className="text-xs font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SidebarTabs;
