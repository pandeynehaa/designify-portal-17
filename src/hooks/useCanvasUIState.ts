
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export const useCanvasUIState = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [editMode, setEditMode] = useState(true);
  
  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
    toast({
      title: editMode ? "Preview Mode" : "Edit Mode",
      description: editMode 
        ? "Now viewing the design in preview mode. Elements cannot be edited." 
        : "Now editing the design. You can modify elements on the canvas."
    });
  };

  return {
    showGrid,
    toggleGrid,
    editMode,
    toggleEditMode
  };
};
