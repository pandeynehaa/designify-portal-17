
import { toast } from "@/components/ui/use-toast";
import { CanvasElement } from "../../types/canvasElement";
import React from "react";

interface UseComponentDropHandlersProps {
  zoomLevel: number;
  setDroppedElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>;
}

export const useComponentDropHandlers = ({
  zoomLevel,
  setDroppedElements
}: UseComponentDropHandlersProps) => {
  const handleTemplateComponentDrop = (templateData: string, x: number, y: number) => {
    try {
      const component = JSON.parse(templateData);
      
      // Find existing elements and sort them by Y position
      setDroppedElements(prev => {
        // Convert all Y positions to a scale of 0-100 for consistent placement
        const sortedElements = [...prev].sort((a, b) => a.y - b.y);
        
        // Find the insertion point based on Y position
        let insertIndex = 0;
        const dropY = y / (zoomLevel / 100);
        
        for (let i = 0; i < sortedElements.length; i++) {
          if (dropY > sortedElements[i].y) {
            insertIndex = i + 1;
          }
        }
        
        // Create the new element
        const newElement = {
          type: "template-component",
          id: `template-${component.type}-${Date.now()}`,
          x: 0, // Center horizontally
          y: dropY,
          content: component.type,
          description: component.description,
          isNew: true // Mark as new for auto-selection
        };
        
        // Insert at the appropriate position and return new array
        const newElements = [
          ...sortedElements.slice(0, insertIndex),
          newElement,
          ...sortedElements.slice(insertIndex)
        ];
        
        // Readjust positions to accommodate the new element
        // This creates space for the new element by pushing down other elements
        return newElements.map((el, idx) => {
          if (idx < insertIndex) {
            return el; // Elements above stay in place
          } else if (idx === insertIndex) {
            return newElement; // The new element
          } else {
            // Push elements below down to make space
            return {
              ...el,
              y: el.y + 100 // Add vertical space
            };
          }
        });
      });
      
      toast({
        title: "Template Component Added",
        description: `Added ${component.type} to the template`
      });
    } catch (error) {
      console.error("Error adding template component:", error);
      toast({
        title: "Error",
        description: "Could not add component to template"
      });
    }
  };

  const handleComponentDrop = (componentData: string, x: number, y: number) => {
    try {
      const component = JSON.parse(componentData);
      
      // Determine width and height based on component type
      let width = 200;
      let height = 80;
      
      // Adjust size based on component type
      if (component.name === 'NFT Card') {
        width = 220;
        height = 300;
      } else if (component.name === 'Feature Card') {
        width = 250;
        height = 200;
      } else if (component.name.includes('Button')) {
        width = 180;
        height = 50;
      }
      
      const newElement = {
        type: "component",
        id: `component-${Date.now()}`,
        x: x / (zoomLevel / 100),
        y: y / (zoomLevel / 100),
        content: component.name,
        description: component.description,
        width,
        height,
        isNew: true // Mark as new for auto-selection
      };
      
      setDroppedElements(prev => [...prev, newElement]);
      
      toast({
        title: "Component Added",
        description: `Added ${component.name} to the canvas`,
      });
      
    } catch (error) {
      console.error("Error adding component:", error);
      toast({
        title: "Error",
        description: "Could not add component to canvas"
      });
    }
  };

  return {
    handleTemplateComponentDrop,
    handleComponentDrop
  };
};
