
import React, { useState } from "react";
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
import ProgressSection from "./ProgressSection";

const BuyCoinSettings = () => {
  // Track progress of each section
  const [sectionProgress, setSectionProgress] = useState({
    "Contract Info": false,
    "Token Details": false,
    "Token Supply": false,
    "Vesting Schedule": false,
    "Sale Period": false,
    "Purchase Limits": false,
    "Payment Wallet": false,
  });

  const updateProgress = (sectionName: string, isComplete: boolean) => {
    setSectionProgress(prev => ({
      ...prev,
      [sectionName]: isComplete
    }));
  };

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
    <div className="bg-card rounded-lg border border-border p-6 space-y-8">
      <h2 className="text-2xl font-semibold mb-2">Token Sale Settings</h2>
      <p className="text-muted-foreground">
        Configure how people can buy your token. These settings determine your token's behavior on the blockchain.
      </p>
      
      <ProgressSection 
        sections={sectionProgress} 
        title="Token Sale" 
      />
      
      <Form {...form}>
        <div className="space-y-8">
          {/* Contract Information */}
          <ContractSection 
            form={form} 
            sectionName="Contract Info" 
            updateProgress={updateProgress} 
          />
          
          <Separator />
          
          {/* Token Information */}
          <TokenInfoSection 
            form={form} 
            sectionName="Token Details" 
            updateProgress={updateProgress} 
          />
          
          <Separator />
          
          {/* Tokenomics */}
          <TokenomicsSection 
            form={form} 
            sectionName="Token Supply" 
            updateProgress={updateProgress} 
          />
          
          <Separator />
          
          {/* Vesting Settings */}
          <VestingSection 
            form={form} 
            sectionName="Vesting Schedule" 
            updateProgress={updateProgress} 
          />
          
          <Separator />
          
          {/* Sale Period */}
          <SalePeriodSection 
            form={form} 
            sectionName="Sale Period" 
            updateProgress={updateProgress} 
          />
          
          <Separator />
          
          {/* Purchase Limits */}
          <PurchaseLimitsSection 
            form={form} 
            sectionName="Purchase Limits" 
            updateProgress={updateProgress} 
          />
          
          <Separator />
          
          {/* Treasury Address */}
          <TreasurySection 
            form={form} 
            sectionName="Payment Wallet" 
            updateProgress={updateProgress} 
          />
        </div>
      </Form>
    </div>
  );
};

export default BuyCoinSettings;
