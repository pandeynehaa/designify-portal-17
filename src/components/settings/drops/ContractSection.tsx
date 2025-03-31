
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { DropsSectionProps } from "./types";

const ContractSection: React.FC<DropsSectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={form.control}
        name="contractAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>NFT Contract Address</FormLabel>
            <FormControl>
              <Input placeholder="0x..." {...field} />
            </FormControl>
            <FormDescription>
              The address of your NFT drop contract
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="network"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Blockchain Network</FormLabel>
            <FormControl>
              <Input placeholder="ethereum" {...field} />
            </FormControl>
            <FormDescription>
              The blockchain network your drop is on
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContractSection;
