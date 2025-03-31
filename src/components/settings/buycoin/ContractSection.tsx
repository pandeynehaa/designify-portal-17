
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BuyCoinFormValues } from "./types";

interface ContractSectionProps {
  form: UseFormReturn<BuyCoinFormValues>;
}

const ContractSection: React.FC<ContractSectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={form.control}
        name="contractAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token Contract Address</FormLabel>
            <FormControl>
              <Input placeholder="0x..." {...field} />
            </FormControl>
            <FormDescription>
              The address of your token contract
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
              <Input placeholder="ethereum, polygon, etc." {...field} />
            </FormControl>
            <FormDescription>
              The blockchain network where your token exists
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContractSection;
