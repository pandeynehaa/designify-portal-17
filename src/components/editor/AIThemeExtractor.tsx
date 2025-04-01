
import React from "react";
import AIThemeExtractorHeader from "./themeExtractor/AIThemeExtractorHeader";
import AIThemeExtractorContent from "./themeExtractor/AIThemeExtractorContent";

interface AIThemeExtractorProps {
  onClose: () => void;
  onExtract: (themeData: any) => void;
}

const AIThemeExtractor: React.FC<AIThemeExtractorProps> = ({ onClose, onExtract }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-editor-panel rounded-lg shadow-xl overflow-hidden w-full max-w-4xl animate-scale-in">
        <AIThemeExtractorHeader onClose={onClose} />
        <AIThemeExtractorContent onClose={onClose} onExtract={onExtract} />
      </div>
    </div>
  );
};

export default AIThemeExtractor;
