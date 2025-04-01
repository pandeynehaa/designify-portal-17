
import React from "react";
import { Wallet } from "lucide-react";

interface EmptyWalletStateProps {
  onConnectWallet: () => void;
}

const EmptyWalletState: React.FC<EmptyWalletStateProps> = ({ onConnectWallet }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
      <Wallet className="h-12 w-12 text-cv-white/30 mb-3" />
      <h3 className="text-sm font-medium text-cv-white mb-1">No Wallet Connected</h3>
      <p className="text-xs text-cv-white/60 mb-4">Connect your wallet to see your NFT collection</p>
      <button
        onClick={onConnectWallet}
        className="px-4 py-2 bg-cv-accent text-white rounded-md text-sm hover:bg-cv-accent/90 transition-colors"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default EmptyWalletState;
