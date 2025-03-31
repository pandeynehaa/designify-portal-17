
import { useState } from "react";
import { CanvasElement } from "../types/canvasElement";
import { toast } from "@/components/ui/use-toast";

export const useCanvasState = () => {
  const [droppedElements, setDroppedElements] = useState<CanvasElement[]>([]);
  const [showGrid, setShowGrid] = useState(true);
  const [editMode, setEditMode] = useState(true);
  
  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
    toast({
      title: editMode ? "Preview Mode" : "Edit Mode",
      description: editMode ? "Now viewing the design in preview mode" : "Now editing the design"
    });
  };

  const handleInsertText = () => {
    const newId = `text-${Date.now()}`;
    setDroppedElements([
      ...droppedElements,
      {
        type: 'component',
        id: newId,
        x: 100,
        y: 100,
        content: 'New Text Element'
      }
    ]);
    toast({
      title: "Text Added",
      description: "New text element has been added to the canvas"
    });
  };

  const handleInsertImage = () => {
    const newId = `image-${Date.now()}`;
    setDroppedElements([
      ...droppedElements,
      {
        type: 'image',
        id: newId,
        x: 150,
        y: 150,
        content: 'https://via.placeholder.com/150'
      }
    ]);
    toast({
      title: "Image Added",
      description: "New image element has been added to the canvas"
    });
  };

  const handleInsertComponent = () => {
    const newId = `component-${Date.now()}`;
    setDroppedElements([
      ...droppedElements,
      {
        type: 'component',
        id: newId,
        x: 200,
        y: 200,
        content: 'Button'
      }
    ]);
    toast({
      title: "Component Added",
      description: "New component has been added to the canvas"
    });
  };
  
  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setDroppedElements(elements => 
      elements.map(element => 
        element.id === id ? { ...element, ...updates } : element
      )
    );
    
    toast({
      title: "Element Updated",
      description: "Changes have been applied to the element"
    });
  };
  
  return {
    droppedElements,
    setDroppedElements,
    showGrid,
    toggleGrid,
    editMode,
    toggleEditMode,
    handleInsertText,
    handleInsertImage,
    handleInsertComponent,
    updateElement
  };
};
