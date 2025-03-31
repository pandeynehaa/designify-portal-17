
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BuyCoinFormValues } from "./types";

interface TreasurySectionProps {
  form: UseFormReturn<BuyCoinFormValues>;
}

const TreasurySection: React.FC<TreasurySectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="treasuryAddress"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Treasury Address</FormLabel>
          <FormControl>
            <Input placeholder="0x..." {...field} />
          </FormControl>
          <FormDescription>
            The wallet address that receives funds from the token sale
          </FormDescription>
        </FormItem>
      )}
    />
  );
};

export default TreasurySection;
