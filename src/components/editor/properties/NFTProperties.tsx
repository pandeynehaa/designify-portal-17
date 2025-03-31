
import React, { useState } from "react";
import { CanvasElement } from "../../../types/canvasElement";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, Link, CircleFadingPlus, Scale } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
    scale: 1
  };
  
  const [values, setValues] = useState({
    blurAmount: nftData.blurAmount || 0,
    glowColor: nftData.glowColor || "#ffffff",
    glowSpread: nftData.glowSpread || 0,
    rotation: nftData.rotation || 0,
    scale: nftData.scale || 1,
    marketplaceLink: nftData.marketplaceLink || "/marketplace"
  });

  const handleChange = (field: string, value: any) => {
    setValues({ ...values, [field]: value });
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
        
        <TabsContent value="transform" className="space-y-4 pt-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="rotation" className="text-xs text-editor-muted">Rotation</Label>
              <span className="text-xs">{values.rotation}°</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-editor-muted" />
              <Slider
                id="rotation"
                min={0}
                max={360}
                step={1}
                value={[values.rotation]}
                onValueChange={(value) => handleChange('rotation', value[0])}
                className="flex-1"
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="scale" className="text-xs text-editor-muted">Scale</Label>
              <span className="text-xs">{values.scale.toFixed(1)}x</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale size={16} className="text-editor-muted" />
              <Slider
                id="scale"
                min={0.5}
                max={3}
                step={0.1}
                value={[values.scale]}
                onValueChange={(value) => handleChange('scale', value[0])}
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="pos-x" className="text-xs text-editor-muted mb-1.5">X Position</Label>
              <Input
                id="pos-x"
                type="number"
                value={element.x}
                onChange={(e) => updateElement(element.id, { x: parseInt(e.target.value) || 0 })}
                className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
            <div>
              <Label htmlFor="pos-y" className="text-xs text-editor-muted mb-1.5">Y Position</Label>
              <Input
                id="pos-y"
                type="number"
                value={element.y}
                onChange={(e) => updateElement(element.id, { y: parseInt(e.target.value) || 0 })}
                className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="effects" className="space-y-4 pt-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="blur" className="text-xs text-editor-muted">Blur Amount</Label>
              <span className="text-xs">{values.blurAmount}px</span>
            </div>
            <Slider
              id="blur"
              min={0}
              max={10}
              step={0.5}
              value={[values.blurAmount]}
              onValueChange={(value) => handleChange('blurAmount', value[0])}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="glowSpread" className="text-xs text-editor-muted">Glow Spread</Label>
              <span className="text-xs">{values.glowSpread}px</span>
            </div>
            <Slider
              id="glowSpread"
              min={0}
              max={30}
              step={1}
              value={[values.glowSpread]}
              onValueChange={(value) => handleChange('glowSpread', value[0])}
            />
          </div>
          
          <div>
            <Label htmlFor="glowColor" className="text-xs text-editor-muted mb-1.5">Glow Color</Label>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-md border border-gray-300" 
                style={{ backgroundColor: values.glowColor }}
              />
              <Input
                id="glowColor"
                type="color"
                value={values.glowColor}
                onChange={(e) => handleChange('glowColor', e.target.value)}
                className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="link" className="space-y-4 pt-4">
          <div>
            <Label htmlFor="marketplaceLink" className="text-xs text-editor-muted mb-1.5">Marketplace Link</Label>
            <Input
              id="marketplaceLink"
              value={values.marketplaceLink}
              onChange={(e) => handleChange('marketplaceLink', e.target.value)}
              className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
            />
            <p className="text-xs text-gray-400 mt-1">
              Where users will be directed when clicking this NFT in preview mode
            </p>
          </div>
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
