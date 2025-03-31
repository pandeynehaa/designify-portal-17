
import React, { useState, DragEvent } from "react";
import { 
  Grid, BookOpen, Heart, Users, CreditCard, 
  Wallet, ShoppingCart, Star, Package, CircleDollarSign,
  ChevronDown, ChevronRight, Search, Plus, Layers 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Define proper interface for component items
interface ComponentItem {
  name: string;
  icon: React.FC<any>; // Using any for simplicity with Lucide icons
  isTemplate?: boolean;
  type?: string;
}

// Define category interface
interface ComponentCategory {
  id: string;
  label: string;
  items: ComponentItem[];
}

const ComponentsTab: React.FC = () => {
  const [componentsExpanded, setComponentsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const componentCategories: ComponentCategory[] = [
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
        { name: "Container", icon: Layers },
        { name: "Grid", icon: Grid },
        { name: "Flex", icon: Layers },
        { name: "Divider", icon: Layers }
      ] 
    },
    { 
      id: "template", 
      label: "Template Sections", 
      items: [
        { name: "Hero Section", icon: Layers, isTemplate: true, type: "hero" },
        { name: "Features Section", icon: Star, isTemplate: true, type: "features" },
        { name: "NFT Gallery", icon: Grid, isTemplate: true, type: "gallery" },
        { name: "Collection Grid", icon: Grid, isTemplate: true, type: "collection-grid" },
        { name: "Pricing Table", icon: CircleDollarSign, isTemplate: true, type: "pricing" },
        { name: "FAQ Section", icon: Users, isTemplate: true, type: "faq" }
      ] 
    }
  ];

  // Handle dragging of components
  const handleDragStart = (e: DragEvent<HTMLDivElement>, component: any) => {
    if (component.isTemplate) {
      // For template components, use a different data type
      e.dataTransfer.setData("application/template-component", JSON.stringify({
        type: component.type,
        name: component.name
      }));
    } else {
      // Regular components use the existing data type
      e.dataTransfer.setData("application/component", JSON.stringify(component));
    }
    
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
                  className={`flex items-center px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-grab ${
                    item.isTemplate ? 'border-l-2 border-theme-primary/30' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, { 
                    name: item.name, 
                    category: category.id,
                    isTemplate: item.isTemplate,
                    type: item.type
                  })}
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
  );
};

export default ComponentsTab;
