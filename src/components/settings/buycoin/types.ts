
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
  form: any;
  sectionName: string;
  updateProgress?: (sectionName: string, isComplete: boolean) => void;
}
