
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Control } from "react-hook-form";

interface ContractFieldsSectionProps {
  control: Control<any>;
  renderFieldBadge: (fieldValue: any) => React.ReactNode;
}

const ContractFieldsSection = ({ control, renderFieldBadge }: ContractFieldsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={control}
        name="contractAddress"
        render={({ field }) => (
          <FormItem className="relative hover:shadow-md transition-shadow animate-fade-in">
            <FormLabel>NFT/Token Contract Address</FormLabel>
            <FormControl>
              <Input placeholder="0x..." {...field} className="transition-all focus:ring-2 focus:ring-blue-500" />
            </FormControl>
            <FormDescription>
              The contract address of the NFT or token required for access
            </FormDescription>
            {renderFieldBadge(field.value)}
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="network"
        render={({ field }) => (
          <FormItem className="relative hover:shadow-md transition-shadow animate-fade-in">
            <FormLabel>Blockchain Network</FormLabel>
            <FormControl>
              <Input placeholder="ethereum, polygon, etc." {...field} className="transition-all focus:ring-2 focus:ring-blue-500" />
            </FormControl>
            <FormDescription>
              The blockchain network where the token exists
            </FormDescription>
            {renderFieldBadge(field.value)}
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContractFieldsSection;
