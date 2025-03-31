
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const TokenGateSettings = () => {
  const form = useForm({
    defaultValues: {
      contractAddress: "0x3456789012abcdef3456789012abcdef34567890",
      network: "ethereum",
      tokenType: "ERC721",
      minTokensRequired: "1",
      allowERC1155: true,
      multipleCollectionsEnabled: false,
      additionalCollections: "",
      accessDuration: "30",
      customRedirectUrl: "https://members.example.com",
      adminAddress: "0xcdef1234567890abcdef1234567890abcdef1234"
    }
  });

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-2xl font-semibold mb-6">Token Gate Settings</h2>
      <Form {...form}>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="contractAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NFT/Token Contract Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormDescription>
                    The contract address of the NFT or token required for access
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
                    The blockchain network where the token exists
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
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
              control={form.control}
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

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="allowERC1155"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Allow ERC1155 (Multi-token)
                    </FormLabel>
                    <FormDescription>
                      Enable support for ERC1155 multi-tokens
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
              name="multipleCollectionsEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Multiple Collections
                    </FormLabel>
                    <FormDescription>
                      Allow tokens from multiple collections for access
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

          <FormField
            control={form.control}
            name="additionalCollections"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Collection Addresses</FormLabel>
                <FormControl>
                  <Input placeholder="Comma separated contract addresses" {...field} />
                </FormControl>
                <FormDescription>
                  Additional contract addresses that grant access (if multiple collections enabled)
                </FormDescription>
              </FormItem>
            )}
          />

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
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
              control={form.control}
              name="customRedirectUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Redirect URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>
                    URL to redirect users to after successful verification
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
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
        </div>
      </Form>
    </div>
  );
};

export default TokenGateSettings;
