
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { SectionProps } from "./types";

const AddressesSection: React.FC<SectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={form.control}
        name="curatorAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Curator Address</FormLabel>
            <FormControl>
              <Input placeholder="0x..." {...field} />
            </FormControl>
            <FormDescription>
              The wallet address that can curate listings
            </FormDescription>
          </FormItem>
        )}
      />

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
              The wallet address that receives marketplace fees
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default AddressesSection;
