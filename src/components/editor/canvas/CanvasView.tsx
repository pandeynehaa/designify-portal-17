
import React from "react";
import CanvasElements from "../CanvasElements";
import TemplateRenderer from "./TemplateRenderer";
import CanvasActionButton from "./CanvasActionButton";
import { TemplateStyles } from "../../../types/templateStyles";
import { CanvasElement } from "../../../types/canvasElement";
import { useSelectedElement } from "../../../hooks/useSelectedElement";

interface CanvasViewProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  deviceView: string;
  zoom: number;
  showGrid: boolean;
  droppedElements: CanvasElement[];
  activeTool: string;
  editMode: boolean;
  activeTemplate: string;
  templateStyles: TemplateStyles;
  handleCanvasClick: (e: React.MouseEvent) => void;
}

const CanvasView: React.FC<CanvasViewProps> = ({
  canvasRef,
  deviceView,
  zoom,
  showGrid,
  droppedElements,
  activeTool,
  editMode,
  activeTemplate,
  templateStyles,
  handleCanvasClick
}) => {
  return (
    <div 
      ref={canvasRef}
      className={`bg-white rounded-md shadow-2xl transition-all duration-300 transform origin-top relative ${
        deviceView === "desktop" ? "w-[1200px] h-[800px]" : 
        deviceView === "tablet" ? "w-[768px] h-[1024px]" : 
        "w-[375px] h-[667px]"
      } ${showGrid ? 'bg-grid-pattern' : ''}`}
      style={{ 
        transform: `scale(${zoom})`,
        overflow: "hidden",
        backgroundImage: showGrid ? 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)' : 'none',
        backgroundSize: showGrid ? '20px 20px' : '0',
      }}
      onClick={handleCanvasClick}
    >
      <TemplateRenderer activeTemplate={activeTemplate} templateStyles={templateStyles} />
      <CanvasElements droppedElements={droppedElements} activeTool={activeTool} />
      <CanvasActionButton editMode={editMode} templateStyles={templateStyles} />
    </div>
  );
};

export default CanvasView;
