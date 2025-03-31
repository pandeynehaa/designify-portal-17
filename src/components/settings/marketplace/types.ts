
export interface MarketplaceFormValues {
  contractAddress: string;
  network: string;
  marketplaceFee: string;
  royaltyFee: string;
  enableAuctions: boolean;
  enableFixedPrice: boolean;
  enableOffers: boolean;
  curatorAddress: string;
  treasuryAddress: string;
}

export interface SectionProps {
  form: any;
}
