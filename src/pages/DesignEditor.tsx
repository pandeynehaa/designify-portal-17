
import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import EditorSidebar from "../components/editor/EditorSidebar";
import CanvasArea from "../components/editor/CanvasArea";
import PropertyPanel from "../components/editor/PropertyPanel";
import AIThemeExtractor from "../components/editor/AIThemeExtractor";
import ThemeMapper from "../components/editor/ThemeMapper";
import CanvasTools from "../components/editor/CanvasTools";
import CanvasDropOverlay from "../components/editor/CanvasDropOverlay";
import { Save, FileCode, Settings, Image, Wand2, Code, Grid, Download, ChevronDown, Undo, Redo, Layers } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const DesignEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState("layout");
  const [showPropertyPanel, setShowPropertyPanel] = useState(true);
  const [showAIExtractor, setShowAIExtractor] = useState(false);
  const [showThemeMapper, setShowThemeMapper] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState("marketplace");
  const [zoom, setZoom] = useState(1);
  const [dropOverlayVisible, setDropOverlayVisible] = useState(false);
  
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

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  // Set up event handlers for drag and drop overlay
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setDropOverlayVisible(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setDropOverlayVisible(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setDropOverlayVisible(false);
    };

    const canvas = document.getElementById('canvas-area');
    if (canvas) {
      canvas.addEventListener('dragover', handleDragOver);
      canvas.addEventListener('dragleave', handleDragLeave);
      canvas.addEventListener('drop', handleDrop);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('dragover', handleDragOver);
        canvas.removeEventListener('dragleave', handleDragLeave);
        canvas.removeEventListener('drop', handleDrop);
      }
    };
  }, []);
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 overflow-x-auto shadow-sm">
          <div className="flex items-center space-x-2 mr-6">
            <div className="relative">
              <button className="flex items-center space-x-1 px-3 py-1.5 text-gray-700 text-sm font-medium hover:bg-gray-100 rounded-md transition-colors">
                <span>Web3 Marketplace</span>
                <ChevronDown size={12} />
              </button>
            </div>
            
            <div className="h-6 border-r border-gray-200 mx-1"></div>
            
            <button 
              className={`p-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors ${activeTemplate === "marketplace" ? "bg-gray-100 text-gray-900" : ""}`}
              onClick={() => setActiveTemplate("marketplace")}
            >
              <Grid size={16} />
            </button>
            <button 
              className={`p-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors ${activeTemplate === "drops" ? "bg-gray-100 text-gray-900" : ""}`}
              onClick={() => setActiveTemplate("drops")}
            >
              <Image size={16} />
            </button>
            <button 
              className={`p-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors ${activeTemplate === "token-gate" ? "bg-gray-100 text-gray-900" : ""}`}
              onClick={() => setActiveTemplate("token-gate")}
            >
              <FileCode size={16} />
            </button>
            <button 
              className={`p-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors ${activeTemplate === "buy-coin" ? "bg-gray-100 text-gray-900" : ""}`}
              onClick={() => setActiveTemplate("buy-coin")}
            >
              <Code size={16} />
            </button>
          </div>
          
          <div className="flex items-center space-x-1 mr-auto">
            <button className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
              <Undo size={16} />
            </button>
            <button className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
              <Redo size={16} />
            </button>
            <button className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
              <Layers size={16} />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-md flex items-center text-sm font-medium transition-colors"
              onClick={() => setShowThemeMapper(true)}
            >
              <Settings size={14} className="mr-2" />
              Theme Mapper
            </button>
            
            <button 
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5 rounded-md flex items-center text-sm font-medium transition-colors"
              onClick={() => setShowAIExtractor(true)}
            >
              <Wand2 size={14} className="mr-2" />
              AI Extractor
            </button>
            
            <div className="h-6 border-r border-gray-200 mx-1"></div>
            
            <button className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
              <Save size={16} />
            </button>
            <button className="p-1.5 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
              <Download size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          <EditorSidebar activeTab={activeTab} setActiveTab={handleTabClick} />
          
          <div className="flex-1 relative overflow-hidden bg-gray-100" id="canvas-area">
            <CanvasArea activeTemplate={activeTemplate} zoom={zoom} />
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
