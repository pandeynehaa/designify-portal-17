
import React, { useState, DragEvent } from "react";
import { 
  Layout, Type, Image, Layers, 
  Grid, Palette, Wand2, Shapes, Sparkles,
  ChevronRight, ChevronDown, Search, Plus,
  BookOpen, Heart, Users, CreditCard, Wallet,
  ShoppingCart, Star, Package, CircleDollarSign
} from "lucide-react";
import { toast } from "../ui/use-toast";

interface EditorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ activeTab, setActiveTab }) => {
  const [componentsExpanded, setComponentsExpanded] = useState(true);
  const [imagesExpanded, setImagesExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
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
    { 
      id: "web3", 
      label: "Web3 Components", 
      items: [
        { name: "NFT Card", icon: BookOpen },
        { name: "Wallet Connect", icon: Wallet },
        { name: "Token Gate", icon: CreditCard },
        { name: "Price Display", icon: CircleDollarSign },
        { name: "Gallery Grid", icon: Grid },
        { name: "Collection List", icon: Package }
      ] 
    },
    { 
      id: "ui", 
      label: "UI Components", 
      items: [
        { name: "Button", icon: Plus },
        { name: "Card", icon: Layers },
        { name: "Modal", icon: Layers },
        { name: "Table", icon: Grid },
        { name: "Rating", icon: Star },
        { name: "Testimonial", icon: Users }
      ] 
    },
    { 
      id: "layout", 
      label: "Layout", 
      items: [
        { name: "Container", icon: Layout },
        { name: "Grid", icon: Grid },
        { name: "Flex", icon: Layout },
        { name: "Divider", icon: Layout }
      ] 
    },
  ];

  // Sample images for the Images tab
  const sampleImages = [
    { id: "img1", url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300", label: "Woman with Laptop" },
    { id: "img2", url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300", label: "Laptop Screen" },
    { id: "img3", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300", label: "Circuit Board" },
    { id: "img4", url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300", label: "Code Screen" },
    { id: "img5", url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300", label: "MacBook User" },
  ];

  // Handle dragging of components
  const handleDragStart = (e: DragEvent<HTMLDivElement>, component: any) => {
    e.dataTransfer.setData("application/component", JSON.stringify(component));
    e.dataTransfer.effectAllowed = "copy";
    
    // Show visual feedback
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.zIndex = '50';
    }
    
    // Reset the drop overlay after dragging ends
    const resetOverlay = () => {
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.zIndex = '0';
      }
      window.removeEventListener('dragend', resetOverlay);
    };
    
    window.addEventListener('dragend', resetOverlay);
  };
  
  // Handle dragging of images
  const handleImageDragStart = (e: DragEvent<HTMLDivElement>, image: any) => {
    e.dataTransfer.setData("application/image", JSON.stringify(image));
    e.dataTransfer.effectAllowed = "copy";
    
    // Show visual feedback
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.zIndex = '50';
    }
    
    // Reset the drop overlay after dragging ends
    const resetOverlay = () => {
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.zIndex = '0';
      }
      window.removeEventListener('dragend', resetOverlay);
    };
    
    window.addEventListener('dragend', resetOverlay);
  };

  // Filter components based on search query
  const filteredCategories = componentCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="editor-panel w-64 flex flex-col h-full bg-white border-r border-gray-200 shadow-sm">
      <div className="editor-toolbar justify-between bg-white border-b border-gray-200">
        <span className="text-gray-800 text-sm font-medium">Design Tools</span>
        <button className="editor-button p-1.5 text-gray-600 hover:text-gray-900">
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
                  ? "bg-theme-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <tab.icon size={16} className="mr-3" />
              {tab.label}
            </button>
          ))}
        </div>
        
        {activeTab === "components" && (
          <div className="p-2 border-t border-gray-200">
            <div className="px-2 pb-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search components..."
                  className="w-full py-1.5 pl-9 pr-3 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {filteredCategories.map((category) => (
              <div key={category.id} className="mb-3">
                <button 
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
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
                  <div className="ml-2 pl-2 border-l border-gray-200 mt-1">
                    {category.items.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-grab"
                        draggable
                        onDragStart={(e) => handleDragStart(e, { name: item.name, category: category.id })}
                      >
                        <item.icon size={14} className="mr-2 opacity-70" />
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "images" && (
          <div className="p-2 border-t border-gray-200">
            <div className="mb-3">
              <button 
                className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setImagesExpanded(!imagesExpanded)}
              >
                <span>Stock Images</span>
                {imagesExpanded ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
              
              {imagesExpanded && (
                <div className="grid grid-cols-2 gap-2 mt-2 px-2">
                  {sampleImages.map((image) => (
                    <div 
                      key={image.id}
                      className="cursor-grab relative group"
                      draggable
                      onDragStart={(e) => handleImageDragStart(e, image)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.label} 
                        className="w-full h-20 object-cover rounded-md border border-gray-200 group-hover:border-theme-primary/50 transition-colors"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-md transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-xs text-white font-medium px-2 py-1 rounded bg-black/70">Drag me</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="px-3 py-2">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 hover:border-theme-primary/30 transition-colors">
                <p className="text-sm text-gray-500">
                  Drag & drop images here <br /> or click to upload
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "theme" && (
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-xs font-medium text-gray-700 mb-2">Current Theme</div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-theme-primary"></div>
                <div className="w-6 h-6 rounded-full bg-theme-secondary"></div>
                <div className="w-6 h-6 rounded-full bg-theme-accent"></div>
                <div className="w-6 h-6 rounded-full bg-theme-neutral"></div>
              </div>
              <button className="w-full py-1.5 px-3 bg-theme-primary text-white rounded-md text-sm font-medium hover:bg-theme-primary/90 transition-colors">
                Edit Theme
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-1.5 px-3 bg-theme-primary text-white rounded-md text-sm font-medium hover:bg-theme-primary/90 transition-colors flex items-center justify-center">
          <Wand2 size={14} className="mr-2" />
          AI Theme Generator
        </button>
      </div>
    </div>
  );
};

export default EditorSidebar;
