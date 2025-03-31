
import { useState, useEffect } from "react";
import { EditableTextProps, EditableTextReturn, EditableTextStyles } from "../types/hookTypes";

export const useEditableText = ({ initialText, onSave }: EditableTextProps): EditableTextReturn => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [styles, setStyles] = useState<EditableTextStyles>({});

  // Update text if initialText changes (e.g. from parent component)
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleTextClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsEditing(true);
  };

  const handleTextBlur = () => {
    setIsEditing(false);
    if (onSave && (text !== initialText || Object.keys(styles).length > 0)) {
      onSave(text, styles);
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

  const updateStyle = (styleUpdates: Partial<EditableTextStyles>) => {
    setStyles(prev => ({
      ...prev,
      ...styleUpdates
    }));
  };

  return {
    isEditing,
    text,
    styles,
    handleTextClick,
    handleTextBlur,
    handleTextChange,
    handleKeyDown,
    updateStyle,
    setIsEditing
  };
};
