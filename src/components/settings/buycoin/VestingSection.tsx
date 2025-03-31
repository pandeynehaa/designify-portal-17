
import React, { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SectionProps } from "./types";

const VestingSection: React.FC<SectionProps> = ({ form, sectionName, updateProgress }) => {
  const enableVesting = form.watch("enableVesting");
  const vestingPeriod = form.watch("vestingPeriod");
  const vestingCliff = form.watch("vestingCliff");
  
  useEffect(() => {
    if (updateProgress) {
      const isComplete = !enableVesting || (vestingPeriod.length > 0 && vestingCliff.length > 0);
      updateProgress(sectionName, isComplete);
    }
  }, [enableVesting, vestingPeriod, vestingCliff, updateProgress, sectionName]);

  return (
    <>
      <FormField
        control={form.control}
        name="enableVesting"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Enable Vesting
              </FormLabel>
              <FormDescription>
                Gradually release tokens to buyers over time
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
          name="vestingPeriod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vesting Period (days)</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormDescription>
                Total duration of the vesting period
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vestingCliff"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vesting Cliff (days)</FormLabel>
              <FormControl>
                <Input type="number" min="0" {...field} />
              </FormControl>
              <FormDescription>
                Days before vesting begins
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default VestingSection;
