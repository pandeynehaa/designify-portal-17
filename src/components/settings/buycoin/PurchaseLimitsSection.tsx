
import React, { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SectionProps } from "./types";

const PurchaseLimitsSection: React.FC<SectionProps> = ({ form, sectionName, updateProgress }) => {
  const minPurchaseAmount = form.watch("minPurchaseAmount");
  const maxPurchaseAmount = form.watch("maxPurchaseAmount");
  
  useEffect(() => {
    if (updateProgress) {
      const isComplete = minPurchaseAmount.length > 0 && maxPurchaseAmount.length > 0;
      updateProgress(sectionName, isComplete);
    }
  }, [minPurchaseAmount, maxPurchaseAmount, updateProgress, sectionName]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={form.control}
        name="minPurchaseAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minimum Purchase Amount</FormLabel>
            <FormControl>
              <Input type="number" min="1" {...field} />
            </FormControl>
            <FormDescription>
              Minimum amount of tokens per purchase
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maxPurchaseAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Maximum Purchase Amount</FormLabel>
            <FormControl>
              <Input type="number" min="1" {...field} />
            </FormControl>
            <FormDescription>
              Maximum amount of tokens per purchase
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default PurchaseLimitsSection;
