
import React, { useState, DragEvent } from "react";
import { 
  Grid, BookOpen, Heart, Users, CreditCard, 
  Wallet, ShoppingCart, Star, Package, CircleDollarSign,
  ChevronDown, ChevronRight, Search, Plus, Layers,
  Image, ArrowRight, Check, Menu, X
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Define proper interface for component items
interface ComponentItem {
  name: string;
  icon: React.FC<any>; // Using any for simplicity with Lucide icons
  description?: string;
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
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["web3", "ui"]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };
  
  const componentCategories: ComponentCategory[] = [
    { 
      id: "web3", 
      label: "Web3 Components", 
      items: [
        { 
          name: "NFT Card", 
          icon: BookOpen,
          description: "Display an NFT with image, name, and price"
        },
        { 
          name: "Wallet Connect Button", 
          icon: Wallet,
          description: "Button to connect cryptocurrency wallets"
        },
        { 
          name: "Token Gate", 
          icon: CreditCard,
          description: "Control access based on token ownership" 
        },
        { 
          name: "Price Display", 
          icon: CircleDollarSign,
          description: "Show cryptocurrency prices with optional charts"
        },
        { 
          name: "NFT Gallery Grid", 
          icon: Grid,
          description: "Display multiple NFTs in a responsive grid"
        },
        { 
          name: "Collection List", 
          icon: Package,
          description: "Show a list of NFT collections with stats"
        }
      ] 
    },
    { 
      id: "ui", 
      label: "UI Components", 
      items: [
        { 
          name: "Primary Button", 
          icon: Plus,
          description: "Main call-to-action button with hover effects"
        },
        { 
          name: "Secondary Button", 
          icon: ArrowRight,
          description: "Alternative action button with border styling"
        },
        { 
          name: "Feature Card", 
          icon: Layers,
          description: "Highlight key features with icon and text"
        },
        { 
          name: "Data Table", 
          icon: Grid,
          description: "Display tabular data with sorting options"
        },
        { 
          name: "Star Rating", 
          icon: Star,
          description: "Interactive rating component with 5 stars"
        },
        { 
          name: "Testimonial Card", 
          icon: Users,
          description: "Display user reviews with avatar and quote"
        },
        { 
          name: "Toggle Switch", 
          icon: Check,
          description: "On/off toggle switch for boolean settings"
        },
        { 
          name: "Modal Dialog", 
          icon: X,
          description: "Popup dialog with configurable content"
        }
      ] 
    },
    { 
      id: "layout", 
      label: "Layout Components", 
      items: [
        { 
          name: "Container", 
          icon: Layers,
          description: "Responsive container with padding controls"
        },
        { 
          name: "Flex Row", 
          icon: Grid,
          description: "Horizontal flex container for elements"
        },
        { 
          name: "Flex Column", 
          icon: Layers,
          description: "Vertical flex container for elements"
        },
        { 
          name: "Divider", 
          icon: Layers,
          description: "Horizontal rule with optional text label"
        },
        { 
          name: "Spacer", 
          icon: Layers,
          description: "Flexible empty space for layout control"
        }
      ] 
    },
    { 
      id: "template", 
      label: "Template Sections", 
      items: [
        { 
          name: "Hero Section", 
          icon: Layers, 
          isTemplate: true, 
          type: "hero",
          description: "Full-width banner with heading and CTA"
        },
        { 
          name: "Features Section", 
          icon: Star, 
          isTemplate: true, 
          type: "features",
          description: "Grid of feature cards with icons"
        },
        { 
          name: "NFT Gallery", 
          icon: Grid, 
          isTemplate: true, 
          type: "gallery",
          description: "Masonry grid of NFT cards" 
        },
        { 
          name: "Collection Grid", 
          icon: Grid, 
          isTemplate: true, 
          type: "collection-grid",
          description: "Featured collections in a responsive grid"
        },
        { 
          name: "Pricing Table", 
          icon: CircleDollarSign, 
          isTemplate: true, 
          type: "pricing",
          description: "Compare pricing tiers with features list"
        },
        { 
          name: "FAQ Section", 
          icon: Users, 
          isTemplate: true, 
          type: "faq",
          description: "Accordion of frequently asked questions"
        }
      ] 
    }
  ];

  // Handle dragging of components
  const handleDragStart = (e: DragEvent<HTMLDivElement>, component: any) => {
    if (component.isTemplate) {
      // For template components, use a different data type
      e.dataTransfer.setData("application/template-component", JSON.stringify({
        type: component.type,
        name: component.name,
        description: component.description
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
    
    toast({
      title: "Component Ready",
      description: "Drag to canvas to add component"
    });
  };

  // Filter components based on search query
  const filteredCategories = componentCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
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
            onClick={() => toggleCategory(category.id)}
          >
            <span>{category.label}</span>
            {expandedCategories.includes(category.id) ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
          
          {expandedCategories.includes(category.id) && (
            <div className="ml-2 pl-2 border-l border-gray-200 mt-1">
              {category.items.map((item, index) => (
                <div 
                  key={index}
                  className={`flex flex-col px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-grab ${
                    item.isTemplate ? 'border-l-2 border-theme-primary/30' : ''
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, { 
                    name: item.name, 
                    category: category.id,
                    isTemplate: item.isTemplate,
                    type: item.type,
                    description: item.description
                  })}
                >
                  <div className="flex items-center">
                    <item.icon size={14} className="mr-2 opacity-70" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.description && (
                    <span className="text-xs text-gray-500 mt-1 ml-6">{item.description}</span>
                  )}
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
