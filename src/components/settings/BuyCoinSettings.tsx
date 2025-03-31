
import React from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { BuyCoinFormValues } from "./buycoin/types";
import ContractSection from "./buycoin/ContractSection";
import TokenInfoSection from "./buycoin/TokenInfoSection";
import TokenomicsSection from "./buycoin/TokenomicsSection";
import VestingSection from "./buycoin/VestingSection";
import SalePeriodSection from "./buycoin/SalePeriodSection";
import PurchaseLimitsSection from "./buycoin/PurchaseLimitsSection";
import TreasurySection from "./buycoin/TreasurySection";

const BuyCoinSettings = () => {
  const form = useForm<BuyCoinFormValues>({
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

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-2xl font-semibold mb-6">Token Sale Settings</h2>
      <Form {...form}>
        <div className="space-y-8">
          {/* Contract Information */}
          <ContractSection form={form} />
          
          <Separator />
          
          {/* Token Information */}
          <TokenInfoSection form={form} />
          
          <Separator />
          
          {/* Tokenomics */}
          <TokenomicsSection form={form} />
          
          <Separator />
          
          {/* Vesting Settings */}
          <VestingSection form={form} />
          
          <Separator />
          
          {/* Sale Period */}
          <SalePeriodSection form={form} />
          
          <Separator />
          
          {/* Purchase Limits */}
          <PurchaseLimitsSection form={form} />
          
          <Separator />
          
          {/* Treasury Address */}
          <TreasurySection form={form} />
        </div>
      </Form>
    </div>
  );
};

export default BuyCoinSettings;
