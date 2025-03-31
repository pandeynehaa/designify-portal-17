
import React, { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContractSectionProps } from "./types";

const ContractSection: React.FC<ContractSectionProps> = ({ form, sectionName, updateProgress }) => {
  const contractAddress = form.watch("contractAddress");
  const network = form.watch("network");
  
  useEffect(() => {
    if (updateProgress) {
      const isComplete = contractAddress.length > 0 && network.length > 0;
      updateProgress(sectionName, isComplete);
    }
  }, [contractAddress, network, updateProgress, sectionName]);

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
