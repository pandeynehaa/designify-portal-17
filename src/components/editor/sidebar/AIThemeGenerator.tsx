
import React from "react";
import { Wand2 } from "lucide-react";

const AIThemeGenerator: React.FC = () => {
  return (
    <div className="p-4 border-t border-cv-lightgray">
      <button className="w-full py-1.5 px-3 bg-cv-accent text-cv-white rounded-md text-sm font-medium hover:bg-cv-accent/90 transition-colors flex items-center justify-center">
        <Wand2 size={14} className="mr-2" />
        AI Theme Generator
      </button>
    </div>
  );
};

export default AIThemeGenerator;
