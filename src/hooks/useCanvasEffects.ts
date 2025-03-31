import { toast } from "@/components/ui/use-toast";
import { CanvasElement } from "../types/canvasElement";
import { useCanvasHistory } from "./useCanvasHistory";
import { CanvasEffectsReturn, NFTEffectsProps, BackgroundPropertiesProps } from "../types/canvasElementTypes";

export const useCanvasEffects = (
  droppedElements: CanvasElement[],
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>
): CanvasEffectsReturn => {
  const { addToHistory } = useCanvasHistory();

  // Update NFT effects
  const updateNFTEffects = (id: string, effects: NFTEffectsProps) => {
    // Get the original element before update
    const originalElement = droppedElements.find(el => el.id === id);
    
    setDroppedElements(elements => 
      elements.map(element => {
        if (element.id === id && element.type === 'nft') {
          const updatedElement = { 
            ...element, 
            nftData: { 
              ...(element.nftData || {}), 
              ...effects 
            } 
          };
          return updatedElement;
        }
        return element;
      })
    );
    
    // Add to history for the NFT update
    if (originalElement && originalElement.type === 'nft') {
      const updatedElement = { 
        ...originalElement, 
        nftData: { 
          ...(originalElement.nftData || {}), 
          ...effects 
        } 
      };
      
      addToHistory({
        type: 'update',
        elements: [updatedElement],
        previousElements: [originalElement]
      });
    }
    
    toast({
      title: "NFT Effects Updated",
      description: "Visual effects have been applied to the NFT"
    });
  };
  
  // Update background properties
  const updateBackgroundProperties = (id: string, properties: BackgroundPropertiesProps) => {
    // Get the original element before update
    const originalElement = droppedElements.find(el => el.id === id);
    
    setDroppedElements(elements => 
      elements.map(element => {
        if (element.id === id) {
          return { ...element, ...properties };
        }
        return element;
      })
    );
    
    // Add to history
    if (originalElement) {
      const updatedElement = { ...originalElement, ...properties };
      
      addToHistory({
        type: 'update',
        elements: [updatedElement],
        previousElements: [originalElement]
      });
    }
    
    toast({
      title: "Background Updated",
      description: "Background properties have been updated"
    });
  };

  return {
    updateNFTEffects,
    updateBackgroundProperties
  };
};
