
import React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { DropsSectionProps } from "./types";

const PresaleSection: React.FC<DropsSectionProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="presaleEnabled"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Enable Presale
              </FormLabel>
              <FormDescription>
                Allow whitelisted users to mint before public sale
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={form.control}
          name="presaleStart"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presale Start</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                When the presale begins
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="presaleEnd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presale End</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                When the presale ends
              </FormDescription>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="presaleWhitelist"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presale Whitelist Addresses</FormLabel>
            <FormControl>
              <Input placeholder="Comma separated wallet addresses" {...field} />
            </FormControl>
            <FormDescription>
              List of wallet addresses eligible for presale
            </FormDescription>
          </FormItem>
        )}
      />
    </>
  );
};

export default PresaleSection;
