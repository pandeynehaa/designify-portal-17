
import React from "react";
import { TextCursor, Move, Check, Trash2, Copy, ArrowUp, ArrowDown, Lock, Unlock } from "lucide-react";
import { CanvasElement } from "../../../../types/canvasElement";
import ElementControls from "../ElementControls";
import ResizeHandles from "../ResizeHandles";
import { toast } from "@/components/ui/use-toast";
import { useCanvasState } from "@/hooks/useCanvasState";

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
  const { updateElement, deleteElement, duplicateElement } = useCanvasState();
  
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
  
  const handleDuplicateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateElement(element.id);
    
    toast({
      title: "Component Duplicated",
      description: "A copy of the component has been created"
    });
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElement(element.id);
    
    toast({
      title: "Component Deleted",
      description: "The component has been removed from the canvas"
    });
  };
  
  const handleLockToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateElement(element.id, { locked: !element.locked });
    
    toast({
      title: element.locked ? "Component Unlocked" : "Component Locked",
      description: element.locked 
        ? "The component can now be moved and edited" 
        : "The component is now locked from editing"
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
        <div className="absolute -top-10 left-0 flex space-x-1 bg-black/10 backdrop-blur-sm p-1 rounded-md">
          <button 
            className="bg-cv-accent text-white p-1.5 rounded-md shadow-sm cursor-pointer flex items-center hover:bg-cv-accent/90 transition-colors"
            onClick={handleMoveClick}
            title="Move component"
          >
            <Move size={14} className="mr-1" />
            <span className="text-xs">Move</span>
          </button>
          
          {element.type === 'component' && (
            <button 
              className="bg-cv-accent text-white p-1.5 rounded-md shadow-sm cursor-pointer flex items-center hover:bg-cv-accent/90 transition-colors"
              onClick={handleEditClick}
              title="Edit content"
              disabled={element.locked}
            >
              <TextCursor size={14} className="mr-1" />
              <span className="text-xs">Edit</span>
            </button>
          )}
          
          <button 
            className="bg-blue-500 text-white p-1.5 rounded-md shadow-sm cursor-pointer flex items-center hover:bg-blue-600 transition-colors"
            onClick={handleDuplicateClick}
            title="Duplicate component"
          >
            <Copy size={14} />
          </button>
          
          <button 
            className="bg-gray-700 text-white p-1.5 rounded-md shadow-sm cursor-pointer flex items-center hover:bg-gray-800 transition-colors"
            onClick={handleLockToggle}
            title={element.locked ? "Unlock component" : "Lock component"}
          >
            {element.locked ? <Lock size={14} /> : <Unlock size={14} />}
          </button>
          
          <button 
            className="bg-red-500 text-white p-1.5 rounded-md shadow-sm cursor-pointer flex items-center hover:bg-red-600 transition-colors"
            onClick={handleDeleteClick}
            title="Delete component"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ) : (
        <div className="absolute -top-8 left-0 flex space-x-1">
          <button 
            className="bg-green-500 text-white p-1.5 rounded-md shadow-sm cursor-pointer flex items-center hover:bg-green-600 transition-colors"
            onClick={handleEditComplete}
            title="Save edits"
          >
            <Check size={14} className="mr-1" />
            <span className="text-xs">Done</span>
          </button>
        </div>
      )}
      
      {!isEditing && !element.locked && (
        <>
          <ElementControls element={element} />
          <ResizeHandles />
        </>
      )}
    </>
  );
};

export default ComponentControl;
