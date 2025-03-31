
import React, { useEffect } from "react";
import EditorSidebar from "./EditorSidebar";
import CanvasArea from "./CanvasArea";
import PropertyPanel from "./PropertyPanel";
import CanvasDropOverlay from "./CanvasDropOverlay";
import CanvasTools from "./CanvasTools";
import { TemplateStyles } from "../../types/templateStyles";
import { useSelectedElement } from "../../hooks/useSelectedElement";

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
  
  // Check if we should automatically show the property panel when an element is selected
  useEffect(() => {
    if (selectedElement && !showPropertyPanel) {
      // Auto-show property panel when element is selected
      // This is optional and can be removed if not desired
      // handlePropertyShow();
    }
  }, [selectedElement, showPropertyPanel]);

  // Connect to the updateElement function from CanvasArea
  useEffect(() => {
    // This ensures PropertyPanel has access to updateElement
    if (typeof (window as any).updateCanvasElement === 'function') {
      const updateElement = (window as any).updateCanvasElement;
      // Now we have access to updateElement
      console.log("Update element function is available");
    }
  }, []);

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
        {showPropertyPanel && (
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
