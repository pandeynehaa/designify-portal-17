
import React from "react";
import { X } from "lucide-react";

interface AIThemeExtractorHeaderProps {
  onClose: () => void;
}

const AIThemeExtractorHeader: React.FC<AIThemeExtractorHeaderProps> = ({ onClose }) => {
  return (
    <div className="editor-toolbar justify-between">
      <span className="text-editor-text text-sm font-medium">AI Theme Extractor</span>
      <button className="editor-button p-1.5" onClick={onClose}>
        <X size={14} />
      </button>
    </div>
  );
};

export default AIThemeExtractorHeader;
