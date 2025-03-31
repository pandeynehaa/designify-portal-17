
import React from "react";
import { Eye } from "lucide-react";
import { TemplateStyles } from "@/types/templateStyles";

interface ThemePreviewProps {
  templateStyles: TemplateStyles;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ templateStyles }) => {
  return (
    <>
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Current Theme Colors</label>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="w-8 h-8 rounded-md" style={{ backgroundColor: templateStyles.accentColor }}></div>
          <div className="w-8 h-8 rounded-md" style={{ backgroundColor: templateStyles.buttonBg }}></div>
          <div className="w-8 h-8 rounded-md" style={{ backgroundColor: templateStyles.headerBg }}></div>
          <div className="w-8 h-8 rounded-md" style={{ backgroundColor: templateStyles.cardBg }}></div>
        </div>
      </div>
      
      <div className="border-t border-editor-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-editor-muted">Preview</span>
          <button className="p-1 rounded-md bg-editor-surface hover:bg-editor-highlight transition-colors">
            <Eye size={16} className="text-editor-text" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ThemePreview;
