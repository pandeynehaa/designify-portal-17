
import React from "react";
import EditorSidebar from "./EditorSidebar";
import CanvasArea from "./CanvasArea";
import PropertyPanel from "./PropertyPanel";
import CanvasDropOverlay from "./CanvasDropOverlay";

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
  handleZoomReset
}) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      <EditorSidebar activeTab={activeTab} setActiveTab={handleTabClick} />
      
      <div className="flex-1 relative overflow-hidden bg-gray-100" id="canvas-area">
        <CanvasArea 
          activeTemplate={activeTemplate} 
          zoom={zoom} 
        />
        <CanvasTools 
          zoom={zoom} 
          onZoomIn={handleZoomIn} 
          onZoomOut={handleZoomOut} 
          onReset={handleZoomReset} 
        />
        <CanvasDropOverlay isVisible={dropOverlayVisible} />
      </div>
      
      {showPropertyPanel && <PropertyPanel activeTab={activeTab} onClose={handlePropertyClose} />}
    </div>
  );
};

// Import CanvasTools to avoid TypeScript errors
import CanvasTools from "./CanvasTools";

export default EditorContent;
