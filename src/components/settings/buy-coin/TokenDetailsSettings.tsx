
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

interface TokenDetailsSettingsProps {
  control: Control<any>;
}

const TokenDetailsSettings = ({ control }: TokenDetailsSettingsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={control}
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
          control={control}
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

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FormField
          control={control}
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
          control={control}
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
          control={control}
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
    </>
  );
};

export default TokenDetailsSettings;
