
import { DragEvent } from "react";

interface UseProcessDropDataProps {
  handleTemplateComponentDrop: (templateData: string, x: number, y: number) => void;
  handleComponentDrop: (componentData: string, x: number, y: number) => void;
  handleImageDrop: (imageData: string, x: number, y: number) => void;
  handleNFTDrop: (nftData: string, x: number, y: number) => void;
  handleStickerDrop: (stickerData: string, x: number, y: number) => void;
  handleFileUpload: (files: FileList, x: number, y: number) => void;
}

export const useProcessDropData = ({
  handleTemplateComponentDrop,
  handleComponentDrop,
  handleImageDrop,
  handleNFTDrop,
  handleStickerDrop,
  handleFileUpload
}: UseProcessDropDataProps) => {
  
  // Process drop data and delegate to the appropriate handler
  const processDropData = (e: DragEvent<HTMLDivElement>, x: number, y: number) => {
    const componentData = e.dataTransfer.getData("application/component");
    const imageData = e.dataTransfer.getData("application/image");
    const nftData = e.dataTransfer.getData("application/nft");
    const templateData = e.dataTransfer.getData("application/template-component");
    const stickerData = e.dataTransfer.getData("application/sticker");
    
    if (templateData) {
      handleTemplateComponentDrop(templateData, x, y);
    } else if (componentData) {
      handleComponentDrop(componentData, x, y);
    } else if (imageData) {
      handleImageDrop(imageData, x, y);
    } else if (nftData) {
      handleNFTDrop(nftData, x, y);
    } else if (stickerData) {
      handleStickerDrop(stickerData, x, y);
    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files, x, y);
    }
  };

  return { processDropData };
};
