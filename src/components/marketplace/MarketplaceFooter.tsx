
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Filter, Grid } from "lucide-react";

const MarketplaceFooter: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default MarketplaceFooter;
