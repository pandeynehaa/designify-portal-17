
import React from "react";
import { CanvasElement } from "../../../types/canvasElement";
import { useComponentElement } from "../../../hooks/useComponentElement";
import ComponentControl from "./component/ComponentControl";
import ComponentEditor from "./component/ComponentEditor";
import { useSelectedElement } from "../../../hooks/useSelectedElement";

interface ComponentElementProps {
  element: CanvasElement;
  activeTool: string;
  editMode?: boolean;
}

const ComponentElement: React.FC<ComponentElementProps> = ({ 
  element, 
  activeTool,
  editMode = true // Default to edit mode
}) => {
  const {
    isSelected,
    position,
    isEditing,
    editedText,
    setEditedText,
    handleMouseDown,
    handleDoubleClick,
    handleTextBlur,
    handleTextKeyDown,
    setIsEditing,
    isDragging
  } = useComponentElement({ element, activeTool, editMode });

  const { selectElement } = useSelectedElement();
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Only select in edit mode
    if (editMode) {
      selectElement(element);
    }
  };
  
  // Handle custom background properties if they exist
  const elementBackground = element.backgroundType && element.backgroundValue 
    ? element.backgroundType === 'gradient' 
      ? element.backgroundValue 
      : element.backgroundType === 'color' 
        ? element.backgroundValue 
        : 'white'
    : 'white';
    
  // Handle custom effects if they exist
  const blurEffect = element.blurAmount ? `blur(${element.blurAmount}px)` : 'none';
  const opacity = element.opacity ? element.opacity / 100 : 1;
  
  const style = {
    position: 'absolute' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: editMode && activeTool === 'move' ? 'move' : editMode ? 'pointer' : 'default',
    transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
    minWidth: '100px', // Ensure a minimum size for text elements
    minHeight: '30px',
    opacity: editMode ? 1 : opacity,
    background: elementBackground,
    backdropFilter: blurEffect,
  };
  
  return (
    <div 
      key={element.id} 
      style={style} 
      className={`p-2 border rounded ${
        !editMode ? 'shadow-md pointer-events-none' : 
        activeTool === 'move' ? 'hover:shadow-md' : ''
      } ${isSelected && editMode ? 'canvas-element selected ring-2 ring-cv-accent' : 'canvas-element'}
      ${isDragging ? 'wiggle-animation z-50' : ''}`}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      {isEditing ? (
        <ComponentEditor 
          isEditing={isEditing}
          editedText={editedText}
          setEditedText={setEditedText}
          handleTextBlur={handleTextBlur}
          handleTextKeyDown={handleTextKeyDown}
        />
      ) : (
        element.content
      )}
      
      <ComponentControl 
        element={element}
        isSelected={isSelected}
        activeTool={activeTool}
        editMode={editMode}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default ComponentElement;
