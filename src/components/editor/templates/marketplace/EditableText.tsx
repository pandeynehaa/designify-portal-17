
import React, { useState, useEffect } from "react";
import { TextCursor, Type, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react";
import { useEditableText } from "../../../../hooks/useEditableText";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

  const [fontFamily, setFontFamily] = useState<string>(isHeading ? "font-display" : "font-sans");
  const [fontSize, setFontSize] = useState<number>(isHeading ? 24 : 16);
  const [textColor, setTextColor] = useState<string>("#FFFFFF");
  const [isBold, setIsBold] = useState<boolean>(isHeading);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderlined, setIsUnderlined] = useState<boolean>(false);
  const [textAlign, setTextAlign] = useState<string>("text-center");
  const [showStyleControls, setShowStyleControls] = useState<boolean>(false);

  const availableFonts = [
    { name: "Display", value: "font-display" },
    { name: "Sans", value: "font-sans" },
    { name: "Serif", value: "font-serif" },
    { name: "Mono", value: "font-mono" }
  ];

  const fontSizePx = `${fontSize}px`;
  
  const textStyle = {
    fontFamily: `var(--${fontFamily.replace('font-', '')})`,
    fontSize: fontSizePx,
    color: textColor,
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    textDecoration: isUnderlined ? 'underline' : 'none'
  };

  if (isEditing) {
    if (isHeading) {
      return (
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleKeyDown}
            className={`text-5xl mb-4 bg-transparent border-b border-white/50 w-full outline-none px-2 ${textAlign}`}
            style={textStyle}
            autoFocus
          />
          <TextStyleToolbar 
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            fontSize={fontSize}
            setFontSize={setFontSize}
            textColor={textColor}
            setTextColor={setTextColor}
            isBold={isBold}
            setIsBold={setIsBold}
            isItalic={isItalic}
            setIsItalic={setIsItalic}
            isUnderlined={isUnderlined}
            setIsUnderlined={setIsUnderlined}
            textAlign={textAlign}
            setTextAlign={setTextAlign}
            availableFonts={availableFonts}
          />
        </div>
      );
    } else {
      return (
        <div className="relative">
          <textarea
            value={text}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleKeyDown}
            className={`text-xl mb-8 max-w-2xl mx-auto bg-transparent border-b border-white/50 w-full outline-none px-2 resize-none ${textAlign}`}
            style={textStyle}
            autoFocus
            rows={2}
          />
          <TextStyleToolbar 
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            fontSize={fontSize}
            setFontSize={setFontSize}
            textColor={textColor}
            setTextColor={setTextColor}
            isBold={isBold}
            setIsBold={setIsBold}
            isItalic={isItalic}
            setIsItalic={setIsItalic}
            isUnderlined={isUnderlined}
            setIsUnderlined={setIsUnderlined}
            textAlign={textAlign}
            setTextAlign={setTextAlign}
            availableFonts={availableFonts}
          />
        </div>
      );
    }
  }

  return (
    <div 
      className={`relative group ${className} ${textAlign}`}
      onClick={handleTextClick}
      style={textStyle}
    >
      <div className="relative inline-block">
        {text}
        <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowStyleControls(!showStyleControls);
            }}
            className="p-1 rounded bg-cv-darkgray/70 hover:bg-cv-accent/60 text-white"
          >
            <Type size={16} />
          </button>
          <button 
            onClick={handleTextClick} 
            className="p-1 rounded bg-cv-darkgray/70 hover:bg-cv-accent/60 text-white"
          >
            <TextCursor size={16} />
          </button>
        </div>
      </div>
      
      {showStyleControls && !isEditing && (
        <div className="absolute top-full mt-2 left-0 z-50 bg-cv-darkgray border border-cv-lightgray rounded-md shadow-lg p-2">
          <TextStyleToolbar 
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            fontSize={fontSize}
            setFontSize={setFontSize}
            textColor={textColor}
            setTextColor={setTextColor}
            isBold={isBold}
            setIsBold={setIsBold}
            isItalic={isItalic}
            setIsItalic={setIsItalic}
            isUnderlined={isUnderlined}
            setIsUnderlined={setIsUnderlined}
            textAlign={textAlign}
            setTextAlign={setTextAlign}
            availableFonts={availableFonts}
          />
        </div>
      )}
    </div>
  );
};

interface TextStyleToolbarProps {
  fontFamily: string;
  setFontFamily: (value: string) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  textColor: string;
  setTextColor: (value: string) => void;
  isBold: boolean;
  setIsBold: (value: boolean) => void;
  isItalic: boolean;
  setIsItalic: (value: boolean) => void;
  isUnderlined: boolean;
  setIsUnderlined: (value: boolean) => void;
  textAlign: string;
  setTextAlign: (value: string) => void;
  availableFonts: { name: string; value: string }[];
}

const TextStyleToolbar: React.FC<TextStyleToolbarProps> = ({
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  textColor,
  setTextColor,
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  isUnderlined,
  setIsUnderlined,
  textAlign,
  setTextAlign,
  availableFonts
}) => {
  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="absolute top-full left-0 mt-2 p-2 bg-cv-darkgray border border-cv-lightgray rounded-md shadow-md z-50 w-[280px]"
      onClick={stopPropagation}
    >
      <div className="grid grid-cols-3 gap-2 mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full justify-between bg-cv-gray border-cv-lightgray text-cv-white">
              <span className="truncate">
                {availableFonts.find(font => font.value === fontFamily)?.name || "Font"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cv-darkgray border-cv-lightgray text-cv-white">
            {availableFonts.map(font => (
              <DropdownMenuItem 
                key={font.value}
                onClick={() => setFontFamily(font.value)}
                className={`cursor-pointer ${fontFamily === font.value ? 'bg-cv-accent/40' : 'hover:bg-cv-gray'}`}
              >
                {font.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="col-span-2 flex items-center gap-2">
          <label className="text-cv-white text-xs whitespace-nowrap">Size:</label>
          <Slider
            value={[fontSize]}
            onValueChange={handleFontSizeChange}
            min={8}
            max={72}
            step={1}
            className="flex-1"
          />
          <span className="text-cv-white text-xs whitespace-nowrap">{fontSize}px</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <label className="text-cv-white text-xs whitespace-nowrap">Color:</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="w-full h-6 bg-cv-gray border border-cv-lightgray rounded cursor-pointer"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-8 w-8 ${isBold ? 'bg-cv-accent/40' : 'hover:bg-cv-gray'}`}
            onClick={() => setIsBold(!isBold)}
          >
            <Bold size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-8 w-8 ${isItalic ? 'bg-cv-accent/40' : 'hover:bg-cv-gray'}`}
            onClick={() => setIsItalic(!isItalic)}
          >
            <Italic size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-8 w-8 ${isUnderlined ? 'bg-cv-accent/40' : 'hover:bg-cv-gray'}`}
            onClick={() => setIsUnderlined(!isUnderlined)}
          >
            <Underline size={14} />
          </Button>
        </div>
        
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-8 w-8 ${textAlign === 'text-left' ? 'bg-cv-accent/40' : 'hover:bg-cv-gray'}`}
            onClick={() => setTextAlign('text-left')}
          >
            <AlignLeft size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-8 w-8 ${textAlign === 'text-center' ? 'bg-cv-accent/40' : 'hover:bg-cv-gray'}`}
            onClick={() => setTextAlign('text-center')}
          >
            <AlignCenter size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`p-1 h-8 w-8 ${textAlign === 'text-right' ? 'bg-cv-accent/40' : 'hover:bg-cv-gray'}`}
            onClick={() => setTextAlign('text-right')}
          >
            <AlignRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditableText;
