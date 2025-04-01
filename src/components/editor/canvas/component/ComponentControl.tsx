
import React from "react";
import { TextCursor, Move, Check } from "lucide-react";
import { CanvasElement } from "../../../../types/canvasElement";
import ElementControls from "../ElementControls";
import ResizeHandles from "../ResizeHandles";
import { toast } from "@/components/ui/use-toast";

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

  const handleMoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Dispatch a custom event to let the canvas know we're moving this element
    const moveEvent = new CustomEvent('canvas-element-move', {
      detail: { id: element.id }
    });
    window.dispatchEvent(moveEvent);
    
    // Find the parent element
    const parentElement = (e.currentTarget as HTMLElement).closest('.canvas-element');
    if (parentElement) {
      // Create a simulated mouse down event
      const mouseDownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        clientX: e.clientX,
        clientY: e.clientY
      });
      
      // Add the move-handle class temporarily
      parentElement.classList.add('move-handle');
      
      // Trigger the mouse down event
      parentElement.dispatchEvent(mouseDownEvent);
      
      // Remove the class after the event is processed
      setTimeout(() => {
        parentElement.classList.remove('move-handle');
      }, 0);
    }
    
    toast({
      title: "Move Mode Activated",
      description: "Drag to reposition the component"
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    
    toast({
      title: "Edit Mode Activated",
      description: "Edit the component's content"
    });
  };

  const handleEditComplete = () => {
    setIsEditing(false);
    
    toast({
      title: "Edits Saved",
      description: "Component content has been updated"
    });
  };

  return (
    <>
      {activeTool === 'move' && (
        <div className="absolute -top-5 -left-5 bg-cv-accent text-white p-1 rounded-full shadow-sm">
          <Move size={14} />
        </div>
      )}

      {!isEditing ? (
        <div className="absolute -top-8 left-0 flex space-x-1">
          <div 
            className="bg-cv-accent text-white p-1.5 rounded-md shadow-sm cursor-pointer flex items-center"
            onClick={handleMoveClick}
            title="Move component"
          >
            <Move size={14} className="mr-1" />
            <span className="text-xs">Move</span>
          </div>
          
          <div 
            className="bg-cv-accent text-white p-1.5 rounded-md shadow-sm cursor-pointer flex items-center"
            onClick={handleEditClick}
            title="Edit content"
          >
            <TextCursor size={14} className="mr-1" />
            <span className="text-xs">Edit</span>
          </div>
        </div>
      ) : (
        <div className="absolute -top-8 left-0 flex space-x-1">
          <div 
            className="bg-green-500 text-white p-1.5 rounded-md shadow-sm cursor-pointer flex items-center"
            onClick={handleEditComplete}
            title="Save edits"
          >
            <Check size={14} className="mr-1" />
            <span className="text-xs">Done</span>
          </div>
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
