
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { DropsSectionProps } from "./types";

const SalePeriodSection: React.FC<DropsSectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={form.control}
        name="publicSaleStart"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Public Sale Start</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} />
            </FormControl>
            <FormDescription>
              When the public sale begins
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="publicSaleEnd"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Public Sale End</FormLabel>
            <FormControl>
              <Input type="datetime-local" {...field} />
            </FormControl>
            <FormDescription>
              When the public sale ends
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default SalePeriodSection;
