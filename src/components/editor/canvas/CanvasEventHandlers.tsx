
import React, { DragEvent, useRef } from "react";
import { toast } from "@/components/ui/use-toast";

interface CanvasEventHandlersProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  zoomLevel: number;
  setDroppedElements: React.Dispatch<React.SetStateAction<Array<{
    type: string;
    id: string;
    x: number;
    y: number;
    content?: string;
  }>>>;
  children: React.ReactNode;
}

const CanvasEventHandlers: React.FC<CanvasEventHandlersProps> = ({
  canvasRef,
  zoomLevel,
  setDroppedElements,
  children
}) => {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (canvasRef.current) {
      canvasRef.current.classList.add("drag-over");
    }
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (canvasRef.current) {
      canvasRef.current.classList.remove("drag-over");
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (canvasRef.current) {
      canvasRef.current.classList.remove("drag-over");
    }
    
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    const componentData = e.dataTransfer.getData("application/component");
    const imageData = e.dataTransfer.getData("application/image");
    
    if (componentData) {
      const component = JSON.parse(componentData);
      const newElement = {
        type: "component",
        id: `component-${Date.now()}`,
        x: x / (zoomLevel / 100),
        y: y / (zoomLevel / 100),
        content: component.name
      };
      
      setDroppedElements(prev => [...prev, newElement]);
      toast({
        title: "Component Added",
        description: `Added ${component.name} to the canvas`
      });
    } else if (imageData) {
      const image = JSON.parse(imageData);
      const newElement = {
        type: "image",
        id: `image-${Date.now()}`,
        x: x / (zoomLevel / 100),
        y: y / (zoomLevel / 100),
        content: image.url
      };
      
      setDroppedElements(prev => [...prev, newElement]);
      toast({
        title: "Image Added",
        description: "Image added to the canvas"
      });
    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files, x, y);
    }
  };

  const handleFileUpload = (files: FileList, x: number, y: number) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newElement = {
              type: "image",
              id: `image-${Date.now()}`,
              x: x / (zoomLevel / 100),
              y: y / (zoomLevel / 100),
              content: event.target.result as string
            };
            
            setDroppedElements(prev => [...prev, newElement]);
          }
        };
        reader.readAsDataURL(file);
        
        toast({
          title: "Image Uploaded",
          description: "Your image was added to the canvas"
        });
      }
    });
  };

  return (
    <div 
      className="flex-1 flex items-center justify-center bg-[#111111] overflow-auto relative p-8"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default CanvasEventHandlers;
