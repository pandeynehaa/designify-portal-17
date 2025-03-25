
import React from "react";
import { Wand2 } from "lucide-react";

const ThemeTab: React.FC = () => {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="bg-gray-50 p-3 rounded-md">
        <div className="text-xs font-medium text-gray-700 mb-2">Current Theme</div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-theme-primary"></div>
          <div className="w-6 h-6 rounded-full bg-theme-secondary"></div>
          <div className="w-6 h-6 rounded-full bg-theme-accent"></div>
          <div className="w-6 h-6 rounded-full bg-theme-neutral"></div>
        </div>
        <button className="w-full py-1.5 px-3 bg-theme-primary text-white rounded-md text-sm font-medium hover:bg-theme-primary/90 transition-colors">
          Edit Theme
        </button>
      </div>
    </div>
  );
};

export default ThemeTab;
