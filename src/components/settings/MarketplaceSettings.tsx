
import React from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { useSettingsProgress } from "@/hooks/useSettingsProgress";
import ContractSettings from "./marketplace/ContractSettings";
import FeeSettings from "./marketplace/FeeSettings";
import MarketplaceToggles from "./marketplace/MarketplaceToggles";
import AddressSettings from "./marketplace/AddressSettings";
import MarketplaceTip from "./marketplace/MarketplaceTip";

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

  // Track form progress
  useSettingsProgress({
    watch: form.watch,
    requiredFields: [
      'contractAddress', 'network', 'marketplaceFee', 'royaltyFee',
      'curatorAddress', 'treasuryAddress'
    ],
    optionalFields: ['enableAuctions', 'enableFixedPrice', 'enableOffers'],
    onProgressChange
  });

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-2xl font-semibold mb-6">Marketplace Smart Contract Settings</h2>
      <Form {...form}>
        <div className="space-y-8">
          <ContractSettings control={form.control} />
          
          <Separator />
          
          <FeeSettings control={form.control} />
          
          <Separator />
          
          <MarketplaceToggles control={form.control} />
          
          <Separator />
          
          <AddressSettings control={form.control} />
          
          <MarketplaceTip />
        </div>
      </Form>
    </div>
  );
};

export default MarketplaceSettings;
