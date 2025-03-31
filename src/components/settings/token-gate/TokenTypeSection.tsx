
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface TokenTypeSectionProps {
  control: Control<any>;
}

const TokenTypeSection = ({ control }: TokenTypeSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FormField
        control={control}
        name="tokenType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token Type</FormLabel>
            <FormControl>
              <Input placeholder="ERC721, ERC20, ERC1155" {...field} />
            </FormControl>
            <FormDescription>
              The type of token contract
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="minTokensRequired"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Minimum Tokens Required</FormLabel>
            <FormControl>
              <Input type="number" min="1" {...field} />
            </FormControl>
            <FormDescription>
              Minimum number of tokens a user must own for access
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default TokenTypeSection;
