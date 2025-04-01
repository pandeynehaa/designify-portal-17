
import React from "react";
import { CanvasElement } from "../../../types/canvasElement";
import ComponentElement from "./ComponentElement";
import ImageElement from "./ImageElement";
import NFTElement from "./NFTElement";
import StickerElement from "./StickerElement";
import ImagePlaceholder from "./ImagePlaceholder";

interface CanvasElementRendererProps {
  element: CanvasElement;
  activeTool: string;
  editMode: boolean;
}

const CanvasElementRenderer: React.FC<CanvasElementRendererProps> = ({ 
  element, 
  activeTool, 
  editMode 
}) => {
  // Skip rendering if the element's type is template-component as they're handled separately
  if (element.type === 'template-component') {
    return null;
  }

  switch (element.type) {
    case 'component':
      return (
        <ComponentElement 
          element={{...element, id: element.id}} 
          activeTool={activeTool} 
          editMode={editMode} 
        />
      );
    case 'image':
      return <ImageElement element={element} activeTool={activeTool} />;
    case 'nft':
      return <NFTElement element={element} activeTool={activeTool} editMode={editMode} />;
    case 'sticker':
      return <StickerElement element={element} activeTool={activeTool} />;
    case 'placeholder':
      return <ImagePlaceholder element={element} activeTool={activeTool} />;
    default:
      return null;
  }
};

export default CanvasElementRenderer;
