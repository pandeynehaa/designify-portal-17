
import React from "react";
import { 
  Save, FileCode, Settings, Image, Wand2, Code, Grid, 
  Download, ChevronDown, Undo, Redo, Layers 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface EditorHeaderProps {
  activeTemplate: string;
  setActiveTemplate: (template: string) => void;
  setShowThemeMapper: (show: boolean) => void;
  setShowAIExtractor: (show: boolean) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  activeTemplate,
  setActiveTemplate,
  setShowThemeMapper,
  setShowAIExtractor
}) => {
  return (
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
  );
};

export default EditorHeader;
