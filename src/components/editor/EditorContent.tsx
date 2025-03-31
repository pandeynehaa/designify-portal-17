
import React, { useEffect } from "react";
import EditorSidebar from "./EditorSidebar";
import CanvasArea from "./CanvasArea";
import PropertyPanel from "./PropertyPanel";
import CanvasDropOverlay from "./CanvasDropOverlay";
import CanvasTools from "./CanvasTools";
import { TemplateStyles } from "../../types/templateStyles";
import { useSelectedElement } from "../../hooks/useSelectedElement";
import { useCanvasState } from "../../hooks/useCanvasState";

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
  const { selectedElement } = useSelectedElement();
  const { updateElement } = useCanvasState();
  
  // Connect the updateElement function for Canvas and PropertyPanel
  useEffect(() => {
    (window as any).updateCanvasElement = updateElement;
  }, [updateElement]);
  
  // Auto-show property panel when element is selected
  useEffect(() => {
    if (selectedElement && !showPropertyPanel) {
      // Auto-show property panel when element is selected
      setActiveTab("element");
    }
  }, [selectedElement, showPropertyPanel, setActiveTab]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-cv-black/90 backdrop-blur-sm">
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Sidebar with glassmorphism */}
        <div className="relative">
          <EditorSidebar activeTab={activeTab} setActiveTab={handleTabClick} />
          <div className="absolute inset-0 bg-gradient-to-b from-cv-purple/5 to-transparent pointer-events-none"></div>
        </div>
        
        {/* Canvas Area with depth effects */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-cv-darkgray to-cv-black rounded-xl shadow-2xl m-2" id="canvas-area">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
          
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
        
        {/* Property Panel with glass effect */}
        {(showPropertyPanel || selectedElement) && (
          <div className="relative">
            <PropertyPanel 
              activeTab={activeTab} 
              onClose={handlePropertyClose} 
              templateStyles={templateStyles}
              updateTemplateStyles={updateTemplateStyles}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-cv-purple/5 to-transparent pointer-events-none"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorContent;
