
import { CanvasElement } from "./canvasElement";

// Editable text types
export interface EditableTextStyles {
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderlined?: boolean;
  textAlign?: string;
}

export interface EditableTextProps {
  initialText: string;
  onSave?: (newText: string, styles?: EditableTextStyles) => void;
}

export interface EditableTextReturn {
  isEditing: boolean;
  text: string;
  styles: EditableTextStyles;
  handleTextClick: (e?: React.MouseEvent) => void;
  handleTextBlur: () => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  updateStyle: (styleUpdates: Partial<EditableTextStyles>) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component element types
export interface ComponentElementProps {
  element: CanvasElement;
  activeTool: string;
  editMode: boolean;
}

export interface ComponentElementReturn {
  isSelected: boolean;
  position: { x: number, y: number };
  isEditing: boolean;
  editedText: string;
  setEditedText: React.Dispatch<React.SetStateAction<string>>;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleDoubleClick: (e: React.MouseEvent) => void;
  handleTextBlur: () => void;
  handleTextKeyDown: (e: React.KeyboardEvent) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isDragging: boolean;
}
