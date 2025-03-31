
import React from "react";
import { Plus } from "lucide-react";
import { TemplateStyles } from "../../../types/templateStyles";

interface CanvasActionButtonProps {
  editMode: boolean;
  templateStyles: TemplateStyles;
}

const CanvasActionButton: React.FC<CanvasActionButtonProps> = ({
  editMode,
  templateStyles
}) => {
  if (!editMode) return null;
  
  return (
    <button 
      className="absolute right-4 bottom-4 p-2 rounded-full text-white shadow-lg transition-colors"
      style={{ backgroundColor: templateStyles.buttonBg }}
      title="Add Element"
    >
      <Plus size={20} />
    </button>
  );
};

export default CanvasActionButton;
