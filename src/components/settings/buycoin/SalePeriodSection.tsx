
import React, { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SectionProps } from "./types";

const SalePeriodSection: React.FC<SectionProps> = ({ form, sectionName, updateProgress }) => {
  const publicSaleStart = form.watch("publicSaleStart");
  const publicSaleEnd = form.watch("publicSaleEnd");
  
  useEffect(() => {
    if (updateProgress) {
      const isComplete = publicSaleStart.length > 0 && publicSaleEnd.length > 0;
      updateProgress(sectionName, isComplete);
    }
  }, [publicSaleStart, publicSaleEnd, updateProgress, sectionName]);

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
