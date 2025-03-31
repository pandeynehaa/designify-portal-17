
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Check } from "lucide-react";

interface ContractSettingsProps {
  control: Control<any>;
}

const ContractSettings = ({ control }: ContractSettingsProps) => {
  const renderFieldBadge = (fieldValue: any) => {
    if (fieldValue && fieldValue.toString().trim() !== '') {
      return (
        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 bg-green-500 text-white rounded-full p-0.5">
          <Check className="h-3 w-3" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={control}
        name="contractAddress"
        render={({ field }) => (
          <FormItem className="relative hover:shadow-md transition-shadow animate-fade-in">
            <FormLabel>Marketplace Contract Address</FormLabel>
            <FormControl>
              <Input placeholder="0x..." {...field} className="transition-all focus:ring-2 focus:ring-blue-500" />
            </FormControl>
            <FormDescription>
              The address of your marketplace smart contract
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
              <Input placeholder="ethereum" {...field} className="transition-all focus:ring-2 focus:ring-blue-500" />
            </FormControl>
            <FormDescription>
              The blockchain network your marketplace operates on
            </FormDescription>
            {renderFieldBadge(field.value)}
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContractSettings;
