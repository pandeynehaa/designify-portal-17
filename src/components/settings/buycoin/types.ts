
import { UseFormReturn } from "react-hook-form";

export interface BuyCoinFormValues {
  contractAddress: string;
  network: string;
  tokenSymbol: string;
  tokenName: string;
  tokenDecimals: string;
  initialPrice: string;
  maxSupply: string;
  enableVesting: boolean;
  vestingPeriod: string;
  vestingCliff: string;
  publicSaleStart: string;
  publicSaleEnd: string;
  minPurchaseAmount: string;
  maxPurchaseAmount: string;
  treasuryAddress: string;
}

export interface SectionProps {
  form: UseFormReturn<BuyCoinFormValues>;
  sectionName: string;
  updateProgress?: (sectionName: string, isComplete: boolean) => void;
}

// Define specific prop types for each section component
export type ContractSectionProps = SectionProps;
export type TokenInfoSectionProps = SectionProps;
export type TokenomicsSectionProps = SectionProps;
export type VestingSectionProps = SectionProps;
export type SalePeriodSectionProps = SectionProps;
export type PurchaseLimitsSectionProps = SectionProps;
export type TreasurySectionProps = SectionProps;
