
import React, { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TokenomicsSectionProps } from "./types";

const TokenomicsSection: React.FC<TokenomicsSectionProps> = ({ form, sectionName, updateProgress }) => {
  const initialPrice = form.watch("initialPrice");
  const maxSupply = form.watch("maxSupply");
  
  useEffect(() => {
    if (updateProgress) {
      const isComplete = initialPrice.length > 0 && maxSupply.length > 0;
      updateProgress(sectionName, isComplete);
    }
  }, [initialPrice, maxSupply, updateProgress, sectionName]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={form.control}
        name="initialPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Initial Price (ETH)</FormLabel>
            <FormControl>
              <Input type="number" step="0.000001" min="0" {...field} />
            </FormControl>
            <FormDescription>
              Initial price per token in ETH
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maxSupply"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Maximum Supply</FormLabel>
            <FormControl>
              <Input type="number" min="1" {...field} />
            </FormControl>
            <FormDescription>
              Total token supply
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default TokenomicsSection;
