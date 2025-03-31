
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";

interface CollectionSettingsSectionProps {
  control: Control<any>;
}

const CollectionSettingsSection = ({ control }: CollectionSettingsSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={control}
          name="allowERC1155"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Allow ERC1155 (Multi-token)
                </FormLabel>
                <FormDescription>
                  Enable support for ERC1155 multi-tokens
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
          name="multipleCollectionsEnabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Multiple Collections
                </FormLabel>
                <FormDescription>
                  Allow tokens from multiple collections for access
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

      <FormField
        control={control}
        name="additionalCollections"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Collection Addresses</FormLabel>
            <FormControl>
              <Input placeholder="Comma separated contract addresses" {...field} />
            </FormControl>
            <FormDescription>
              Additional contract addresses that grant access (if multiple collections enabled)
            </FormDescription>
          </FormItem>
        )}
      />
    </>
  );
};

export default CollectionSettingsSection;
