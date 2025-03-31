
import React, { useState, useRef, useEffect } from "react";
import { CanvasElement } from "../../../types/canvasElement";
import ElementControls from "./ElementControls";
import ResizeHandles, { ResizeDirection } from "./ResizeHandles";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { Link } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface NFTElementProps {
  element: CanvasElement;
  activeTool: string;
  editMode?: boolean;
}

const NFTElement: React.FC<NFTElementProps> = ({ element, activeTool, editMode = true }) => {
  const { selectedElement, selectElement } = useSelectedElement();
  const isSelected = selectedElement?.id === element.id;
  const [rotation, setRotation] = useState(element.nftData?.rotation || 0);
  const [size, setSize] = useState({
    width: element.nftData?.width || 300,
    height: element.nftData?.height || 300
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const resizing = useRef(false);
  const initialSize = useRef({ width: 0, height: 0 });
  const initialPos = useRef({ x: 0, y: 0 });
  
  const nftData = element.nftData || {
    image: element.content,
    name: "NFT Item",
    marketplaceLink: "/marketplace",
    blurAmount: 0,
    glowColor: "rgba(255, 255, 255, 0)",
    glowSpread: 0,
    width: 300,
    height: 300
  };
  
  useEffect(() => {
    if (element.nftData) {
      setRotation(element.nftData.rotation || 0);
      setSize({
        width: element.nftData.width || 300,
        height: element.nftData.height || 300
      });
    }
  }, [element.nftData]);
  
  useEffect(() => {
    // Create audio element for delete sound
    audioRef.current = new Audio("/sounds/swoosh.mp3");
    
    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Listen for delete events via a custom event
  useEffect(() => {
    const handleDeleteAnimation = (e: CustomEvent) => {
      if (e.detail.id === element.id) {
        // Play sound effect
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(err => console.log('Audio play error:', err));
        }
        
        // Trigger animation
        setIsDeleting(true);
        
        // After animation completes, actual deletion happens in useCanvasElements
      }
    };
    
    // Add event listener
    window.addEventListener('canvas-element-delete' as any, handleDeleteAnimation as any);
    
    return () => {
      window.removeEventListener('canvas-element-delete' as any, handleDeleteAnimation as any);
    };
  }, [element.id]);
  
  const style = {
    position: 'absolute' as const,
    left: `${element.x}px`,
    top: `${element.y}px`,
    transform: `rotate(${rotation}deg)`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    cursor: !editMode ? "pointer" : activeTool === 'select' ? 'pointer' : 'move',
    filter: `blur(${nftData.blurAmount || 0}px)`,
    boxShadow: nftData.glowSpread ? `0 0 ${nftData.glowSpread}px ${nftData.glowColor || 'rgba(255, 255, 255, 0.7)'}` : 'none',
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!editMode) {
      if (nftData.marketplaceLink) {
        toast({
          title: "Marketplace Link",
          description: `Navigating to: ${nftData.marketplaceLink}`
        });
      }
    } else {
      selectElement(element);
      
      toast({
        title: "NFT Selected",
        description: "Edit NFT properties in the panel"
      });
    }
  };

  const handleResizeStart = (e: React.MouseEvent, direction: ResizeDirection) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!isSelected || !editMode) return;
    
    resizing.current = true;
    initialSize.current = { width: size.width, height: size.height };
    initialPos.current = { x: e.clientX, y: e.clientY };
    
    const handleResizeMove = (moveEvent: MouseEvent) => {
      if (!resizing.current) return;
      
      const deltaX = moveEvent.clientX - initialPos.current.x;
      const deltaY = moveEvent.clientY - initialPos.current.y;
      
      let newWidth = initialSize.current.width;
      let newHeight = initialSize.current.height;
      
      if (direction.includes('e')) {
        newWidth = Math.max(50, initialSize.current.width + deltaX);
      } else if (direction.includes('w')) {
        newWidth = Math.max(50, initialSize.current.width - deltaX);
      }
      
      if (direction.includes('s')) {
        newHeight = Math.max(50, initialSize.current.height + deltaY);
      } else if (direction.includes('n')) {
        newHeight = Math.max(50, initialSize.current.height - deltaY);
      }
      
      setSize({ width: newWidth, height: newHeight });
    };
    
    const handleResizeEnd = () => {
      if (!resizing.current) return;
      
      resizing.current = false;
      
      if (typeof (window as any).updateCanvasElement === 'function') {
        (window as any).updateCanvasElement(element.id, {
          nftData: {
            ...nftData,
            width: size.width,
            height: size.height
          }
        });
      }
      
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
    
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const getResizeHandlers = () => {
    return {
      onResizeStart: handleResizeStart
    };
  };

  // If element is being deleted, apply animation classes
  if (isDeleting) {
    return (
      <div
        ref={elementRef}
        style={{
          ...style,
          boxShadow: 'none', // Remove shadow during animation
          filter: 'none',    // Remove filters during animation
        }}
        className="relative transition-all duration-300 scale-0 opacity-0 rotate-90"
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img 
            src={nftData.image} 
            alt={nftData.name || "NFT Item"} 
            className="max-w-full max-h-full object-contain rounded shadow-sm"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      style={style}
      className={`relative transition-all duration-150 ${isSelected ? 'canvas-element selected ring-2 ring-cv-accent' : 'canvas-element'}`}
      onClick={handleClick}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <img 
          src={nftData.image} 
          alt={nftData.name || "NFT Item"} 
          className="max-w-full max-h-full object-contain rounded shadow-sm"
        />
        
        {!editMode && (
          <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1.5 text-white">
            <Link size={14} />
          </div>
        )}
      </div>
      
      {isSelected && editMode && (
        <>
          <ElementControls element={element} />
          <ResizeHandles onResizeStart={handleResizeStart} />
        </>
      )}
    </div>
  );
};

export default NFTElement;
