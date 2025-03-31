
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { SectionProps } from "./types";

const FeesSection: React.FC<SectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={form.control}
        name="marketplaceFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marketplace Fee (%)</FormLabel>
            <FormControl>
              <Input type="number" step="0.1" min="0" max="100" {...field} />
            </FormControl>
            <FormDescription>
              The fee percentage that your marketplace collects on sales
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="royaltyFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Creator Royalty Fee (%)</FormLabel>
            <FormControl>
              <Input type="number" step="0.1" min="0" max="100" {...field} />
            </FormControl>
            <FormDescription>
              The royalty percentage that goes to the original creator
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default FeesSection;
