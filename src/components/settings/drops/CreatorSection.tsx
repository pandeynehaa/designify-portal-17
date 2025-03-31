
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { DropsSectionProps } from "./types";

const CreatorSection: React.FC<DropsSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="creatorAddress"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Creator Address</FormLabel>
          <FormControl>
            <Input placeholder="0x..." {...field} />
          </FormControl>
          <FormDescription>
            Wallet address that receives funds from mint and royalties
          </FormDescription>
        </FormItem>
      )}
    />
  );
};

export default CreatorSection;
