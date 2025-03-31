
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EditorHeader from "../components/editor/EditorHeader";
import EditorContent from "../components/editor/EditorContent";
import AIThemeExtractor from "../components/editor/AIThemeExtractor";
import ThemeMapper from "../components/editor/ThemeMapper";
import { useCanvasDrop } from "../hooks/useCanvasDrop";
import { useCanvasZoom } from "../hooks/useCanvasZoom";
import { toast } from "@/components/ui/use-toast";

// Define the type for template styles
export interface TemplateStyles {
  headerBg: string;
  headerTextColor: string;
  headerHeight: string;
  bannerBg: string;
  bannerTextColor: string;
  bannerHeight: string;
  collectionBg: string;
  collectionTextColor: string;
  cardBg: string;
  cardTextColor: string;
  accentColor: string;
  borderColor: string;
  buttonBg: string;
  buttonTextColor: string;
  buttonRadius: string;
  headingFont: string;
  bodyFont: string;
  gridColumns: number;
  spacing: string;
}

const DesignEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState("layout");
  const [showPropertyPanel, setShowPropertyPanel] = useState(true);
  const [showAIExtractor, setShowAIExtractor] = useState(false);
  const [showThemeMapper, setShowThemeMapper] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState("marketplace");
  
  // Default styles for each template type
  const [templateStyles, setTemplateStyles] = useState<Record<string, TemplateStyles>>({
    marketplace: {
      headerBg: "#18181E",
      headerTextColor: "white",
      headerHeight: "4rem",
      bannerBg: "bg-gradient-to-r from-[#232329] to-[#18181E]",
      bannerTextColor: "white",
      bannerHeight: "20rem",
      collectionBg: "#18181E",
      collectionTextColor: "white",
      cardBg: "#232329",
      cardTextColor: "white",
      accentColor: "#9b87f5",
      borderColor: "#333333",
      buttonBg: "#9b87f5",
      buttonTextColor: "white",
      buttonRadius: "0.5rem",
      headingFont: "font-display",
      bodyFont: "font-sans",
      gridColumns: 4,
      spacing: "1.5rem"
    },
    drops: {
      headerBg: "#18181E",
      headerTextColor: "white",
      headerHeight: "4rem",
      bannerBg: "bg-gradient-to-r from-[#232329] to-[#18181E]",
      bannerTextColor: "white",
      bannerHeight: "20rem",
      collectionBg: "#18181E",
      collectionTextColor: "white",
      cardBg: "#232329",
      cardTextColor: "white",
      accentColor: "#9b87f5",
      borderColor: "#333333",
      buttonBg: "#9b87f5",
      buttonTextColor: "white",
      buttonRadius: "0.5rem",
      headingFont: "font-display",
      bodyFont: "font-sans",
      gridColumns: 3,
      spacing: "1.5rem"
    },
    "token-gate": {
      headerBg: "#18181E",
      headerTextColor: "white",
      headerHeight: "4rem",
      bannerBg: "bg-gradient-to-r from-[#232329] to-[#18181E]",
      bannerTextColor: "white",
      bannerHeight: "20rem",
      collectionBg: "#18181E",
      collectionTextColor: "white",
      cardBg: "#232329",
      cardTextColor: "white",
      accentColor: "#9b87f5",
      borderColor: "#333333",
      buttonBg: "#9b87f5",
      buttonTextColor: "white",
      buttonRadius: "0.5rem",
      headingFont: "font-display",
      bodyFont: "font-sans",
      gridColumns: 2,
      spacing: "1.5rem"
    },
    "buy-coin": {
      headerBg: "#18181E",
      headerTextColor: "white",
      headerHeight: "4rem",
      bannerBg: "bg-gradient-to-r from-[#232329] to-[#18181E]",
      bannerTextColor: "white",
      bannerHeight: "20rem",
      collectionBg: "#18181E",
      collectionTextColor: "white",
      cardBg: "#232329",
      cardTextColor: "white",
      accentColor: "#9b87f5",
      borderColor: "#333333",
      buttonBg: "#9b87f5",
      buttonTextColor: "white",
      buttonRadius: "0.5rem",
      headingFont: "font-display",
      bodyFont: "font-sans",
      gridColumns: 1,
      spacing: "1.5rem"
    }
  });
  
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

  // Function to update styles for the current template
  const updateTemplateStyles = (property: keyof TemplateStyles, value: any) => {
    setTemplateStyles(prev => ({
      ...prev,
      [activeTemplate]: {
        ...prev[activeTemplate],
        [property]: value
      }
    }));
    
    toast({
      title: "Style Updated",
      description: `Updated ${property} to ${value}`
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
          templateStyles={templateStyles[activeTemplate]}
          updateTemplateStyles={updateTemplateStyles}
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
