
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
