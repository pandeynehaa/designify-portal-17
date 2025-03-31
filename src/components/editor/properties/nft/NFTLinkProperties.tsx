
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NFTLinkPropertiesProps {
  marketplaceLink: string;
  handleChange: (field: string, value: string) => void;
}

const NFTLinkProperties: React.FC<NFTLinkPropertiesProps> = ({ marketplaceLink, handleChange }) => {
  return (
    <div className="space-y-4 pt-4">
      <div>
        <Label htmlFor="marketplaceLink" className="text-xs text-editor-muted mb-1.5">Marketplace Link</Label>
        <Input
          id="marketplaceLink"
          value={marketplaceLink}
          onChange={(e) => handleChange('marketplaceLink', e.target.value)}
          className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
        />
        <p className="text-xs text-gray-400 mt-1">
          Where users will be directed when clicking this NFT in preview mode
        </p>
      </div>
    </div>
  );
};

export default NFTLinkProperties;
