
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
  const { selectedElement } = useSelectedElement();
  const gridSize = 20; // Match the grid size used in ComponentElement

  // Grid style enhancements for better visibility when using move tool
  const getGridStyle = () => {
    if (!showGrid) return {};
    
    const baseGridStyle = {
      backgroundImage: 'linear-gradient(to right, rgba(100,100,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,100,255,0.1) 1px, transparent 1px)',
      backgroundSize: `${gridSize}px ${gridSize}px`,
      backgroundPositionX: '0px',
      backgroundPositionY: '0px',
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)'
    };
    
    // Enhanced grid for move tool
    if (activeTool === 'move') {
      return {
        ...baseGridStyle,
        backgroundImage: 'linear-gradient(to right, rgba(100,100,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,100,255,0.15) 1px, transparent 1px)',
      };
    }
    
    return baseGridStyle;
  };

  // Get 3D parallax effect styles based on templateStyles
  const get3DStyles = () => {
    if (templateStyles.enable3D) {
      return {
        transform: `perspective(1000px) rotateX(2deg)`,
        transformStyle: 'preserve-3d' as 'preserve-3d',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      };
    }
    return {};
  };

  return (
    <div 
      ref={canvasRef}
      className={`bg-white rounded-md shadow-2xl transition-all duration-300 transform origin-top relative max-h-[80vh] overflow-auto ${
        deviceView === "desktop" ? "w-[1200px] h-[800px]" : 
        deviceView === "tablet" ? "w-[768px] h-[1024px]" : 
        "w-[375px] h-[667px]"
      } ${showGrid && editMode ? 'bg-grid-pattern' : ''} ${selectedElement ? 'editing-element' : ''} ${
        !editMode ? 'preview-mode' : 'edit-mode'
      }`}
      style={{ 
        transform: `scale(${zoom})`,
        ...getGridStyle(),
        ...get3DStyles()
      }}
      onClick={handleCanvasClick}
    >
      <TemplateRenderer activeTemplate={activeTemplate} templateStyles={templateStyles} />
      <CanvasElements droppedElements={droppedElements} activeTool={activeTool} editMode={editMode} />
      <CanvasActionButton editMode={editMode} templateStyles={templateStyles} />
      
      {/* Overlay grid guides when moving - appears only when in move mode and something is selected */}
      {showGrid && activeTool === 'move' && selectedElement && editMode && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-overlay"></div>
        </div>
      )}
    </div>
  );
};

export default CanvasView;
