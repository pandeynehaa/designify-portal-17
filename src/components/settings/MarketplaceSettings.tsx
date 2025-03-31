
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { MarketplaceFormValues } from "./marketplace/types";
import ContractSection from "./marketplace/ContractSection";
import FeesSection from "./marketplace/FeesSection";
import ListingOptionsSection from "./marketplace/ListingOptionsSection";
import AddressesSection from "./marketplace/AddressesSection";
import MarketplaceProgress from "./marketplace/MarketplaceProgress";

const MarketplaceSettings = () => {
  const form = useForm<MarketplaceFormValues>({
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
    <div className="space-y-6">
      <MarketplaceProgress formValues={form.watch()} />
      
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-2xl font-semibold mb-6">Marketplace Smart Contract Settings</h2>
        
        <Form {...form}>
          <div className="space-y-8">
            <ContractSection form={form} />
            
            <Separator />
            
            <FeesSection form={form} />
            
            <Separator />
            
            <ListingOptionsSection form={form} />
            
            <Separator />
            
            <AddressesSection form={form} />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MarketplaceSettings;
