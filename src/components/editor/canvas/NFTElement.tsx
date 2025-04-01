
import React from "react";
import { CanvasElement } from "../../../types/canvasElement";
import ElementControls from "./ElementControls";
import ResizeHandles from "./ResizeHandles";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import NFTElementImage from "./nft/NFTElementImage";
import NFTElementWrapper from "./nft/NFTElementWrapper";
import { useNFTElement } from "./nft/useNFTElement";

interface NFTElementProps {
  element: CanvasElement;
  activeTool: string;
  editMode?: boolean;
}

const NFTElement: React.FC<NFTElementProps> = ({ element, activeTool, editMode = true }) => {
  const { 
    isSelected, 
    isDeleting, 
    nftData, 
    style, 
    handleClick, 
    handleResizeStart 
  } = useNFTElement({ element, editMode });

  return (
    <NFTElementWrapper
      element={element}
      isSelected={isSelected}
      isDeleting={isDeleting}
      style={style}
      onClick={handleClick}
    >
      <NFTElementImage nftData={nftData} editMode={editMode} />
      
      {isSelected && editMode && (
        <>
          <ElementControls element={element} />
          <ResizeHandles onResizeStart={handleResizeStart} />
        </>
      )}
    </NFTElementWrapper>
  );
};

export default NFTElement;
