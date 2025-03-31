
import React from "react";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import useTokenGateForm from "@/hooks/useTokenGateForm";
import TokenGateHeader from "./token-gate/TokenGateHeader";
import ContractFieldsSection from "./token-gate/ContractFieldsSection";
import TokenTypeSection from "./token-gate/TokenTypeSection";
import CollectionSettingsSection from "./token-gate/CollectionSettingsSection";
import AccessSettingsSection from "./token-gate/AccessSettingsSection";
import TokenGateInfoBox from "./token-gate/TokenGateInfoBox";

interface TokenGateSettingsProps {
  onProgressChange?: (progress: number) => void;
}

const TokenGateSettings = ({ onProgressChange }: TokenGateSettingsProps) => {
  const { form } = useTokenGateForm({ onProgressChange });

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
      <TokenGateHeader />
      
      <Form {...form}>
        <div className="space-y-8">
          <ContractFieldsSection control={form.control} renderFieldBadge={renderFieldBadge} />

          <Separator />

          <TokenTypeSection control={form.control} />

          <Separator />

          <CollectionSettingsSection control={form.control} />

          <Separator />

          <AccessSettingsSection control={form.control} />
          
          <TokenGateInfoBox />
        </div>
      </Form>
    </div>
  );
};

export default TokenGateSettings;
