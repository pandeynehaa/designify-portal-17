
import React from "react";
import { TextCursor } from "lucide-react";
import { useEditableText } from "../../../../hooks/useEditableText";

interface EditableTextProps {
  initialText: string;
  isHeading?: boolean;
  className?: string;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  initialText, 
  isHeading = false,
  className = "" 
}) => {
  const {
    isEditing,
    text,
    handleTextClick,
    handleTextBlur,
    handleTextChange,
    handleKeyDown
  } = useEditableText({ initialText });

  if (isEditing) {
    if (isHeading) {
      return (
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          onKeyDown={handleKeyDown}
          className="text-5xl font-bold mb-4 bg-transparent border-b border-white/50 text-center w-full outline-none px-2"
          autoFocus
        />
      );
    } else {
      return (
        <textarea
          value={text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          onKeyDown={handleKeyDown}
          className="text-xl mb-8 max-w-2xl mx-auto bg-transparent border-b border-white/50 text-center w-full outline-none px-2 resize-none"
          autoFocus
          rows={2}
        />
      );
    }
  }

  return (
    <div 
      className={`cursor-pointer group relative ${className}`}
      onClick={handleTextClick}
    >
      {text}
      <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <TextCursor size={18} className="text-white/70" />
      </span>
    </div>
  );
};

export default EditableText;
