
import React, { useRef, useState, CSSProperties } from "react";
import { CanvasElement } from "@/types/canvasElement";

interface NFTElementWrapperProps {
  children: React.ReactNode;
  element: CanvasElement;
  isSelected: boolean;
  isDeleting: boolean;
  style: CSSProperties;
  onClick: (e: React.MouseEvent) => void;
}

const NFTElementWrapper: React.FC<NFTElementWrapperProps> = ({ 
  children, 
  element,
  isSelected,
  isDeleting,
  style,
  onClick
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

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
        {children}
      </div>
    );
  }

  return (
    <div
      id={element.id}
      ref={elementRef}
      style={style}
      className={`relative transition-all duration-150 ${isSelected ? 'canvas-element selected ring-2 ring-cv-accent' : 'canvas-element'}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default NFTElementWrapper;
