
import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ComponentEditorProps {
  isEditing: boolean;
  editedText: string;
  setEditedText: React.Dispatch<React.SetStateAction<string>>;
  handleTextBlur: () => void;
  handleTextKeyDown: (e: React.KeyboardEvent) => void;
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({
  isEditing,
  editedText,
  setEditedText,
  handleTextBlur,
  handleTextKeyDown
}) => {
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  
  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  if (!isEditing) return null;
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  // Use Textarea for longer text, Input for shorter text
  if (editedText && editedText.length > 50) {
    return (
      <Textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={editedText}
        onChange={handleTextChange}
        onBlur={handleTextBlur}
        onKeyDown={handleTextKeyDown}
        className="w-full h-full min-h-[80px] p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        autoFocus
      />
    );
  }
  
  return (
    <Input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      value={editedText}
      onChange={handleTextChange}
      onBlur={handleTextBlur}
      onKeyDown={handleTextKeyDown}
      className="w-full h-full p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      autoFocus
    />
  );
};

export default ComponentEditor;
