
import React, { useState } from "react";
import { CanvasElement } from "../../../types/canvasElement";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, CircleFadingPlus, Scale } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import NFTTransformProperties from "./nft/NFTTransformProperties";
import NFTEffectsProperties from "./nft/NFTEffectsProperties";
import NFTLinkProperties from "./nft/NFTLinkProperties";

interface NFTPropertiesProps {
  element: CanvasElement;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
}

const NFTProperties: React.FC<NFTPropertiesProps> = ({ element, updateElement }) => {
  const nftData = element.nftData || {
    name: "NFT Item",
    image: element.content,
    marketplaceLink: "/marketplace",
    blurAmount: 0,
    glowColor: "#ffffff",
    glowSpread: 0,
    rotation: 0,
    scale: 1,
    width: 300,
    height: 300
  };
  
  const [values, setValues] = useState({
    blurAmount: nftData.blurAmount || 0,
    glowColor: nftData.glowColor || "#ffffff",
    glowSpread: nftData.glowSpread || 0,
    rotation: nftData.rotation || 0,
    scale: nftData.scale || 1,
    marketplaceLink: nftData.marketplaceLink || "/marketplace",
    width: nftData.width || 300,
    height: nftData.height || 300
  });

  const handleChange = (field: string, value: any) => {
    setValues({ ...values, [field]: value });
  };

  const updateElementPosition = (updates: { x?: number; y?: number }) => {
    const updatedValues = { ...element, ...updates };
    updateElement(element.id, updatedValues);
  };

  const handleSave = () => {
    updateElement(element.id, {
      nftData: {
        ...nftData,
        ...values
      }
    });
    
    toast({
      title: "NFT Updated",
      description: "Changes have been saved"
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <Label className="text-xs text-editor-muted mb-1.5">NFT Name</Label>
        <div className="text-sm font-medium">{nftData.name || "NFT Item"}</div>
      </div>

      <Tabs defaultValue="transform" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="transform" className="flex-1">
            <Scale size={14} className="mr-1.5" /> Transform
          </TabsTrigger>
          <TabsTrigger value="effects" className="flex-1">
            <CircleFadingPlus size={14} className="mr-1.5" /> Effects
          </TabsTrigger>
          <TabsTrigger value="link" className="flex-1">
            <Link size={14} className="mr-1.5" /> Link
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transform">
          <NFTTransformProperties 
            values={values}
            elementPosition={{ x: element.x, y: element.y }} 
            handleChange={handleChange}
            updateElementPosition={updateElementPosition}
          />
        </TabsContent>
        
        <TabsContent value="effects">
          <NFTEffectsProperties values={values} handleChange={handleChange} />
        </TabsContent>
        
        <TabsContent value="link">
          <NFTLinkProperties 
            marketplaceLink={values.marketplaceLink} 
            handleChange={handleChange} 
          />
        </TabsContent>
      </Tabs>

      <button 
        className="w-full py-2 px-4 bg-cv-accent text-white rounded-md hover:bg-cv-accent/90 transition-colors"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
};

export default NFTProperties;
