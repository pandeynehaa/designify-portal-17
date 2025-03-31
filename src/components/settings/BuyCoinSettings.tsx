import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Check, Award } from "lucide-react";

interface BuyCoinSettingsProps {
  onProgressChange?: (progress: number) => void;
}

const BuyCoinSettings = ({ onProgressChange }: BuyCoinSettingsProps) => {
  const form = useForm({
    defaultValues: {
      contractAddress: "0x4567890123abcdef4567890123abcdef45678901",
      network: "ethereum",
      tokenSymbol: "CVT",
      tokenName: "Culture Vault Token",
      tokenDecimals: "18",
      initialPrice: "0.001",
      maxSupply: "100000000",
      enableVesting: true,
      vestingPeriod: "365",
      vestingCliff: "90",
      publicSaleStart: "2023-12-15T12:00",
      publicSaleEnd: "2024-01-15T12:00",
      minPurchaseAmount: "100",
      maxPurchaseAmount: "10000",
      treasuryAddress: "0xef123456789abcdef123456789abcdef12345678"
    }
  });

  const formValues = form.watch();
  
  useEffect(() => {
    const allFields = Object.keys(formValues);
    const completedFields = allFields.filter(
      field => {
        const value = formValues[field as keyof typeof formValues];
        return value !== undefined && value.toString().trim() !== '';
      }
    ).length;
    
    const totalProgress = (completedFields / allFields.length) * 100;
    
    if (onProgressChange) {
      onProgressChange(totalProgress);
    }
  }, [formValues, onProgressChange]);

  const renderFieldBadge = (fieldValue: any) => {
    if (fieldValue && fieldValue.toString().trim() !== '') {
      return (
        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 bg-green-500 text-white rounded-full p-0.5">
          <Check className="h-3 w-3" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        Token Sale Settings
        <Award className="h-5 w-5 text-amber-500" />
      </h2>
      
      <Form {...form}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="contractAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Contract Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormDescription>
                    The address of your token contract
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="network"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blockchain Network</FormLabel>
                  <FormControl>
                    <Input placeholder="ethereum, polygon, etc." {...field} />
                  </FormControl>
                  <FormDescription>
                    The blockchain network where your token exists
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="tokenSymbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Symbol</FormLabel>
                  <FormControl>
                    <Input placeholder="BTC, ETH, etc." {...field} />
                  </FormControl>
                  <FormDescription>
                    The symbol of your token (3-5 characters)
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tokenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full token name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The full name of your token
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tokenDecimals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Decimals</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" max="18" {...field} />
                  </FormControl>
                  <FormDescription>
                    Number of decimal places (usually 18)
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
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
              control={form.control}
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

          <Separator />

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
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
              control={form.control}
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

          <FormField
            control={form.control}
            name="treasuryAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Treasury Address</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormDescription>
                  The wallet address that receives funds from the token sale
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100 flex items-center gap-3 animate-fade-in">
            <Award className="h-6 w-6 text-amber-500" />
            <div>
              <h3 className="font-medium text-amber-700">Achievement Unlocked!</h3>
              <p className="text-sm text-amber-600">
                You're setting up token economics for your project. This is an advanced feature that 
                will give your users more ways to engage with your platform!
              </p>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BuyCoinSettings;
