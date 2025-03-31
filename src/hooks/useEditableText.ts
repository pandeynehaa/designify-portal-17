
import { useState } from "react";

interface UseEditableTextProps {
  initialText: string;
}

export const useEditableText = ({ initialText }: UseEditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextBlur = () => {
    setIsEditing(false);
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
