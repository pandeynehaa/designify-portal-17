
import React from "react";

interface ResizeHandlesProps {
  onResizeStart?: (e: React.MouseEvent, direction: string) => void;
}

const ResizeHandles: React.FC<ResizeHandlesProps> = ({ onResizeStart }) => {
  const handleMouseDown = (e: React.MouseEvent, direction: string) => {
    if (onResizeStart) {
      onResizeStart(e, direction);
    }
  };

  return (
    <>
      <div 
        className="resize-handle-n resize-handle" 
        onMouseDown={(e) => handleMouseDown(e, 'n')}
      ></div>
      <div 
        className="resize-handle-e resize-handle" 
        onMouseDown={(e) => handleMouseDown(e, 'e')}
      ></div>
      <div 
        className="resize-handle-s resize-handle" 
        onMouseDown={(e) => handleMouseDown(e, 's')}
      ></div>
      <div 
        className="resize-handle-w resize-handle" 
        onMouseDown={(e) => handleMouseDown(e, 'w')}
      ></div>
      <div 
        className="resize-handle-ne resize-handle" 
        onMouseDown={(e) => handleMouseDown(e, 'ne')}
      ></div>
      <div 
        className="resize-handle-se resize-handle" 
        onMouseDown={(e) => handleMouseDown(e, 'se')}
      ></div>
      <div 
        className="resize-handle-sw resize-handle" 
        onMouseDown={(e) => handleMouseDown(e, 'sw')}
      ></div>
      <div 
        className="resize-handle-nw resize-handle" 
        onMouseDown={(e) => handleMouseDown(e, 'nw')}
      ></div>
    </>
  );
};

export default ResizeHandles;
