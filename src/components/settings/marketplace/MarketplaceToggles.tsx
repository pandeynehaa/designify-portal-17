
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";

interface MarketplaceTogglesProps {
  control: Control<any>;
}

const MarketplaceToggles = ({ control }: MarketplaceTogglesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <FormField
        control={control}
        name="enableAuctions"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Enable Auctions
              </FormLabel>
              <FormDescription>
                Allow users to create auction listings
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="enableFixedPrice"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Enable Fixed Price
              </FormLabel>
              <FormDescription>
                Allow users to create fixed price listings
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="enableOffers"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Enable Offers
              </FormLabel>
              <FormDescription>
                Allow users to make offers on listings
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default MarketplaceToggles;
