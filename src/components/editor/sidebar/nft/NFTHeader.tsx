
import React from "react";
import { RefreshCw, Wallet } from "lucide-react";

interface NFTHeaderProps {
  isWalletConnected: boolean;
  onRefresh: () => void;
  onConnectWallet: () => void;
}

const NFTHeader: React.FC<NFTHeaderProps> = ({ 
  isWalletConnected, 
  onRefresh, 
  onConnectWallet 
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-medium text-cv-white">Your NFTs</h3>
      <div className="flex gap-1">
        <button
          onClick={onRefresh}
          className="p-1.5 text-cv-white bg-cv-gray rounded hover:bg-cv-lightgray transition-colors"
          title="Refresh NFTs"
          disabled={!isWalletConnected}
        >
          <RefreshCw size={14} />
        </button>
        {!isWalletConnected && (
          <button
            onClick={onConnectWallet}
            className="p-1.5 text-cv-white bg-cv-gray rounded hover:bg-cv-lightgray transition-colors"
            title="Connect Wallet"
          >
            <Wallet size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NFTHeader;
