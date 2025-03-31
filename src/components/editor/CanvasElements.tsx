
import React, { useState } from "react";
import { Pencil, Trash2, Copy, Move } from "lucide-react";

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
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const style = {
    position: 'absolute' as const,
    left: `${element.x}px`,
    top: `${element.y}px`,
    cursor: activeTool === 'select' ? 'pointer' : 'move',
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  if (element.type === 'component') {
    return (
      <div 
        key={element.id} 
        style={style} 
        className={`p-2 bg-white border rounded shadow-sm transition-all duration-150 ${isSelected ? 'canvas-element selected' : 'canvas-element'}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {element.content}
        
        {(isSelected || isHovered) && (
          <div className="canvas-element-controls">
            <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
              <Move size={12} />
            </button>
            <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
              <Pencil size={12} />
            </button>
            <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
              <Copy size={12} />
            </button>
            <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
              <Trash2 size={12} />
            </button>
          </div>
        )}
        
        {isSelected && (
          <>
            <div className="resize-handle-n resize-handle"></div>
            <div className="resize-handle-e resize-handle"></div>
            <div className="resize-handle-s resize-handle"></div>
            <div className="resize-handle-w resize-handle"></div>
            <div className="resize-handle-ne resize-handle"></div>
            <div className="resize-handle-se resize-handle"></div>
            <div className="resize-handle-sw resize-handle"></div>
            <div className="resize-handle-nw resize-handle"></div>
          </>
        )}
      </div>
    );
  } else if (element.type === 'image') {
    return (
      <div
        style={style}
        className={`relative transition-all duration-150 ${isSelected ? 'canvas-element selected' : 'canvas-element'}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          src={element.content} 
          alt="Dropped image" 
          className="max-w-[300px] max-h-[300px] rounded shadow-sm"
        />
        
        {(isSelected || isHovered) && (
          <div className="canvas-element-controls">
            <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
              <Move size={12} />
            </button>
            <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
              <Pencil size={12} />
            </button>
            <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
              <Copy size={12} />
            </button>
            <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
              <Trash2 size={12} />
            </button>
          </div>
        )}
        
        {isSelected && (
          <>
            <div className="resize-handle-n resize-handle"></div>
            <div className="resize-handle-e resize-handle"></div>
            <div className="resize-handle-s resize-handle"></div>
            <div className="resize-handle-w resize-handle"></div>
            <div className="resize-handle-ne resize-handle"></div>
            <div className="resize-handle-se resize-handle"></div>
            <div className="resize-handle-sw resize-handle"></div>
            <div className="resize-handle-nw resize-handle"></div>
          </>
        )}
      </div>
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
