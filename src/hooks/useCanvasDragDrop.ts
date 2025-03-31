
import { DragEvent, useRef } from "react";
import { toast } from "@/components/ui/use-toast";

interface ElementPosition {
  type: string;
  id: string;
  x: number;
  y: number;
  content?: string;
  nftData?: any;
}

interface UseCanvasDragDropProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  zoomLevel: number;
  setDroppedElements: React.Dispatch<React.SetStateAction<ElementPosition[]>>;
}

export const useCanvasDragDrop = ({
  canvasRef,
  zoomLevel,
  setDroppedElements
}: UseCanvasDragDropProps) => {
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (canvasRef.current) {
      canvasRef.current.classList.add("drag-over");
    }
    
    // Show visual feedback for dropping area
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.zIndex = '50';
      
      // Add wiggle animation class
      overlay.classList.add('wiggle-animation');
    }
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (canvasRef.current) {
      canvasRef.current.classList.remove("drag-over");
    }
    
    // Hide visual feedback
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.zIndex = '0';
      
      // Remove wiggle animation
      overlay.classList.remove('wiggle-animation');
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (canvasRef.current) {
      canvasRef.current.classList.remove("drag-over");
    }
    
    // Hide drop overlay
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.zIndex = '0';
      overlay.classList.remove('wiggle-animation');
    }
    
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    const componentData = e.dataTransfer.getData("application/component");
    const imageData = e.dataTransfer.getData("application/image");
    const nftData = e.dataTransfer.getData("application/nft");
    const templateData = e.dataTransfer.getData("application/template-component");
    
    if (templateData) {
      handleTemplateComponentDrop(templateData, x, y);
    } else if (componentData) {
      handleComponentDrop(componentData, x, y);
    } else if (imageData) {
      handleImageDrop(imageData, x, y);
    } else if (nftData) {
      handleNFTDrop(nftData, x, y);
    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files, x, y);
    }
  };

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
          content: component.type
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
  };

  const handleImageDrop = (imageData: string, x: number, y: number) => {
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
  };

  const handleNFTDrop = (nftData: string, x: number, y: number) => {
    const nft = JSON.parse(nftData);
    const newElement = {
      type: "nft",
      id: `nft-${Date.now()}`,
      x: x / (zoomLevel / 100),
      y: y / (zoomLevel / 100),
      content: nft.image,
      nftData: {
        name: nft.name,
        image: nft.image,
        collection: nft.collection,
        marketplaceLink: nft.marketplaceLink,
        blurAmount: 0,
        glowColor: "rgba(255, 255, 255, 0)",
        glowSpread: 0
      }
    };
    
    setDroppedElements(prev => [...prev, newElement]);
    toast({
      title: "NFT Added",
      description: `Added ${nft.name} to the canvas`
    });
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

  return {
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};
