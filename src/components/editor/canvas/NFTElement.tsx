
import React, { useState } from "react";
import { CanvasElement } from "../../../types/canvasElement";
import ElementControls from "./ElementControls";
import ResizeHandles from "./ResizeHandles";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { Link } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface NFTElementProps {
  element: CanvasElement;
  activeTool: string;
  editMode?: boolean;
}

const NFTElement: React.FC<NFTElementProps> = ({ element, activeTool, editMode = true }) => {
  const { selectedElement, selectElement } = useSelectedElement();
  const isSelected = selectedElement?.id === element.id;
  const [rotation, setRotation] = useState(0);
  
  // Extract NFT properties from element
  const nftData = element.nftData || {
    image: element.content,
    name: "NFT Item",
    marketplaceLink: "/marketplace",
    blurAmount: 0,
    glowColor: "rgba(255, 255, 255, 0)",
    glowSpread: 0
  };
  
  const style = {
    position: 'absolute' as const,
    left: `${element.x}px`,
    top: `${element.y}px`,
    transform: `rotate(${rotation}deg)`,
    cursor: !editMode ? "pointer" : activeTool === 'select' ? 'pointer' : 'move',
    filter: `blur(${nftData.blurAmount || 0}px)`,
    boxShadow: nftData.glowSpread ? `0 0 ${nftData.glowSpread}px ${nftData.glowColor || 'rgba(255, 255, 255, 0.7)'}` : 'none',
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!editMode) {
      // In preview mode, clicking will navigate to marketplace
      if (nftData.marketplaceLink) {
        toast({
          title: "Marketplace Link",
          description: `Navigating to: ${nftData.marketplaceLink}`
        });
        // In real implementation: window.location.href = nftData.marketplaceLink;
      }
    } else {
      // In edit mode, select the element
      selectElement(element);
      
      toast({
        title: "NFT Selected",
        description: "Edit NFT properties in the panel"
      });
    }
  };

  return (
    <div
      style={style}
      className={`relative transition-all duration-150 ${isSelected ? 'canvas-element selected ring-2 ring-cv-accent' : 'canvas-element'}`}
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={nftData.image} 
          alt={nftData.name || "NFT Item"} 
          className="max-w-[300px] max-h-[300px] rounded shadow-sm"
        />
        
        {!editMode && (
          <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1.5 text-white">
            <Link size={14} />
          </div>
        )}
      </div>
      
      {isSelected && editMode && (
        <>
          <ElementControls element={element} />
          <ResizeHandles />
        </>
      )}
    </div>
  );
};

export default NFTElement;
