import React from "react";
import EditorSidebar from "./EditorSidebar";
import CanvasArea from "./CanvasArea";
import PropertyPanel from "./PropertyPanel";
import CanvasDropOverlay from "./CanvasDropOverlay";
import CanvasTools from "./CanvasTools";
import { TemplateStyles } from "../../types/templateStyles";

interface EditorContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showPropertyPanel: boolean;
  handlePropertyClose: () => void;
  activeTemplate: string;
  zoom: number;
  dropOverlayVisible: boolean;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleZoomReset: () => void;
  templateStyles: TemplateStyles;
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
}

const EditorContent: React.FC<EditorContentProps> = ({
  activeTab,
  setActiveTab,
  showPropertyPanel,
  handlePropertyClose,
  activeTemplate,
  zoom,
  dropOverlayVisible,
  handleZoomIn,
  handleZoomOut,
  handleZoomReset,
  templateStyles,
  updateTemplateStyles
}) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      <EditorSidebar activeTab={activeTab} setActiveTab={handleTabClick} />
      
      <div className="flex-1 relative overflow-hidden bg-cv-gray" id="canvas-area">
        <CanvasArea 
          activeTemplate={activeTemplate} 
          zoom={zoom} 
          templateStyles={templateStyles}
        />
        <CanvasTools 
          zoom={zoom} 
          onZoomIn={handleZoomIn} 
          onZoomOut={handleZoomOut} 
          onReset={handleZoomReset} 
        />
        <CanvasDropOverlay isVisible={dropOverlayVisible} />
      </div>
      
      {showPropertyPanel && (
        <PropertyPanel 
          activeTab={activeTab} 
          onClose={handlePropertyClose} 
          templateStyles={templateStyles}
          updateTemplateStyles={updateTemplateStyles}
        />
      )}
    </div>
  );
};

export default EditorContent;
