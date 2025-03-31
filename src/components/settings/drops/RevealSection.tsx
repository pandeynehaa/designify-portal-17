
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { DropsSectionProps } from "./types";

const RevealSection: React.FC<DropsSectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={form.control}
        name="revealType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reveal Type</FormLabel>
            <FormControl>
              <Input placeholder="instant or delayed" {...field} />
            </FormControl>
            <FormDescription>
              Specify whether NFTs are revealed instantly or later
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="royaltyFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Royalty Fee (%)</FormLabel>
            <FormControl>
              <Input type="number" step="0.1" min="0" max="100" {...field} />
            </FormControl>
            <FormDescription>
              Percentage of secondary sales to be paid to creator
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default RevealSection;
