
import React, { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SectionProps } from "./types";

const TokenInfoSection: React.FC<SectionProps> = ({ form, sectionName, updateProgress }) => {
  const tokenSymbol = form.watch("tokenSymbol");
  const tokenName = form.watch("tokenName");
  const tokenDecimals = form.watch("tokenDecimals");
  
  useEffect(() => {
    if (updateProgress) {
      const isComplete = tokenSymbol.length > 0 && tokenName.length > 0 && tokenDecimals.length > 0;
      updateProgress(sectionName, isComplete);
    }
  }, [tokenSymbol, tokenName, tokenDecimals, updateProgress, sectionName]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <FormField
        control={form.control}
        name="tokenSymbol"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token Symbol</FormLabel>
            <FormControl>
              <Input placeholder="BTC, ETH, etc." {...field} />
            </FormControl>
            <FormDescription>
              The symbol of your token (3-5 characters)
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tokenName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token Name</FormLabel>
            <FormControl>
              <Input placeholder="Full token name" {...field} />
            </FormControl>
            <FormDescription>
              The full name of your token
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tokenDecimals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token Decimals</FormLabel>
            <FormControl>
              <Input type="number" min="0" max="18" {...field} />
            </FormControl>
            <FormDescription>
              Number of decimal places (usually 18)
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default TokenInfoSection;
