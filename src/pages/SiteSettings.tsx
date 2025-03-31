
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/Navbar";
import MarketplaceSettings from "../components/settings/MarketplaceSettings";
import DropsSettings from "../components/settings/DropsSettings";
import TokenGateSettings from "../components/settings/TokenGateSettings";
import BuyCoinSettings from "../components/settings/BuyCoinSettings";
import SettingsProgress from "../components/settings/SettingsProgress";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SiteSettings = () => {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [tabProgress, setTabProgress] = useState({
    marketplace: 0,
    drops: 0,
    "token-gate": 0,
    "buy-coin": 0
  });
  
  // Calculate overall progress
  const overallProgress = 
    Object.values(tabProgress).reduce((sum, value) => sum + value, 0) / 
    Object.keys(tabProgress).length;
  
  // Track changes in form data to update progress
  const handleFieldChange = (tab: string, percentage: number) => {
    setTabProgress(prev => ({
      ...prev,
      [tab]: percentage
    }));
  };

  // Handle save with confetti effect for gamification
  const handleSave = () => {
    // Show success toast with sparkle icon for gamification
    toast({
      title: "Settings Saved!",
      description: overallProgress >= 75 
        ? "You've completed most of your site settings. Great job!" 
        : "Your site settings have been saved successfully."
    });

    // Add a small progress boost as a reward for saving
    Object.keys(tabProgress).forEach(tab => {
      if (tabProgress[tab as keyof typeof tabProgress] > 0 && tabProgress[tab as keyof typeof tabProgress] < 100) {
        setTabProgress(prev => ({
          ...prev,
          [tab]: Math.min(100, prev[tab as keyof typeof tabProgress] + 5)
        }));
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-theme-primary text-white rounded-md hover:bg-theme-primary/90 transition-colors flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Save Settings
          </button>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Configure smart contract variables and backend settings for your Web3 sites.
          These settings will be used across your site to interact with blockchain functionality.
        </p>

        <SettingsProgress progress={overallProgress} activeTab={activeTab} />

        <Tabs defaultValue="marketplace" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            {Object.keys(tabProgress).map((tab) => (
              <TabsTrigger key={tab} value={tab} className="relative">
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
                <span className={cn(
                  "absolute -top-1 -right-1 h-3 w-3 rounded-full transition-colors",
                  tabProgress[tab as keyof typeof tabProgress] >= 100 
                    ? "bg-green-500 animate-pulse" 
                    : "bg-gray-300"
                )}></span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="marketplace">
            <MarketplaceSettings onProgressChange={(progress) => handleFieldChange("marketplace", progress)} />
          </TabsContent>
          
          <TabsContent value="drops">
            <DropsSettings onProgressChange={(progress) => handleFieldChange("drops", progress)} />
          </TabsContent>
          
          <TabsContent value="token-gate">
            <TokenGateSettings onProgressChange={(progress) => handleFieldChange("token-gate", progress)} />
          </TabsContent>
          
          <TabsContent value="buy-coin">
            <BuyCoinSettings onProgressChange={(progress) => handleFieldChange("buy-coin", progress)} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SiteSettings;
