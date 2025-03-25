
import React from "react";
import { Wand2 } from "lucide-react";

const AIThemeGenerator: React.FC = () => {
  return (
    <div className="p-4 border-t border-gray-200">
      <button className="w-full py-1.5 px-3 bg-theme-primary text-white rounded-md text-sm font-medium hover:bg-theme-primary/90 transition-colors flex items-center justify-center">
        <Wand2 size={14} className="mr-2" />
        AI Theme Generator
      </button>
    </div>
  );
};

export default AIThemeGenerator;
