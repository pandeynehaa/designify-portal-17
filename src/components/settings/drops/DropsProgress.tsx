
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Check, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropsFormValues } from "./types";

interface DropsProgressProps {
  formValues: DropsFormValues;
}

const DropsProgress: React.FC<DropsProgressProps> = ({ formValues }) => {
  const [progressValue, setProgressValue] = useState(0);
  const [completedSections, setCompletedSections] = useState({
    contract: false,
    mintOptions: false,
    salePeriod: false,
    presale: false,
    reveal: false,
    creator: false
  });

  useEffect(() => {
    // Check contract section
    const contractComplete = !!formValues.contractAddress && !!formValues.network;
    
    // Check mint options section
    const mintOptionsComplete = !!formValues.mintPrice && !!formValues.maxSupply && !!formValues.maxPerWallet;
    
    // Check sale period section
    const salePeriodComplete = !!formValues.publicSaleStart && !!formValues.publicSaleEnd;
    
    // Check presale section - considered complete if disabled or if all fields filled
    const presaleComplete = !formValues.presaleEnabled || 
      (formValues.presaleEnabled && !!formValues.presaleStart && !!formValues.presaleEnd);
    
    // Check reveal section
    const revealComplete = !!formValues.revealType && !!formValues.royaltyFee;
    
    // Check creator section
    const creatorComplete = !!formValues.creatorAddress;

    setCompletedSections({
      contract: contractComplete,
      mintOptions: mintOptionsComplete,
      salePeriod: salePeriodComplete,
      presale: presaleComplete,
      reveal: revealComplete,
      creator: creatorComplete
    });

    // Calculate percentage of completed sections
    const totalSections = 6; // Contract, Mint Options, Sale Period, Presale, Reveal, Creator
    const completedCount = [
      contractComplete, 
      mintOptionsComplete, 
      salePeriodComplete, 
      presaleComplete, 
      revealComplete, 
      creatorComplete
    ].filter(Boolean).length;
    
    const percentage = Math.round((completedCount / totalSections) * 100);
    
    // Animate progress value
    const timer = setTimeout(() => setProgressValue(percentage), 100);
    return () => clearTimeout(timer);
  }, [formValues]);

  return (
    <div className="bg-card rounded-lg p-4 mb-6 border border-border animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">NFT Drop Setup Progress</h3>
        <div className="text-sm font-medium">
          {progressValue}% complete
        </div>
      </div>
      
      <Progress value={progressValue} className="h-2 mb-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
        {Object.entries(completedSections).map(([name, isComplete]) => {
          const sectionName = name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1');
          const tooltips = {
            "Contract": "Information about your NFT collection contract",
            "Mint Options": "Settings for mint price and supply limits",
            "Sale Period": "Configure when public sales start and end",
            "Presale": "Set up special access for whitelisted users",
            "Reveal": "Configure how and when NFT artwork is revealed",
            "Creator": "Set up wallet to receive funds from mint and royalties"
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

export default DropsProgress;
