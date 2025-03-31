
import React from "react";
import { Pencil, Trash2, Copy, Move, Undo, Redo, Layers } from "lucide-react";
import { CanvasElement } from "../../../types/canvasElement";
import { useCanvasState } from "../../../hooks/useCanvasState";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ElementControlsProps {
  element: CanvasElement;
}

const ElementControls: React.FC<ElementControlsProps> = ({ element }) => {
  const { deleteElement, duplicateElement, undoAction, redoAction, layers, moveElementToLayer } = useCanvasState();
  const { selectElement } = useSelectedElement();

  const handleMoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Move Element",
      description: "You can now drag the element to a new position"
    });
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Edit Element",
      description: `Editing ${element.type} properties`
    });
  };

  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateElement(element.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElement(element.id);
    selectElement(null);
    
    toast({
      title: "Element Deleted",
      description: "The selected element has been removed from the canvas"
    });
  };

  const handleUndoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    undoAction();
  };

  const handleRedoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    redoAction();
  };

  return (
    <div className="absolute top-0 right-0 -mt-8 flex space-x-1 z-10">
      <button 
        className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded"
        onClick={handleMoveClick}
        title="Move"
      >
        <Move size={12} />
      </button>
      <button 
        className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded"
        onClick={handleEditClick}
        title="Edit"
      >
        <Pencil size={12} />
      </button>
      <button 
        className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded"
        onClick={handleCopyClick}
        title="Duplicate"
      >
        <Copy size={12} />
      </button>
      
      {/* Layer Menu Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded"
            title="Change Layer"
          >
            <Layers size={12} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-cv-gray border-cv-lightgray text-cv-white">
          <DropdownMenuLabel className="text-xs">Move to Layer</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {layers.map(layer => (
            <DropdownMenuItem
              key={layer.id}
              onClick={() => {
                moveElementToLayer(element.id, layer.id);
                toast({
                  title: "Element Moved",
                  description: `Moved to ${layer.name}`
                });
              }}
              className="text-xs cursor-pointer hover:bg-cv-lightgray/20"
              disabled={layer.id === element.layerId || layer.locked}
            >
              {layer.name} {layer.id === element.layerId && "(Current)"}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <button 
        className="p-1 bg-cv-darkgray text-cv-white hover:bg-red-500 transition-colors rounded"
        onClick={handleDeleteClick}
        title="Delete"
      >
        <Trash2 size={12} />
      </button>
      <button 
        className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded"
        onClick={handleUndoClick}
        title="Undo"
      >
        <Undo size={12} />
      </button>
      <button 
        className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded"
        onClick={handleRedoClick}
        title="Redo"
      >
        <Redo size={12} />
      </button>
    </div>
  );
};

export default ElementControls;
