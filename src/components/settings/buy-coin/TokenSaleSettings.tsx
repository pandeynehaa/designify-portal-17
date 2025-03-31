
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

interface TokenSaleSettingsProps {
  control: Control<any>;
}

const TokenSaleSettings = ({ control }: TokenSaleSettingsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={control}
          name="initialPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Price (ETH)</FormLabel>
              <FormControl>
                <Input type="number" step="0.000001" min="0" {...field} />
              </FormControl>
              <FormDescription>
                Initial price per token in ETH
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="maxSupply"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Supply</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormDescription>
                Total token supply
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={control}
          name="publicSaleStart"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Public Sale Start</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                When the token sale begins
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="publicSaleEnd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Public Sale End</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                When the token sale ends
              </FormDescription>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={control}
          name="minPurchaseAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Purchase Amount</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormDescription>
                Minimum amount of tokens per purchase
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="maxPurchaseAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Purchase Amount</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormDescription>
                Maximum amount of tokens per purchase
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default TokenSaleSettings;
