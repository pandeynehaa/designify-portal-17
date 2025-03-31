
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/Navbar";
import MarketplaceSettings from "../components/settings/MarketplaceSettings";
import DropsSettings from "../components/settings/DropsSettings";
import TokenGateSettings from "../components/settings/TokenGateSettings";
import BuyCoinSettings from "../components/settings/BuyCoinSettings";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const SiteSettings = () => {
  const [activeTab, setActiveTab] = useState("marketplace");
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your site settings have been saved successfully."
    });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <motion.div 
        className="container mx-auto py-8 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-theme-primary text-white rounded-md hover:bg-theme-primary/90 transition-colors"
          >
            Save Settings
          </button>
        </div>
        
        <motion.p 
          className="text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Configure your Web3 features without writing any code. These settings control how your site
          interacts with the blockchain - just like setting up payment options in a regular website.
        </motion.p>

        <Tabs defaultValue="marketplace" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="drops">Drops</TabsTrigger>
            <TabsTrigger value="token-gate">Token Gate</TabsTrigger>
            <TabsTrigger value="buy-coin">Buy Coin</TabsTrigger>
          </TabsList>
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SiteSettings;
