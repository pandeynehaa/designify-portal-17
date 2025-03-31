
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/Navbar";
import MarketplaceSettings from "../components/settings/MarketplaceSettings";
import DropsSettings from "../components/settings/DropsSettings";
import TokenGateSettings from "../components/settings/TokenGateSettings";
import BuyCoinSettings from "../components/settings/BuyCoinSettings";
import { toast } from "@/components/ui/use-toast";

const SiteSettings = () => {
  const [activeTab, setActiveTab] = useState("marketplace");
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your site settings have been saved successfully."
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
            className="px-4 py-2 bg-theme-primary text-white rounded-md hover:bg-theme-primary/90 transition-colors"
          >
            Save Settings
          </button>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Configure smart contract variables and backend settings for your Web3 sites.
          These settings will be used across your site to interact with blockchain functionality.
        </p>

        <Tabs defaultValue="marketplace" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="drops">Drops</TabsTrigger>
            <TabsTrigger value="token-gate">Token Gate</TabsTrigger>
            <TabsTrigger value="buy-coin">Buy Coin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="marketplace">
            <MarketplaceSettings />
          </TabsContent>
          
          <TabsContent value="drops">
            <DropsSettings />
          </TabsContent>
          
          <TabsContent value="token-gate">
            <TokenGateSettings />
          </TabsContent>
          
          <TabsContent value="buy-coin">
            <BuyCoinSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SiteSettings;
