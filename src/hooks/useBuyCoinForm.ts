
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const useBuyCoinForm = (onProgressChange?: (progress: number) => void) => {
  const form = useForm({
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

  const formValues = form.watch();
  
  useEffect(() => {
    if (!onProgressChange) return;
    
    const allFields = Object.keys(formValues);
    const completedFields = allFields.filter(
      field => {
        const value = formValues[field as keyof typeof formValues];
        return value !== undefined && value.toString().trim() !== '';
      }
    ).length;
    
    const totalProgress = (completedFields / allFields.length) * 100;
    
    onProgressChange(totalProgress);
  }, [formValues, onProgressChange]);

  return form;
};
