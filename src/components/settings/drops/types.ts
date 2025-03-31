
import { UseFormReturn } from "react-hook-form";

export interface DropsFormValues {
  contractAddress: string;
  network: string;
  mintPrice: string;
  maxSupply: string;
  maxPerWallet: string;
  publicSaleStart: string;
  publicSaleEnd: string;
  presaleEnabled: boolean;
  presaleStart: string;
  presaleEnd: string;
  presaleWhitelist: string;
  revealType: string;
  royaltyFee: string;
  creatorAddress: string;
}

export interface DropsSectionProps {
  form: UseFormReturn<DropsFormValues>;
}

