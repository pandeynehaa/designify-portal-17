
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
  
  const style = {
    position: 'absolute' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: editMode && activeTool === 'move' ? 'move' : editMode ? 'pointer' : 'default',
    transition: 'box-shadow 0.2s ease',
    minWidth: '100px', // Ensure a minimum size for text elements
    minHeight: '30px',
    opacity: editMode ? 1 : 0.95, // Slightly transparent in preview mode
  };
  
  return (
    <div 
      key={element.id} 
      style={style} 
      className={`p-2 bg-white border rounded ${
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
