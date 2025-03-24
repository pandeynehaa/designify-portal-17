
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Settings, User, ChevronDown, ExternalLink } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="h-16 px-6 border-b border-border/40 bg-background/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center">
          <span className="font-display text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-secondary">
            Culture Vault
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/editor" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
            Design Editor
          </Link>
          <Link to="/marketplace" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Marketplace
          </Link>
          <Link to="/themes" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Themes
          </Link>
          <div 
            className="flex items-center space-x-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>Templates</span>
            <ChevronDown size={14} />
            
            {dropdownOpen && (
              <div className="absolute top-12 bg-popover border border-border rounded-lg shadow-lg py-2 w-48 animate-fade-in">
                <Link to="/templates/marketplace" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                  Marketplace
                </Link>
                <Link to="/templates/drops" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                  Drops Page
                </Link>
                <Link to="/templates/token-gate" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                  Token Gate
                </Link>
                <Link to="/templates/buy-coin" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                  Buy Coin
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <a href="http://www.my.culturevault.com/saas" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-xs font-medium text-foreground/60 hover:text-foreground/80 transition-colors">
          <span>Live Site</span>
          <ExternalLink size={12} />
        </a>
        
        <button className="p-2 rounded-full hover:bg-muted transition-colors">
          <Bell size={18} className="text-foreground/70" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-muted transition-colors">
          <Settings size={18} className="text-foreground/70" />
        </button>
        
        <div className="h-8 w-8 rounded-full bg-theme-primary/10 border border-theme-primary/20 flex items-center justify-center">
          <User size={16} className="text-theme-primary" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
