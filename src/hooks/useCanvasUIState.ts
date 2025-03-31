
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export const useCanvasUIState = () => {
  const [showGrid, setShowGrid] = useState(true);
  const [editMode, setEditMode] = useState(true);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  
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
  
  const toggleLeftSidebar = () => {
    setShowLeftSidebar(!showLeftSidebar);
  };
  
  const toggleRightSidebar = () => {
    setShowRightSidebar(!showRightSidebar);
  };

  return {
    // State values
    showGrid,
    editMode,
    showLeftSidebar,
    showRightSidebar,
    
    // Direct setters
    setShowGrid,
    setEditMode,
    setShowLeftSidebar,
    setShowRightSidebar,
    
    // Toggle functions
    toggleGrid,
    toggleEditMode,
    toggleLeftSidebar,
    toggleRightSidebar
  };
};
