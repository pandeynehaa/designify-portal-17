
import React from "react";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useBuyCoinForm } from "@/hooks/useBuyCoinForm";
import TokenHeader from "./buy-coin/TokenHeader";
import TokenDetailsSettings from "./buy-coin/TokenDetailsSettings";
import TokenSaleSettings from "./buy-coin/TokenSaleSettings";
import VestingSettings from "./buy-coin/VestingSettings";
import TreasurySettings from "./buy-coin/TreasurySettings";
import TokenAchievement from "./buy-coin/TokenAchievement";

interface BuyCoinSettingsProps {
  onProgressChange?: (progress: number) => void;
}

const BuyCoinSettings = ({ onProgressChange }: BuyCoinSettingsProps) => {
  const form = useBuyCoinForm(onProgressChange);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <TokenHeader />
      
      <Form {...form}>
        <div className="space-y-8">
          <TokenDetailsSettings control={form.control} />
          
          <Separator />
          
          <TokenSaleSettings control={form.control} />
          
          <Separator />
          
          <VestingSettings control={form.control} />
          
          <TreasurySettings control={form.control} />

          <TokenAchievement />
        </div>
      </Form>
    </div>
  );
};

export default BuyCoinSettings;
