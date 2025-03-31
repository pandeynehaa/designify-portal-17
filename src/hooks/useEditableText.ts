
import { useState } from "react";

interface UseEditableTextProps {
  initialText: string;
  onSave?: (newText: string) => void;
}

export const useEditableText = ({ initialText, onSave }: UseEditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextBlur = () => {
    setIsEditing(false);
    if (onSave && text !== initialText) {
      onSave(text);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextBlur();
    }
  };

  return {
    isEditing,
    text,
    handleTextClick,
    handleTextBlur,
    handleTextChange,
    handleKeyDown
  };
};
