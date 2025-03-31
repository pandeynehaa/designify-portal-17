
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EditorHeader from "../components/editor/EditorHeader";
import EditorContent from "../components/editor/EditorContent";
import AIThemeExtractor from "../components/editor/AIThemeExtractor";
import ThemeMapper from "../components/editor/ThemeMapper";
import { useCanvasDrop } from "../hooks/useCanvasDrop";
import { useCanvasZoom } from "../hooks/useCanvasZoom";
import { toast } from "@/components/ui/use-toast";

const DesignEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState("layout");
  const [showPropertyPanel, setShowPropertyPanel] = useState(true);
  const [showAIExtractor, setShowAIExtractor] = useState(false);
  const [showThemeMapper, setShowThemeMapper] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState("marketplace");
  
  const { zoom, handleZoomIn, handleZoomOut, handleZoomReset } = useCanvasZoom(1);
  const { dropOverlayVisible } = useCanvasDrop();
  
  const handlePropertyClose = () => {
    setShowPropertyPanel(false);
  };
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setShowPropertyPanel(true);
  };
  
  const handleAIExtract = (themeData: any) => {
    console.log("Extracted theme data:", themeData);
    toast({
      title: "Theme Extracted",
      description: "The AI has successfully extracted the theme from the provided URL."
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
    <div className="flex flex-col h-screen bg-cv-black">
      <Navbar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <EditorHeader 
          activeTemplate={activeTemplate}
          setActiveTemplate={setActiveTemplate}
          setShowThemeMapper={setShowThemeMapper}
          setShowAIExtractor={setShowAIExtractor}
        />
        
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
