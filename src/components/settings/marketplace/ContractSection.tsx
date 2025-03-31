
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";

const ContractSection: React.FC<SectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={form.control}
        name="contractAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marketplace Contract Address</FormLabel>
            <FormControl>
              <Input placeholder="0x..." {...field} />
            </FormControl>
            <FormDescription>
              The address of your marketplace smart contract
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
              The blockchain network your marketplace operates on
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContractSection;
