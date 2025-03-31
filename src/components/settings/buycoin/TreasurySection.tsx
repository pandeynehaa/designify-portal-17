
import React, { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BuyCoinFormValues, SectionProps } from "./types";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TreasurySectionProps extends SectionProps {
  form: UseFormReturn<BuyCoinFormValues>;
}

const TreasurySection: React.FC<TreasurySectionProps> = ({ form, sectionName, updateProgress }) => {
  // Check if treasury address is valid (simple check for now)
  const treasuryValue = form.watch("treasuryAddress");
  
  useEffect(() => {
    if (updateProgress) {
      // Simple validation: at least 42 chars (0x + 40 hex chars)
      const isComplete = treasuryValue && treasuryValue.length >= 42;
      updateProgress(sectionName, isComplete);
    }
  }, [treasuryValue, updateProgress, sectionName]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">Where should payments go?</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">This is the wallet that will receive all funds from your token sales</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <FormField
        control={form.control}
        name="treasuryAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Receiving Address</FormLabel>
            <FormControl>
              <Input placeholder="0x..." {...field} />
            </FormControl>
            <FormDescription>
              This is your wallet address that will receive all the money from token sales
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default TreasurySection;
