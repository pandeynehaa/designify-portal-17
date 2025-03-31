
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface AccessSettingsSectionProps {
  control: Control<any>;
}

const AccessSettingsSection = ({ control }: AccessSettingsSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormField
          control={control}
          name="accessDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Access Duration (days)</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormDescription>
                How long a user's access lasts before requiring re-verification
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="customRedirectUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Redirect URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormDescription>
                URL to redirect users after successful verification
              </FormDescription>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="adminAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Admin Address</FormLabel>
            <FormControl>
              <Input placeholder="0x..." {...field} />
            </FormControl>
            <FormDescription>
              Wallet address that can manage token gate settings
            </FormDescription>
          </FormItem>
        )}
      />
    </>
  );
};

export default AccessSettingsSection;
