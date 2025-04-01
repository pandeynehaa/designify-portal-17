
import React, { useState, DragEvent } from "react";
import { 
  Grid, BookOpen, Heart, Users, CreditCard, 
  Wallet, ShoppingCart, Star, Package, CircleDollarSign,
  ChevronDown, ChevronRight, Search, Plus, Layers,
  Image, ArrowRight, Check, Menu, X, Table, Toggle,
  LayoutGrid, Rows, Columns, SeparatorHorizontal, 
  ArrowUpDown, FileBox
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
          description: "Display an NFT with image, title, price and like count"
        },
        { 
          name: "Wallet Connect Button", 
          icon: Wallet,
          description: "Interactive button for connecting Web3 wallets"
        },
        { 
          name: "Token Gate", 
          icon: CreditCard,
          description: "Verify token ownership to access gated content" 
        },
        { 
          name: "Price Display", 
          icon: CircleDollarSign,
          description: "Live cryptocurrency price with change percentage"
        },
        { 
          name: "NFT Gallery Grid", 
          icon: Grid,
          description: "Display multiple NFTs in a responsive grid layout"
        },
        { 
          name: "Collection List", 
          icon: Package,
          description: "List of NFT collections with floor prices and stats"
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
          description: "Main call-to-action button with vibrant background"
        },
        { 
          name: "Secondary Button", 
          icon: ArrowRight,
          description: "Outlined button for secondary actions with icon"
        },
        { 
          name: "Feature Card", 
          icon: Star,
          description: "Showcase a feature with icon, title and description"
        },
        { 
          name: "Data Table", 
          icon: Table,
          description: "Tabular data with headers and sortable columns"
        },
        { 
          name: "Star Rating", 
          icon: Star,
          description: "Display user ratings with interactive star icons"
        },
        { 
          name: "Testimonial Card", 
          icon: Users,
          description: "Customer testimonial with avatar, quote and rating"
        },
        { 
          name: "Toggle Switch", 
          icon: Toggle,
          description: "On/off toggle switch for settings and preferences"
        },
        { 
          name: "Modal Dialog", 
          icon: FileBox,
          description: "Pop-up dialog for confirmations and user inputs"
        }
      ] 
    },
    { 
      id: "layout", 
      label: "Layout Components", 
      items: [
        { 
          name: "Container", 
          icon: LayoutGrid,
          description: "Content wrapper with responsive padding and max-width"
        },
        { 
          name: "Flex Row", 
          icon: Rows,
          description: "Horizontal flex container for aligning elements in a row"
        },
        { 
          name: "Flex Column", 
          icon: Columns,
          description: "Vertical flex container for stacking elements"
        },
        { 
          name: "Divider", 
          icon: SeparatorHorizontal,
          description: "Horizontal divider line with optional label"
        },
        { 
          name: "Spacer", 
          icon: ArrowUpDown,
          description: "Adjustable vertical or horizontal spacing element"
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
          description: "Full-width banner with headline, CTA and background"
        },
        { 
          name: "Features Section", 
          icon: Star, 
          isTemplate: true, 
          type: "features",
          description: "Three-column grid showcasing key product features"
        },
        { 
          name: "NFT Gallery", 
          icon: Grid, 
          isTemplate: true, 
          type: "gallery",
          description: "Masonry grid layout for showcasing NFT collections" 
        },
        { 
          name: "Collection Grid", 
          icon: Grid, 
          isTemplate: true, 
          type: "collection-grid",
          description: "Showcase featured collections with hover effects"
        },
        { 
          name: "Pricing Table", 
          icon: CircleDollarSign, 
          isTemplate: true, 
          type: "pricing",
          description: "Compare pricing plans with features and CTAs"
        },
        { 
          name: "FAQ Section", 
          icon: Users, 
          isTemplate: true, 
          type: "faq",
          description: "Collapsible frequently asked questions with answers"
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
