
import React from "react";
import { Wand2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const AIThemeGenerator: React.FC = () => {
  const handleGenerateTheme = () => {
    toast({
      title: "AI Theme Generator",
      description: "Generating a new theme based on your design..."
    });
    
    // Simulate a delay for AI processing
    setTimeout(() => {
      toast({
        title: "Theme Generated",
        description: "New theme has been applied to your design"
      });
    }, 2000);
  };

  return (
    <div className="p-4 border-t border-cv-lightgray">
      <button 
        className="w-full py-1.5 px-3 bg-cv-accent text-cv-white rounded-md text-sm font-medium hover:bg-cv-accent/90 transition-colors flex items-center justify-center"
        onClick={handleGenerateTheme}
      >
        <Wand2 size={14} className="mr-2" />
        AI Theme Generator
      </button>
    </div>
  );
};

export default AIThemeGenerator;
