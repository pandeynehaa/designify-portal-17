
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import EditorHeader from "../components/editor/EditorHeader";
import EditorContent from "../components/editor/EditorContent";
import AIThemeExtractor from "../components/editor/AIThemeExtractor";
import ThemeMapper from "../components/editor/ThemeMapper";
import { useCanvasDrop } from "../hooks/useCanvasDrop";
import { useCanvasZoom } from "../hooks/useCanvasZoom";
import { useTemplateStyles } from "../hooks/useTemplateStyles";
import { useEditorUIState } from "../hooks/useEditorUIState";
import { toast } from "@/components/ui/use-toast";
import { TemplateType } from "../types/templateStyles";
import { useSelectedElement } from "../hooks/useSelectedElement";
import { useCanvasUIState } from "@/hooks/useCanvasUIState";

const DesignEditor: React.FC = () => {
  const location = useLocation();
  const { selectedElement } = useSelectedElement();
  const { showRightSidebar, toggleRightSidebar, setShowRightSidebar } = useCanvasUIState();
  const [extractedImages, setExtractedImages] = useState<string[]>([]);
  
  const { 
    activeTab, 
    showPropertyPanel, 
    showAIExtractor, 
    showThemeMapper,
    setShowAIExtractor,
    setShowThemeMapper,
    setShowPropertyPanel,
    handlePropertyClose, 
    handleTabClick 
  } = useEditorUIState();
  
  const { 
    templateStyles, 
    activeTemplate, 
    setActiveTemplate, 
    updateTemplateStyles, 
    applyToAllSites,
    updateAllTemplateStyles,
    currentTemplateStyles 
  } = useTemplateStyles();
  
  const { zoom, handleZoomIn, handleZoomOut, handleZoomReset } = useCanvasZoom(1);
  const { dropOverlayVisible } = useCanvasDrop();
  
  useEffect(() => {
    if (location.state && location.state.template) {
      setActiveTemplate(location.state.template as TemplateType);
      toast({
        title: "Template Loaded",
        description: `The ${location.state.template} template has been loaded`
      });
    }
  }, [location.state, setActiveTemplate]);
  
  useEffect(() => {
    if (selectedElement && !showPropertyPanel) {
      setShowPropertyPanel(true);
      setShowRightSidebar(true);
    }
  }, [selectedElement, showPropertyPanel, setShowPropertyPanel, setShowRightSidebar]);
  
  const handleAIExtract = (themeData: any) => {
    if (!themeData || !themeData.template) {
      toast({
        title: "Extraction Error",
        description: "Invalid theme data received",
        variant: "destructive"
      });
      return;
    }
    
    // Update all templates with the extracted styles
    updateAllTemplateStyles(themeData.template);
    
    // Store extracted images for the image library
    if (themeData.raw && themeData.raw.images) {
      setExtractedImages(themeData.raw.images);
      
      // Add logo to extracted images if available
      if (themeData.raw.logo) {
        setExtractedImages(prev => [themeData.raw.logo, ...prev]);
      }
      
      toast({
        title: "Assets Imported",
        description: `${themeData.raw.images.length + (themeData.raw.logo ? 1 : 0)} images have been added to your library`
      });
    }
    
    toast({
      title: "Theme Extracted & Applied",
      description: "The AI has successfully extracted and applied the theme to all templates"
    });
  };
  
  const handleThemeApply = (themeData: any) => {
    console.log("Applied theme data:", themeData);
    toast({
      title: "Theme Applied",
      description: "Your brand theme has been applied to the template."
    });
  };
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-cv-black to-cv-darkgray">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <Navbar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="relative">
          <EditorHeader 
            activeTemplate={activeTemplate}
            setActiveTemplate={setActiveTemplate}
            setShowThemeMapper={setShowThemeMapper}
            setShowAIExtractor={setShowAIExtractor}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cv-purple/5 to-transparent pointer-events-none"></div>
        </div>
        
        <EditorContent 
          activeTab={activeTab}
          setActiveTab={handleTabClick}
          showPropertyPanel={showPropertyPanel}
          handlePropertyClose={handlePropertyClose}
          activeTemplate={activeTemplate}
          zoom={zoom}
          dropOverlayVisible={dropOverlayVisible}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          handleZoomReset={handleZoomReset}
          templateStyles={currentTemplateStyles}
          updateTemplateStyles={updateTemplateStyles}
          applyToAllSites={applyToAllSites}
          extractedImages={extractedImages}
        />
      </div>
      
      {showAIExtractor && (
        <AIThemeExtractor 
          onClose={() => setShowAIExtractor(false)} 
          onExtract={handleAIExtract} 
        />
      )}
      
      {showThemeMapper && (
        <ThemeMapper 
          onClose={() => setShowThemeMapper(false)} 
          onApply={handleThemeApply} 
        />
      )}
    </div>
  );
};

export default DesignEditor;
