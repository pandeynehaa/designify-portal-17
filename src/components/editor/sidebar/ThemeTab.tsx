
import React from "react";
import { Wand2 } from "lucide-react";

const ThemeTab: React.FC = () => {
  return (
    <div className="p-4 border-t border-cv-lightgray">
      <div className="bg-cv-gray p-3 rounded-md">
        <div className="text-xs font-medium text-cv-white mb-2">Current Theme</div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-cv-accent"></div>
          <div className="w-6 h-6 rounded-full bg-cv-lightgray"></div>
          <div className="w-6 h-6 rounded-full bg-cv-secondary"></div>
          <div className="w-6 h-6 rounded-full bg-cv-white"></div>
        </div>
        <button className="w-full py-1.5 px-3 bg-cv-accent text-cv-white rounded-md text-sm font-medium hover:bg-cv-accent/90 transition-colors">
          Edit Theme
        </button>
      </div>
    </div>
  );
};

export default ThemeTab;
