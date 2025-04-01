
import { 
  Grid, BookOpen, Heart, Users, CreditCard, 
  Wallet, ShoppingCart, Star, Package, CircleDollarSign,
  Layers, Plus, Image as ImageIcon, ArrowRight, Check, Menu, X, Table,
  LayoutGrid, Rows, Columns, SeparatorHorizontal, 
  ArrowUpDown, FileBox
} from "lucide-react";
import { ComponentCategory } from "@/types/componentLibraryTypes";

export const componentCategories: ComponentCategory[] = [
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
        name: "Toggle", 
        icon: Menu,
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
