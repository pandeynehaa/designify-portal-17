
import React from "react";
import { ArrowRight } from "lucide-react";

interface ActionButtonsProps {
  onClose: () => void;
  onApply: () => void;
  showApply: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onClose, 
  onApply, 
  showApply 
}) => {
  return (
    <div className="flex justify-end space-x-3">
      <button
        className="editor-button px-4"
        onClick={onClose}
      >
        Cancel
      </button>
      
      {showApply && (
        <button
          className="editor-button-primary px-4 flex items-center"
          onClick={onApply}
        >
          Apply Theme
          <ArrowRight size={16} className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
