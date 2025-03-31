
import React from "react";
import { Pencil, Trash2, Copy, Move } from "lucide-react";
import { CanvasElement } from "../../../types/canvasElement";
import { toast } from "@/components/ui/use-toast";

interface ElementControlsProps {
  element: CanvasElement;
}

const ElementControls: React.FC<ElementControlsProps> = ({ element }) => {
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
    toast({
      title: "Copy Element",
      description: "Element has been copied to clipboard"
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Delete Element",
      description: "Element has been deleted from the canvas"
    });
  };

  return (
    <div className="absolute top-0 right-0 -mt-8 flex space-x-1 z-10">
      <button 
        className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded"
        onClick={handleMoveClick}
      >
        <Move size={12} />
      </button>
      <button 
        className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded"
        onClick={handleEditClick}
      >
        <Pencil size={12} />
      </button>
      <button 
        className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded"
        onClick={handleCopyClick}
      >
        <Copy size={12} />
      </button>
      <button 
        className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded"
        onClick={handleDeleteClick}
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
};

export default ElementControls;
