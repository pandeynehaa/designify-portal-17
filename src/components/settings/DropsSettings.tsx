import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Check, Medal } from "lucide-react";

interface DropsSettingsProps {
  onProgressChange?: (progress: number) => void;
}

const DropsSettings = ({ onProgressChange }: DropsSettingsProps) => {
  const form = useForm({
    defaultValues: {
      contractAddress: "0x2345678901abcdef2345678901abcdef23456789",
      network: "ethereum",
      mintPrice: "0.08",
      maxSupply: "10000",
      maxPerWallet: "5",
      publicSaleStart: "2023-12-01T12:00",
      publicSaleEnd: "2023-12-31T12:00",
      presaleEnabled: true,
      presaleStart: "2023-11-25T12:00",
      presaleEnd: "2023-11-30T12:00",
      presaleWhitelist: "0x123..., 0x456..., 0x789...",
      revealType: "delayed",
      royaltyFee: "7.5",
      creatorAddress: "0xdef1234567890abcdef1234567890abcdef123456"
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
        NFT Drops Contract Settings
        <Medal className="h-5 w-5 text-purple-500" />
      </h2>
      
      <Form {...form}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="contractAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NFT Contract Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormDescription>
                    The address of your NFT drop contract
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
                    <Input placeholder="ethereum" {...field} />
                  </FormControl>
                  <FormDescription>
                    The blockchain network your drop is on
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="mintPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mint Price (ETH)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.001" min="0" {...field} />
                  </FormControl>
                  <FormDescription>
                    The price to mint each NFT
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
                    Total number of NFTs in the collection
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxPerWallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Per Wallet</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Maximum number of NFTs per wallet
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

          <Separator />

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

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="revealType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reveal Type</FormLabel>
                  <FormControl>
                    <Input placeholder="instant or delayed" {...field} />
                  </FormControl>
                  <FormDescription>
                    Specify whether NFTs are revealed instantly or later
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="royaltyFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Royalty Fee (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" min="0" max="100" {...field} />
                  </FormControl>
                  <FormDescription>
                    Percentage of secondary sales to be paid to creator
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="creatorAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Creator Address</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormDescription>
                  Wallet address that receives funds from mint and royalties
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100 flex items-center gap-3 animate-fade-in">
            <Medal className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="font-medium text-purple-700">Drop Creator Level Up!</h3>
              <p className="text-sm text-purple-600">
                NFT drops with presale periods and limited supply create scarcity and demand. 
                Your configuration is shaping up nicely!
              </p>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default DropsSettings;
