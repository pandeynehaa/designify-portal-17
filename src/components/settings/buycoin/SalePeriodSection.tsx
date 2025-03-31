
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BuyCoinFormValues } from "./types";

interface SalePeriodSectionProps {
  form: UseFormReturn<BuyCoinFormValues>;
}

const SalePeriodSection: React.FC<SalePeriodSectionProps> = ({ form }) => {
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
              When the token sale begins
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
              When the token sale ends
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default SalePeriodSection;
