
import React, { useEffect, useState } from "react";
import CanvasElements from "../CanvasElements";
import TemplateRenderer from "./TemplateRenderer";
import CanvasActionButton from "./CanvasActionButton";
import { TemplateStyles } from "../../../types/templateStyles";
import { CanvasElement } from "../../../types/canvasElement";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "../../../hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const gridSize = 20; // Match the grid size used in ComponentElement
  const [dimensions, setDimensions] = useState<{width: string, minHeight: string}>({
    width: '1200px',
    minHeight: '1600px'
  });

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

  // Update dimensions when device view changes
  useEffect(() => {
    // Get device dimensions
    const getDeviceDimensions = () => {
      switch (deviceView) {
        case "desktop":
          return { width: '1200px', minHeight: '1600px' };
        case "tablet":
          return { width: '768px', minHeight: '1200px' };
        case "mobile":
          return { width: '375px', minHeight: '800px' };
        default:
          return { width: '1200px', minHeight: '1600px' };
      }
    };
    
    setDimensions(getDeviceDimensions());
  }, [deviceView]);

  return (
    <ScrollArea className="h-full max-h-[80vh] w-full rounded-md">
      <div className="min-w-fit flex justify-center py-4">
        <div 
          ref={canvasRef}
          className={`bg-white rounded-md shadow-2xl transition-all duration-300 transform origin-top relative ${
            showGrid && editMode ? 'bg-grid-pattern' : ''} ${selectedElement ? 'editing-element' : ''} ${
            !editMode ? 'preview-mode' : 'edit-mode'
          }`}
          style={{ 
            transform: `scale(${zoom})`,
            ...getGridStyle(),
            ...get3DStyles(),
            width: dimensions.width,
            minHeight: dimensions.minHeight,
            margin: '0 auto',
            transformOrigin: 'top center'
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

          {/* Device indicator - only in edit mode */}
          {editMode && (
            <div className="absolute bottom-2 right-2 bg-cv-purple/70 text-white text-xs py-1 px-2 rounded-full">
              {deviceView}
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default CanvasView;
