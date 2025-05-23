
import React, { useState, Dispatch, SetStateAction } from "react";
import { 
  Save, FileCode, Settings, Image, Wand2, Code, Grid, 
  ChevronDown, Undo, Redo, Layers 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TemplateType } from "../../types/templateStyles";

interface EditorHeaderProps {
  activeTemplate: string;
  setActiveTemplate: Dispatch<SetStateAction<TemplateType>>;
  setShowThemeMapper: (show: boolean) => void;
  setShowAIExtractor: (show: boolean) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  activeTemplate,
  setActiveTemplate,
  setShowThemeMapper,
  setShowAIExtractor
}) => {
  const [selectedSite, setSelectedSite] = useState("Web3 Marketplace");

  const siteOptions = [
    { name: "Web3 Marketplace", slug: "marketplace" as TemplateType },
    { name: "NFT Drop", slug: "drops" as TemplateType },
    { name: "Token Gate", slug: "token-gate" as TemplateType },
    { name: "Buy Coin", slug: "buy-coin" as TemplateType }
  ];

  const handleSiteChange = (siteName: string, slug: TemplateType) => {
    setSelectedSite(siteName);
    setActiveTemplate(slug);
    toast({
      title: "Site Changed",
      description: `You are now editing the ${siteName} template`
    });
  };

  const handleSave = () => {
    toast({
      title: "Design Saved",
      description: "Your design has been saved successfully"
    });
  };

  const handleUndo = () => {
    toast({
      title: "Undo",
      description: "Action undone"
    });
  };

  const handleRedo = () => {
    toast({
      title: "Redo",
      description: "Action redone"
    });
  };

  const handleLayers = () => {
    toast({
      title: "Layers Panel",
      description: "Layers panel will be available soon"
    });
  };

  return (
    <div className="h-12 bg-cv-darkgray border-b border-cv-lightgray flex items-center px-4 overflow-x-auto shadow-sm">
      <div className="flex items-center space-x-2 mr-6">
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-1 px-3 py-1.5 text-cv-white text-sm font-medium hover:bg-cv-lightgray rounded-md transition-colors">
                <span>{selectedSite}</span>
                <ChevronDown size={12} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-cv-darkgray border border-cv-lightgray">
              {siteOptions.map((site) => (
                <DropdownMenuItem 
                  key={site.slug}
                  onClick={() => handleSiteChange(site.name, site.slug)}
                  className="text-cv-white hover:bg-cv-lightgray cursor-pointer"
                >
                  {site.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="h-6 border-r border-cv-lightgray mx-1"></div>
        
        <button 
          className={`p-1.5 rounded-md text-cv-white hover:bg-cv-lightgray transition-colors ${activeTemplate === "marketplace" ? "bg-cv-lightgray" : ""}`}
          onClick={() => setActiveTemplate("marketplace")}
        >
          <Grid size={16} />
        </button>
        <button 
          className={`p-1.5 rounded-md text-cv-white hover:bg-cv-lightgray transition-colors ${activeTemplate === "drops" ? "bg-cv-lightgray" : ""}`}
          onClick={() => setActiveTemplate("drops")}
        >
          <Image size={16} />
        </button>
        <button 
          className={`p-1.5 rounded-md text-cv-white hover:bg-cv-lightgray transition-colors ${activeTemplate === "token-gate" ? "bg-cv-lightgray" : ""}`}
          onClick={() => setActiveTemplate("token-gate")}
        >
          <FileCode size={16} />
        </button>
        <button 
          className={`p-1.5 rounded-md text-cv-white hover:bg-cv-lightgray transition-colors ${activeTemplate === "buy-coin" ? "bg-cv-lightgray" : ""}`}
          onClick={() => setActiveTemplate("buy-coin")}
        >
          <Code size={16} />
        </button>
      </div>
      
      <div className="flex items-center space-x-1 mr-auto">
        <button 
          className="p-1.5 rounded-md text-cv-white hover:bg-cv-lightgray transition-colors"
          onClick={handleUndo}
        >
          <Undo size={16} />
        </button>
        <button 
          className="p-1.5 rounded-md text-cv-white hover:bg-cv-lightgray transition-colors"
          onClick={handleRedo}
        >
          <Redo size={16} />
        </button>
        <button 
          className="p-1.5 rounded-md text-cv-white hover:bg-cv-lightgray transition-colors"
          onClick={handleLayers}
        >
          <Layers size={16} />
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          className="bg-cv-darkgray border border-cv-lightgray text-cv-white hover:bg-cv-lightgray px-3 py-1.5 rounded-md flex items-center text-sm font-medium transition-colors"
          onClick={() => setShowThemeMapper(true)}
        >
          <Settings size={14} className="mr-2" />
          Theme Mapper
        </button>
        
        <button 
          className="bg-cv-purple text-cv-white hover:bg-cv-purple/90 px-3 py-1.5 rounded-md flex items-center text-sm font-medium transition-colors"
          onClick={() => setShowAIExtractor(true)}
        >
          <Wand2 size={14} className="mr-2" />
          AI Extractor
        </button>
        
        <div className="h-6 border-r border-cv-lightgray mx-1"></div>
        
        <button 
          className="p-1.5 rounded-md text-cv-white hover:bg-cv-lightgray transition-colors"
          onClick={handleSave}
        >
          <Save size={16} />
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
