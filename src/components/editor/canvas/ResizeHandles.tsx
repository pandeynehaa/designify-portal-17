
import React from "react";

export type ResizeDirection = 'n' | 'e' | 's' | 'w' | 'ne' | 'se' | 'sw' | 'nw';

interface ResizeHandleProps {
  direction: ResizeDirection;
  onMouseDown: (e: React.MouseEvent, direction: ResizeDirection) => void;
  className?: string;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ 
  direction, 
  onMouseDown, 
  className 
}) => {
  return (
    <div 
      className={`resize-handle-${direction} resize-handle ${className || ''}`} 
      onMouseDown={(e) => onMouseDown(e, direction)}
    />
  );
};

interface ResizeHandlesProps {
  onResizeStart?: (e: React.MouseEvent, direction: ResizeDirection) => void;
  disabledHandles?: ResizeDirection[];
  handleClassName?: string;
  showHandles?: boolean;
}

const ResizeHandles: React.FC<ResizeHandlesProps> = ({ 
  onResizeStart,
  disabledHandles = [],
  handleClassName = "",
  showHandles = true
}) => {
  const handleMouseDown = (e: React.MouseEvent, direction: ResizeDirection) => {
    if (onResizeStart) {
      onResizeStart(e, direction);
    }
  };

  if (!showHandles) {
    return null;
  }

  const allDirections: ResizeDirection[] = ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'];
  const enabledDirections = allDirections.filter(dir => !disabledHandles.includes(dir));

  return (
    <>
      {enabledDirections.map(direction => (
        <ResizeHandle 
          key={direction} 
          direction={direction} 
          onMouseDown={handleMouseDown}
          className={handleClassName}
        />
      ))}
    </>
  );
};

export default ResizeHandles;
