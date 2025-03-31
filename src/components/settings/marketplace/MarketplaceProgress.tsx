
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Check, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MarketplaceFormValues } from "./types";

interface MarketplaceProgressProps {
  formValues: MarketplaceFormValues;
}

const MarketplaceProgress: React.FC<MarketplaceProgressProps> = ({ formValues }) => {
  const [progressValue, setProgressValue] = useState(0);
  const [completedSections, setCompletedSections] = useState({
    contract: false,
    fees: false,
    listings: false,
    addresses: false
  });

  useEffect(() => {
    // Check contract section
    const contractComplete = !!formValues.contractAddress && !!formValues.network;
    
    // Check fees section
    const feesComplete = !!formValues.marketplaceFee && !!formValues.royaltyFee;
    
    // Check listings section (always complete if any toggle is enabled)
    const listingsComplete = formValues.enableAuctions || formValues.enableFixedPrice || formValues.enableOffers;
    
    // Check addresses section
    const addressesComplete = !!formValues.curatorAddress && !!formValues.treasuryAddress;

    setCompletedSections({
      contract: contractComplete,
      fees: feesComplete,
      listings: listingsComplete,
      addresses: addressesComplete
    });

    // Calculate percentage of completed sections
    const totalSections = 4; // Contract, Fees, Listings, Addresses
    const completedCount = [contractComplete, feesComplete, listingsComplete, addressesComplete].filter(Boolean).length;
    const percentage = Math.round((completedCount / totalSections) * 100);
    
    // Animate progress value
    const timer = setTimeout(() => setProgressValue(percentage), 100);
    return () => clearTimeout(timer);
  }, [formValues]);

  return (
    <div className="bg-card rounded-lg p-4 mb-6 border border-border animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Marketplace Setup Progress</h3>
        <div className="text-sm font-medium">
          {progressValue}% complete
        </div>
      </div>
      
      <Progress value={progressValue} className="h-2 mb-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        {Object.entries(completedSections).map(([name, isComplete]) => {
          const sectionName = name.charAt(0).toUpperCase() + name.slice(1);
          const tooltips = {
            Contract: "Information about your marketplace smart contract",
            Fees: "Settings for marketplace and creator fees",
            Listings: "Configure what types of listings are available",
            Addresses: "Set up curator and treasury wallet addresses"
          };
          
          return (
            <div 
              key={name} 
              className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                isComplete ? "text-green-600 bg-green-50 dark:bg-green-950/20" : "text-muted-foreground"
              }`}
            >
              {isComplete ? (
                <Check className="h-4 w-4" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-current flex items-center justify-center" />
              )}
              <span>{sectionName}</span>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground ml-1 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltips[sectionName as keyof typeof tooltips]}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketplaceProgress;
