
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface TreasurySettingsProps {
  control: Control<any>;
}

const TreasurySettings = ({ control }: TreasurySettingsProps) => {
  return (
    <FormField
      control={control}
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

export default TreasurySettings;
