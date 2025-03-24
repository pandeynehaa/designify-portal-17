
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layout, Wand2, Palette, Zap, Users, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-background to-primary/5 border-b border-border/40 overflow-hidden py-20">
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4 animate-fade-in">
                New Feature • Culture Vault SaaS
              </div>
              
              <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-foreground mb-6 animate-fade-in">
                AI-Powered Design <br className="hidden md:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-theme-secondary">Editor and Theme Mapper</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
                Customize your Web3 templates with our intuitive design editor,<br className="hidden md:block" /> intelligent theme extraction, and marketplace integration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Link to="/editor" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors">
                  Try Design Editor
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                
                <Link to="/marketplace" className="bg-background border border-border hover:bg-muted text-foreground px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors">
                  Explore Themes
                </Link>
              </div>
            </div>
            
            <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-[800px] h-[350px] opacity-10 bg-gradient-to-r from-primary to-theme-secondary blur-3xl rounded-full"></div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 animate-slide-in">
                Powerful features for Web3 creators
              </h2>
              <p className="text-lg text-muted-foreground animate-slide-in">
                Seamlessly customize your Web3 templates with our comprehensive suite of design tools
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-card border border-border/60 rounded-xl p-6 hover:shadow-subtle transition-all duration-300 hover:border-primary/40 animate-slide-in">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <Layout size={24} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Puck Editor</h3>
                <p className="text-muted-foreground mb-4">
                  Drag-and-drop interface for customizing typography, effects, images, backgrounds, and more.
                </p>
                <Link to="/editor" className="inline-flex items-center text-primary font-medium">
                  Try Editor
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="bg-card border border-border/60 rounded-xl p-6 hover:shadow-subtle transition-all duration-300 hover:border-primary/40 animate-slide-in" style={{ animationDelay: "0.1s" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-theme-secondary/10 text-theme-secondary mb-4">
                  <Palette size={24} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Theme Mapper</h3>
                <p className="text-muted-foreground mb-4">
                  Manually input brand styling, choose from predefined themes, and apply them across all templates.
                </p>
                <Link to="/editor" className="inline-flex items-center text-primary font-medium">
                  Design Themes
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="bg-card border border-border/60 rounded-xl p-6 hover:shadow-subtle transition-all duration-300 hover:border-primary/40 animate-slide-in" style={{ animationDelay: "0.2s" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-theme-accent/10 text-theme-accent mb-4">
                  <Wand2 size={24} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">AI Design Scraper</h3>
                <p className="text-muted-foreground mb-4">
                  Extract design elements from any URL and automatically apply them to your Web3 templates.
                </p>
                <Link to="/editor" className="inline-flex items-center text-primary font-medium">
                  Extract Themes
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-muted/30 border-y border-border/40">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="inline-block px-3 py-1 bg-theme-accent/10 border border-theme-accent/20 rounded-full text-theme-accent text-sm font-medium mb-4">
                  Fast Implementation
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                  Designed for all four <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-primary to-theme-accent">Web3 site templates</span>
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-theme-success/10 flex items-center justify-center text-theme-success">
                      <Zap size={14} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium">Web3 Marketplace</h3>
                      <p className="text-muted-foreground">For NFT trading, storefronts, and digital asset commerce</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-theme-success/10 flex items-center justify-center text-theme-success">
                      <Zap size={14} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium">Drops Page</h3>
                      <p className="text-muted-foreground">For minting and releasing new digital assets</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-theme-success/10 flex items-center justify-center text-theme-success">
                      <Zap size={14} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium">Token-Gated Websites</h3>
                      <p className="text-muted-foreground">For exclusive content and member-only access</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-theme-success/10 flex items-center justify-center text-theme-success">
                      <Zap size={14} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium">Buy Coin Page</h3>
                      <p className="text-muted-foreground">For cryptocurrency sales and token purchases</p>
                    </div>
                  </div>
                </div>
                <Link to="/editor" className="inline-flex items-center bg-foreground text-background px-6 py-3 rounded-lg font-medium transition-colors hover:bg-foreground/90">
                  Get Started
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
              
              <div className="relative animate-slide-in-right">
                <div className="relative z-10 p-2 bg-background rounded-xl border border-border/60 shadow-lg">
                  <div className="h-12 bg-muted rounded-t-lg flex items-center px-4 space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 bg-white/10 h-6 w-64 rounded"></div>
                  </div>
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-800 rounded-b-lg flex items-center justify-center">
                    <div className="w-3/4 aspect-square bg-gradient-to-br from-theme-secondary/20 to-theme-primary/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/30 to-theme-secondary/30 backdrop-blur-sm"></div>
                      <div className="relative z-10 text-white text-xl font-display font-bold">AI Design Editor</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-[20%] -right-8 w-32 h-32 bg-theme-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] -left-8 w-24 h-24 bg-theme-accent/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block px-3 py-1 bg-theme-secondary/10 border border-theme-secondary/20 rounded-full text-theme-secondary text-sm font-medium mb-4 animate-fade-in">
                Coming Soon
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 animate-slide-in">
                Theme Marketplace
              </h2>
              <p className="text-lg text-muted-foreground animate-slide-in">
                Buy, sell, and share community-generated themes with crypto-powered transactions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for theme marketplace items */}
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-border/60 rounded-xl p-6 animate-slide-in">
                <div className="text-center">
                  <Users size={32} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-lg font-medium">Community Themes</p>
                  <p className="text-sm text-muted-foreground">Coming in Phase 2</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-border/60 rounded-xl p-6 animate-slide-in" style={{ animationDelay: "0.1s" }}>
                <div className="text-center">
                  <Wand2 size={32} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-lg font-medium">AI-Generated Designs</p>
                  <p className="text-sm text-muted-foreground">Coming in Phase 2</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-border/60 rounded-xl p-6 animate-slide-in" style={{ animationDelay: "0.2s" }}>
                <div className="text-center">
                  <Palette size={32} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-lg font-medium">Premium Templates</p>
                  <p className="text-sm text-muted-foreground">Coming in Phase 2</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-foreground text-background border-t border-border/40">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 animate-fade-in">
                Ready to transform your Web3 presence?
              </h2>
              <p className="text-xl text-background/80 mb-8 animate-fade-in">
                Start customizing your templates with our powerful design editor
              </p>
              <Link to="/editor" className="bg-background text-foreground hover:bg-background/90 px-8 py-4 rounded-lg font-medium inline-flex items-center transition-colors animate-fade-in">
                Get Started Now
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
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

export default Index;
