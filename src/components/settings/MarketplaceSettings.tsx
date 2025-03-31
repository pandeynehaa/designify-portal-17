
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const MarketplaceSettings = () => {
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
                <FormItem>
                  <FormLabel>Marketplace Contract Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormDescription>
                    The address of your marketplace smart contract
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
                    The blockchain network your marketplace operates on
                  </FormDescription>
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
        </div>
      </Form>
    </div>
  );
};

export default MarketplaceSettings;
