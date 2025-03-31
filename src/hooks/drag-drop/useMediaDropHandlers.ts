
import { toast } from "@/components/ui/use-toast";
import { CanvasElement } from "../../types/canvasElement";
import React from "react";

interface UseMediaDropHandlersProps {
  zoomLevel: number;
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
}

export const useMediaDropHandlers = ({
  zoomLevel,
  setDroppedElements
}: UseMediaDropHandlersProps) => {
  const handleImageDrop = (imageData: string, x: number, y: number) => {
    const image = JSON.parse(imageData);
    const newElement = {
      type: "image",
      id: `image-${Date.now()}`,
      x: x / (zoomLevel / 100),
      y: y / (zoomLevel / 100),
      content: image.url
    };
    
    setDroppedElements(prev => [...prev, newElement]);
    toast({
      title: "Image Added",
      description: "Image added to the canvas"
    });
  };

  const handleNFTDrop = (nftData: string, x: number, y: number) => {
    const nft = JSON.parse(nftData);
    const newElement = {
      type: "nft",
      id: `nft-${Date.now()}`,
      x: x / (zoomLevel / 100),
      y: y / (zoomLevel / 100),
      content: nft.image,
      nftData: {
        name: nft.name,
        image: nft.image,
        collection: nft.collection,
        marketplaceLink: nft.marketplaceLink,
        blurAmount: 0,
        glowColor: "rgba(255, 255, 255, 0)",
        glowSpread: 0,
        width: 300,
        height: 300,
        rotation: 0,
        scale: 1
      }
    };
    
    setDroppedElements(prev => [...prev, newElement]);
    toast({
      title: "NFT Added",
      description: `Added ${nft.name} to the canvas`
    });
  };

  const handleFileUpload = (files: FileList, x: number, y: number) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newElement = {
              type: "image",
              id: `image-${Date.now()}`,
              x: x / (zoomLevel / 100),
              y: y / (zoomLevel / 100),
              content: event.target.result as string
            };
            
            setDroppedElements(prev => [...prev, newElement]);
          }
        };
        reader.readAsDataURL(file);
        
        toast({
          title: "Image Uploaded",
          description: "Your image was added to the canvas"
        });
      }
    });
  };

  return {
    handleImageDrop,
    handleNFTDrop,
    handleFileUpload
  };
};
