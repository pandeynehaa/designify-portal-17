
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { DropsSectionProps } from "./types";

const MintOptionsSection: React.FC<DropsSectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <FormField
        control={form.control}
        name="mintPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mint Price (ETH)</FormLabel>
            <FormControl>
              <Input type="number" step="0.001" min="0" {...field} />
            </FormControl>
            <FormDescription>
              The price to mint each NFT
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maxSupply"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Maximum Supply</FormLabel>
            <FormControl>
              <Input type="number" min="1" {...field} />
            </FormControl>
            <FormDescription>
              Total number of NFTs in the collection
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maxPerWallet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Max Per Wallet</FormLabel>
            <FormControl>
              <Input type="number" min="1" {...field} />
            </FormControl>
            <FormDescription>
              Maximum number of NFTs per wallet
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default MintOptionsSection;
