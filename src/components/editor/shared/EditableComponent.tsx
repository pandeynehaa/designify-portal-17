
import React, { useState } from "react";
import { useEditableText } from "@/hooks/useEditableText";
import { TextCursor, Type } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useCanvasState } from "@/hooks/useCanvasState";

interface EditableComponentProps {
  initialText: string;
  isHeading?: boolean;
  className?: string;
  elementId?: string;
  onSave?: (text: string) => void;
}

const EditableComponent: React.FC<EditableComponentProps> = ({
  initialText,
  isHeading = false,
  className = "",
  elementId,
  onSave
}) => {
  const { editMode } = useCanvasState();
  const {
    isEditing,
    text,
    handleTextClick,
    handleTextBlur,
    handleTextChange,
    handleKeyDown
  } = useEditableText({ 
    initialText,
    onSave: (newText) => {
      if (onSave) {
        onSave(newText);
      } else if (elementId) {
        // Update the canvas element if elementId is provided
        if (typeof (window as any).updateCanvasElement === 'function') {
          (window as any).updateCanvasElement(elementId, { 
            content: newText
          });
          
          toast({
            title: "Text Updated",
            description: "Content has been updated"
          });
        }
      }
    }
  });

  // Default styles based on heading or paragraph
  const baseStyles = isHeading 
    ? "text-2xl md:text-3xl lg:text-4xl font-bold" 
    : "text-base md:text-lg";

  // Only show editing UI if we're in edit mode
  if (!editMode) {
    return <span className={`${baseStyles} ${className}`}>{text}</span>;
  }

  if (isEditing && editMode) {
    return (
      <div className="relative">
        {isHeading ? (
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleKeyDown}
            className={`w-full bg-transparent border-b border-white/30 outline-none px-2 ${baseStyles} ${className}`}
            autoFocus
          />
        ) : (
          <textarea
            value={text}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleKeyDown}
            className={`w-full bg-transparent border-b border-white/30 outline-none px-2 resize-none ${baseStyles} ${className}`}
            rows={2}
            autoFocus
          />
        )}
      </div>
    );
  }

  return (
    <div 
      className={`relative group ${baseStyles} ${className}`}
      onClick={editMode ? handleTextClick : undefined}
    >
      {text}
      {editMode && (
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleTextClick();
            }}
            className="p-1 rounded bg-cv-darkgray/70 hover:bg-cv-accent/60 text-white"
            title="Edit text"
          >
            <TextCursor size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableComponent;
