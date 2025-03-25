
import React from "react";

interface ElementProps {
  element: {
    type: string;
    id: string;
    x: number;
    y: number;
    content?: string;
  };
  activeTool: string;
}

const CanvasElement: React.FC<ElementProps> = ({ element, activeTool }) => {
  const style = {
    position: 'absolute' as const,
    left: `${element.x}px`,
    top: `${element.y}px`,
    cursor: activeTool === 'select' ? 'pointer' : 'move',
  };
  
  if (element.type === 'component') {
    return (
      <div key={element.id} style={style} className="p-2 bg-white border border-gray-200 rounded shadow-sm">
        {element.content}
      </div>
    );
  } else if (element.type === 'image') {
    return (
      <img 
        key={element.id} 
        src={element.content} 
        alt="Dropped image" 
        style={style}
        className="max-w-[300px] max-h-[300px] rounded shadow-sm"
      />
    );
  }
  return null;
};

interface CanvasElementsProps {
  droppedElements: Array<{
    type: string;
    id: string;
    x: number;
    y: number;
    content?: string;
  }>;
  activeTool: string;
}

const CanvasElements: React.FC<CanvasElementsProps> = ({ droppedElements, activeTool }) => {
  return (
    <>
      {droppedElements.map(element => (
        <CanvasElement key={element.id} element={element} activeTool={activeTool} />
      ))}
    </>
  );
};

export default CanvasElements;
