import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MarketplaceCard from "../components/MarketplaceCard";
import { Search, Filter, ArrowUpDown, Grid, List, ArrowRight } from "lucide-react";

const Marketplace: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  
  const themes = [
    {
      name: "Digital Dreamer",
      author: "CryptoArtist",
      price: "0.05 ETH",
      likes: 284,
      downloads: 126,
      image: "https://images.unsplash.com/photo-1583599187096-6be78eb29616?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      colors: ["#FF00FF", "#00FFFF", "#FF00A0", "#120458"]
    },
    {
      name: "Abstract Reality",
      author: "Web3Studio",
      price: "0.02 ETH",
      likes: 157,
      downloads: 89,
      image: "https://images.unsplash.com/photo-1599837565318-25315069a19c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      colors: ["#000000", "#FFFFFF", "#333333", "#EEEEEE"]
    },
    {
      name: "Neon Genesis",
      author: "DesignDAO",
      price: "0.03 ETH",
      likes: 203,
      downloads: 112,
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      colors: ["#FFD1DC", "#E0BBE4", "#957DAD", "#D291BC"]
    },
    {
      name: "Cyber Portrait",
      author: "EnterpriseNFT",
      price: "0.04 ETH",
      likes: 128,
      downloads: 76,
      image: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      colors: ["#1E3A8A", "#3B82F6", "#93C5FD", "#FFFFFF"]
    },
    {
      name: "Glitch Effect",
      author: "BlockchainUI",
      price: "0.025 ETH",
      likes: 219,
      downloads: 104,
      image: "https://images.unsplash.com/photo-1633421878789-32410e1831b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      colors: ["#121212", "#2D3748", "#805AD5", "#D53F8C"]
    },
    {
      name: "Pixelated Dreams",
      author: "8BitDesigns",
      price: "0.015 ETH",
      likes: 176,
      downloads: 93,
      image: "https://images.unsplash.com/photo-1575995872537-3793d29d9dfa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      colors: ["#FF4500", "#FFD700", "#00FF00", "#32174D"]
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">Theme Marketplace</h1>
              <p className="text-muted-foreground">Discover and purchase community-created themes for your Web3 sites</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link to="/editor" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors">
                Create Theme
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
          
          <div className="bg-card border border-border/60 rounded-lg shadow-subtle mb-8">
            <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search themes..."
                  className="block w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                />
              </div>
              
              <div className="flex space-x-2">
                <button className="px-3 py-2 border border-border rounded-md flex items-center text-sm hover:bg-muted transition-colors">
                  <Filter size={14} className="mr-2" />
                  Filter
                </button>
                <button className="px-3 py-2 border border-border rounded-md flex items-center text-sm hover:bg-muted transition-colors">
                  <ArrowUpDown size={14} className="mr-2" />
                  Sort
                </button>
                <div className="flex border border-border rounded-md overflow-hidden">
                  <button 
                    className={`p-2 flex items-center justify-center ${view === "grid" ? "bg-muted" : "hover:bg-muted"} transition-colors`}
                    onClick={() => setView("grid")}
                  >
                    <Grid size={16} />
                  </button>
                  <button 
                    className={`p-2 flex items-center justify-center ${view === "list" ? "bg-muted" : "hover:bg-muted"} transition-colors`}
                    onClick={() => setView("list")}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-semibold text-foreground">Featured Themes</h2>
              <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.slice(0, 3).map((theme, index) => (
                <MarketplaceCard key={index} theme={theme} />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-semibold text-foreground">Popular Themes</h2>
              <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.slice(3).map((theme, index) => (
                <MarketplaceCard key={index} theme={theme} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <section className="bg-foreground text-background py-10 border-t border-border/40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 max-w-md">
              <h2 className="text-2xl font-display font-bold mb-2">Create and Sell Your Themes</h2>
              <p className="text-background/80 mb-4">
                Join our community of designers and earn by selling your custom themes in the marketplace
              </p>
              <Link to="/editor" className="bg-background text-foreground hover:bg-background/90 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center transition-colors">
                Start Creating
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="max-w-md">
              <div className="bg-gradient-to-br from-theme-primary/20 to-theme-accent/20 rounded-lg p-5 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center mr-3">
                    <Filter size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Monetize Your Creativity</h3>
                    <p className="text-white/70 text-sm">Set your own prices and earn crypto</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center mr-3">
                    <Grid size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Build Your Brand</h3>
                    <p className="text-white/70 text-sm">Grow your reputation as a Web3 designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-muted/30 border-t border-border/40 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-display text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-secondary">
                Culture Vault
              </div>
            </div>
            
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketplace;
