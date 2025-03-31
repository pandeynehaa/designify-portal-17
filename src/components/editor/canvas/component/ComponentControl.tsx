
import React from "react";
import { TextCursor, Move } from "lucide-react";
import { CanvasElement } from "../../../../types/canvasElement";
import ElementControls from "../ElementControls";
import ResizeHandles from "../ResizeHandles";

interface ComponentControlProps {
  element: CanvasElement;
  isSelected: boolean;
  activeTool: string;
  editMode: boolean;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComponentControl: React.FC<ComponentControlProps> = ({ 
  element, 
  isSelected, 
  activeTool, 
  editMode, 
  isEditing, 
  setIsEditing 
}) => {
  if (!isSelected || !editMode) return null;

  return (
    <>
      {activeTool === 'move' && (
        <div className="absolute -top-5 -left-5 bg-cv-accent text-white p-1 rounded-full shadow-sm">
          <Move size={14} />
        </div>
      )}

      {!isEditing && (
        <div className="absolute -top-5 -right-5 bg-cv-accent text-white p-1 rounded-full shadow-sm cursor-pointer"
            onClick={() => setIsEditing(true)}>
          <TextCursor size={14} />
        </div>
      )}
      
      {!isEditing && (
        <>
          <ElementControls element={element} />
          <ResizeHandles />
        </>
      )}
    </>
  );
};

export default ComponentControl;
