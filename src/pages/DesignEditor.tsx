
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EditorSidebar from "../components/editor/EditorSidebar";
import CanvasArea from "../components/editor/CanvasArea";
import PropertyPanel from "../components/editor/PropertyPanel";
import AIThemeExtractor from "../components/editor/AIThemeExtractor";
import ThemeMapper from "../components/editor/ThemeMapper";
import { Save, FileCode, Settings, Image, Wand2, Code, Grid, Download, ChevronDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const DesignEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState("layout");
  const [showPropertyPanel, setShowPropertyPanel] = useState(true);
  const [showAIExtractor, setShowAIExtractor] = useState(false);
  const [showThemeMapper, setShowThemeMapper] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState("marketplace");
  
  const handlePropertyClose = () => {
    setShowPropertyPanel(false);
  };
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setShowPropertyPanel(true);
  };
  
  const handleAIExtract = (themeData: any) => {
    console.log("Extracted theme data:", themeData);
    // In a real implementation, we would apply the theme to the active template
    toast({
      title: "Theme Extracted",
      description: "The AI has successfully extracted the theme from the provided URL."
    });
  };
  
  const handleThemeApply = (themeData: any) => {
    console.log("Applied theme data:", themeData);
    // In a real implementation, we would apply the theme to the active template
    toast({
      title: "Theme Applied",
      description: "Your brand theme has been applied to the template."
    });
  };

  const handleFileDrop = () => {
    toast({
      title: "File Upload",
      description: "You can upload files by dragging them directly onto the canvas."
    });
  };
  
  return (
    <div className="flex flex-col h-screen bg-background">
      <Navbar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-12 bg-editor-toolbar border-b border-editor-border flex items-center px-4 overflow-x-auto">
          <div className="flex items-center space-x-2 mr-6">
            <div className="relative">
              <button className="flex items-center space-x-1 editor-button px-3">
                <span>Web3 Marketplace</span>
                <ChevronDown size={12} />
              </button>
            </div>
            
            <div className="h-6 border-r border-editor-border mx-1"></div>
            
            <button 
              className={`editor-button p-1.5 ${activeTemplate === "marketplace" ? "bg-editor-highlight" : ""}`}
              onClick={() => setActiveTemplate("marketplace")}
            >
              <Grid size={16} />
            </button>
            <button 
              className={`editor-button p-1.5 ${activeTemplate === "drops" ? "bg-editor-highlight" : ""}`}
              onClick={() => setActiveTemplate("drops")}
            >
              <Image size={16} />
            </button>
            <button 
              className={`editor-button p-1.5 ${activeTemplate === "token-gate" ? "bg-editor-highlight" : ""}`}
              onClick={() => setActiveTemplate("token-gate")}
            >
              <FileCode size={16} />
            </button>
            <button 
              className={`editor-button p-1.5 ${activeTemplate === "buy-coin" ? "bg-editor-highlight" : ""}`}
              onClick={() => setActiveTemplate("buy-coin")}
            >
              <Code size={16} />
            </button>
          </div>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center space-x-2">
            <button className="editor-button-primary px-3 flex items-center" onClick={() => setShowThemeMapper(true)}>
              <Settings size={14} className="mr-2" />
              Theme Mapper
            </button>
            
            <button className="editor-button px-3 flex items-center" onClick={() => setShowAIExtractor(true)}>
              <Wand2 size={14} className="mr-2" />
              AI Extractor
            </button>
            
            <div className="h-6 border-r border-editor-border mx-1"></div>
            
            <button className="editor-button p-1.5">
              <Save size={16} />
            </button>
            <button className="editor-button p-1.5">
              <Download size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          <EditorSidebar activeTab={activeTab} setActiveTab={handleTabClick} />
          <CanvasArea activeTemplate={activeTemplate} />
          {showPropertyPanel && <PropertyPanel activeTab={activeTab} onClose={handlePropertyClose} />}
        </div>
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
