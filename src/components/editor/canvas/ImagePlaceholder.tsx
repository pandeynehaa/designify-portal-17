
import React, { useState } from "react";
import { Image, Upload, Plus } from "lucide-react";
import { useCanvasState } from "@/hooks/useCanvasState";
import { useSelectedElement } from "@/hooks/useSelectedElement";
import { toast } from "@/components/ui/use-toast";
import { CanvasElement } from "@/types/canvasElement";

interface ImagePlaceholderProps {
  element: CanvasElement;
  activeTool: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ element, activeTool }) => {
  const { updateElement } = useCanvasState();
  const { selectedElement, selectElement } = useSelectedElement();
  const [isDragOver, setIsDragOver] = useState(false);
  const isSelected = selectedElement?.id === element.id;
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element);
    
    // Show file picker if not in move tool mode
    if (activeTool !== "move") {
      handleSelectImage();
    }
  };

  const handleSelectImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const reader = new FileReader();
        
        reader.onload = (loadEvent) => {
          if (loadEvent.target?.result) {
            updateElement(element.id, {
              content: loadEvent.target.result as string,
              type: "image" // Convert from placeholder to regular image
            });
            
            toast({
              title: "Image Added",
              description: "Your image has been added to the canvas"
            });
          }
        };
        
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    // Handle file drop
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      
      reader.onload = (loadEvent) => {
        if (loadEvent.target?.result) {
          updateElement(element.id, {
            content: loadEvent.target.result as string,
            type: "image" // Convert from placeholder to regular image
          });
          
          toast({
            title: "Image Added",
            description: "Your image has been added to the canvas"
          });
        }
      };
      
      reader.readAsDataURL(file);
      return;
    }
    
    // Handle sticker drop
    const stickerData = e.dataTransfer.getData("application/sticker");
    if (stickerData) {
      try {
        const sticker = JSON.parse(stickerData);
        updateElement(element.id, {
          content: sticker.url || "/placeholder.svg",
          type: "sticker" // Convert from placeholder to sticker
        });
        
        toast({
          title: "Sticker Added",
          description: "Your sticker has been added to the canvas"
        });
      } catch (err) {
        console.error("Failed to parse sticker data", err);
      }
      return;
    }
    
    // Handle image drop from sidebar
    const imageData = e.dataTransfer.getData("application/image");
    if (imageData) {
      try {
        const image = JSON.parse(imageData);
        updateElement(element.id, {
          content: image.url || "/placeholder.svg",
          type: "image" // Convert from placeholder to regular image
        });
        
        toast({
          title: "Image Added",
          description: "Your image has been added to the canvas"
        });
      } catch (err) {
        console.error("Failed to parse image data", err);
      }
    }
  };

  return (
    <div
      className={`absolute ${isSelected ? 'z-10' : ''}`}
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        width: `${element.width || 200}px`,
        height: `${element.height || 150}px`,
        cursor: activeTool === 'select' ? 'pointer' : 'move',
      }}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div 
        className={`w-full h-full flex flex-col items-center justify-center 
          rounded-md border-2 border-dashed transition-all duration-200
          ${isDragOver ? 'border-cv-accent bg-cv-accent/10' : 'border-cv-lightgray bg-cv-gray/20'}
          ${isSelected ? 'ring-2 ring-cv-accent' : ''}`}
      >
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div className={`rounded-full p-3 mb-2 ${isDragOver ? 'bg-cv-accent/20' : 'bg-cv-gray/30'}`}>
            {isDragOver ? (
              <Upload size={24} className="text-cv-accent" />
            ) : (
              <Image size={24} className="text-cv-lightgray" />
            )}
          </div>
          <p className="text-sm font-medium text-cv-lightgray">
            {isDragOver ? 'Drop image here' : 'Click to add image'}
          </p>
          <p className="text-xs text-cv-lightgray/70 mt-1">
            or drag an image from the library
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImagePlaceholder;
