
import React, { useEffect } from "react";
import EditorSidebar from "./EditorSidebar";
import CanvasArea from "./CanvasArea";
import PropertyPanel from "./PropertyPanel";
import CanvasDropOverlay from "./CanvasDropOverlay";
import CanvasTools from "./CanvasTools";
import { TemplateStyles } from "../../types/templateStyles";
import { useSelectedElement } from "../../hooks/useSelectedElement";
import { useCanvasState } from "../../hooks/useCanvasState";
import { useCanvasUIState } from "@/hooks/useCanvasUIState";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PanelRight } from "lucide-react";

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
  applyToAllSites: (property: keyof TemplateStyles, value: any) => void;
  extractedImages?: string[];
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
  updateTemplateStyles,
  applyToAllSites,
  extractedImages = []
}) => {
  const { selectedElement } = useSelectedElement();
  const { updateElement } = useCanvasState();
  const { showRightSidebar, toggleRightSidebar, showLeftSidebar } = useCanvasUIState();
  
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
          <EditorSidebar 
            activeTab={activeTab} 
            setActiveTab={handleTabClick} 
            extractedImages={extractedImages}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cv-purple/5 to-transparent pointer-events-none"></div>
        </div>
        
        {/* Canvas Area with depth effects */}
        <div className={`flex-1 relative overflow-hidden bg-gradient-to-br from-cv-darkgray to-cv-black rounded-xl shadow-2xl m-2 transition-all duration-300 ${
          showLeftSidebar ? '' : 'ml-0'
        }`} id="canvas-area">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
          
          <CanvasArea 
            activeTemplate={activeTemplate} 
            zoom={zoom} 
            templateStyles={templateStyles} 
          />
          
          <CanvasDropOverlay isVisible={dropOverlayVisible} />
        </div>
        
        {/* Property Panel with glass effect */}
        {(showPropertyPanel || selectedElement) && (
          <div className="relative">
            <Collapsible 
              open={showRightSidebar} 
              onOpenChange={toggleRightSidebar}
              className="transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-end h-10 bg-cv-gray border-b border-cv-lightgray px-2">
                <CollapsibleTrigger asChild>
                  <button className="p-1.5 text-cv-white hover:text-cv-white">
                    <PanelRight size={14} />
                  </button>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent>
                <PropertyPanel 
                  activeTab={activeTab} 
                  onClose={handlePropertyClose} 
                  templateStyles={templateStyles}
                  updateTemplateStyles={updateTemplateStyles}
                  applyToAllSites={applyToAllSites}
                />
              </CollapsibleContent>
            </Collapsible>
            <div className="absolute inset-0 bg-gradient-to-l from-cv-purple/5 to-transparent pointer-events-none"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorContent;
