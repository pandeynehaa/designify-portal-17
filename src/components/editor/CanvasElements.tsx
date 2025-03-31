
import React from "react";
import { CanvasElement } from "../../types/canvasElement";
import ComponentElement from "./canvas/ComponentElement";
import ImageElement from "./canvas/ImageElement";

interface CanvasElementsProps {
  droppedElements: CanvasElement[];
  activeTool: string;
}

const CanvasElements: React.FC<CanvasElementsProps> = ({ droppedElements, activeTool }) => {
  const renderElement = (element: CanvasElement) => {
    switch (element.type) {
      case 'component':
        return <ComponentElement key={element.id} element={element} activeTool={activeTool} />;
      case 'image':
        return <ImageElement key={element.id} element={element} activeTool={activeTool} />;
      default:
        return null;
    }
  };

  return (
    <>
      {droppedElements.map(renderElement)}
    </>
  );
};

export default CanvasElements;
