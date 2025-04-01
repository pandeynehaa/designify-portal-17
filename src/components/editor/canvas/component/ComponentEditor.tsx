
import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      
      // Select all text for quicker editing
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      } else if (inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  if (!isEditing) return null;
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const handleCancelClick = () => {
    // Reset to original text and close editor
    handleTextBlur();
  };
  
  const handleSaveClick = () => {
    // Apply changes and close editor
    handleTextBlur();
  };

  // Use Textarea for longer text, Input for shorter text
  return (
    <div className="flex flex-col w-full">
      {editedText && editedText.length > 50 ? (
        <Textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editedText}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          onKeyDown={handleTextKeyDown}
          className="w-full h-full min-h-[80px] p-2 text-sm border rounded focus-visible:ring-2 focus-visible:ring-cv-accent focus-visible:ring-offset-0 resize-none"
          autoFocus
          placeholder="Enter component text..."
        />
      ) : (
        <Input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          value={editedText}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          onKeyDown={handleTextKeyDown}
          className="w-full p-2 text-sm border rounded focus-visible:ring-2 focus-visible:ring-cv-accent focus-visible:ring-offset-0"
          autoFocus
          placeholder="Enter component text..."
        />
      )}
      
      <div className="flex justify-end mt-2 space-x-2">
        <Button 
          onClick={handleCancelClick}
          size="sm"
          variant="outline"
          className="h-7 px-2 py-1 text-xs bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          <X size={12} className="mr-1" />
          Cancel
        </Button>
        <Button 
          onClick={handleSaveClick}
          size="sm"
          className="h-7 px-2 py-1 text-xs bg-green-500 text-white hover:bg-green-600"
        >
          <Check size={12} className="mr-1" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default ComponentEditor;
