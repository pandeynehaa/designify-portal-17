import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, Award, Check, Trophy } from "lucide-react";

interface MarketplaceSettingsProps {
  onProgressChange?: (progress: number) => void;
}

const MarketplaceSettings = ({ onProgressChange }: MarketplaceSettingsProps) => {
  const form = useForm({
    defaultValues: {
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
      network: "ethereum",
      marketplaceFee: "2.5",
      royaltyFee: "5",
      enableAuctions: true,
      enableFixedPrice: true,
      enableOffers: true,
      curatorAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      treasuryAddress: "0x7890abcdef1234567890abcdef1234567890abcd"
    }
  });

  const formValues = form.watch();
  
  useEffect(() => {
    const requiredFields = [
      'contractAddress', 'network', 'marketplaceFee', 'royaltyFee',
      'curatorAddress', 'treasuryAddress'
    ];
    const optionalFields = ['enableAuctions', 'enableFixedPrice', 'enableOffers'];
    
    const completedRequired = requiredFields.filter(
      field => formValues[field as keyof typeof formValues]?.toString().trim() !== ''
    ).length;
    
    const completedOptional = optionalFields.filter(
      field => formValues[field as keyof typeof formValues] !== undefined
    ).length;
    
    const requiredWeight = 0.7;
    const optionalWeight = 0.3;
    
    const requiredProgress = (completedRequired / requiredFields.length) * requiredWeight * 100;
    const optionalProgress = (completedOptional / optionalFields.length) * optionalWeight * 100;
    
    const totalProgress = requiredProgress + optionalProgress;
    
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
      <h2 className="text-2xl font-semibold mb-6">Marketplace Smart Contract Settings</h2>
      <Form {...form}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="contractAddress"
              render={({ field }) => (
                <FormItem className="relative hover:shadow-md transition-shadow animate-fade-in">
                  <FormLabel>Marketplace Contract Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} className="transition-all focus:ring-2 focus:ring-blue-500" />
                  </FormControl>
                  <FormDescription>
                    The address of your marketplace smart contract
                  </FormDescription>
                  {renderFieldBadge(field.value)}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="network"
              render={({ field }) => (
                <FormItem className="relative hover:shadow-md transition-shadow animate-fade-in">
                  <FormLabel>Blockchain Network</FormLabel>
                  <FormControl>
                    <Input placeholder="ethereum" {...field} className="transition-all focus:ring-2 focus:ring-blue-500" />
                  </FormControl>
                  <FormDescription>
                    The blockchain network your marketplace operates on
                  </FormDescription>
                  {renderFieldBadge(field.value)}
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="marketplaceFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marketplace Fee (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" min="0" max="100" {...field} />
                  </FormControl>
                  <FormDescription>
                    The fee percentage that your marketplace collects on sales
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="royaltyFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creator Royalty Fee (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" min="0" max="100" {...field} />
                  </FormControl>
                  <FormDescription>
                    The royalty percentage that goes to the original creator
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="enableAuctions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Enable Auctions
                    </FormLabel>
                    <FormDescription>
                      Allow users to create auction listings
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
              control={form.control}
              name="enableFixedPrice"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Enable Fixed Price
                    </FormLabel>
                    <FormDescription>
                      Allow users to create fixed price listings
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
              control={form.control}
              name="enableOffers"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Enable Offers
                    </FormLabel>
                    <FormDescription>
                      Allow users to make offers on listings
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

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="curatorAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Curator Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormDescription>
                    The wallet address that can curate listings
                  </FormDescription>
                </FormItem>
              )}
            />

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
                    The wallet address that receives marketplace fees
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-3 animate-fade-in">
            <Trophy className="h-6 w-6 text-blue-500" />
            <div>
              <h3 className="font-medium text-blue-700">Pro Tip!</h3>
              <p className="text-sm text-blue-600">
                Setting appropriate marketplace fees helps balance revenue and user adoption. 
                Most successful marketplaces charge between 2-5%.
              </p>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default MarketplaceSettings;
