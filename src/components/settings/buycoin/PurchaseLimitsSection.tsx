
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BuyCoinFormValues } from "./types";

interface PurchaseLimitsSectionProps {
  form: UseFormReturn<BuyCoinFormValues>;
}

const PurchaseLimitsSection: React.FC<PurchaseLimitsSectionProps> = ({ form }) => {
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
