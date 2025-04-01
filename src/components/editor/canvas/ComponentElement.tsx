
import React, { useEffect } from "react";
import { CanvasElement } from "../../../types/canvasElement";
import { useComponentElement } from "../../../hooks/useComponentElement";
import ComponentControl from "./component/ComponentControl";
import ComponentEditor from "./component/ComponentEditor";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { toast } from "@/components/ui/use-toast";

interface ComponentElementProps {
  element: CanvasElement;
  activeTool: string;
  editMode?: boolean;
}

const ComponentElement: React.FC<ComponentElementProps> = ({ 
  element, 
  activeTool,
  editMode = true // Default to edit mode
}) => {
  const {
    isSelected,
    position,
    isEditing,
    editedText,
    setEditedText,
    handleMouseDown,
    handleDoubleClick,
    handleTextBlur,
    handleTextKeyDown,
    setIsEditing,
    isDragging
  } = useComponentElement({ element, activeTool, editMode });

  const { selectElement } = useSelectedElement();
  
  // Auto-select the element when it's first created
  useEffect(() => {
    if (element.isNew) {
      selectElement(element);
      // Show hint toast
      toast({
        title: "Component Added",
        description: "Double-click to edit text or use controls to move/resize"
      });
    }
  }, [element, selectElement]);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Only select in edit mode
    if (editMode) {
      selectElement(element);
    }
  };
  
  // Handle custom background properties if they exist
  const elementBackground = element.backgroundType && element.backgroundValue 
    ? element.backgroundType === 'gradient' 
      ? element.backgroundValue 
      : element.backgroundType === 'color' 
        ? element.backgroundValue 
        : 'white'
    : 'white';
    
  // Handle custom effects if they exist
  const blurEffect = element.blurAmount ? `blur(${element.blurAmount}px)` : 'none';
  const opacity = element.opacity ? element.opacity / 100 : 1;
  
  const style = {
    position: 'absolute' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: editMode && activeTool === 'move' ? 'move' : editMode ? 'pointer' : 'default',
    transition: isDragging ? 'none' : 'all 0.2s ease',
    minWidth: '100px', // Ensure a minimum size for text elements
    minHeight: '30px',
    opacity: editMode ? 1 : opacity,
    background: elementBackground,
    backdropFilter: blurEffect,
    width: element.width ? `${element.width}px` : 'auto',
    height: element.height ? `${element.height}px` : 'auto',
    transform: element.rotation ? `rotate(${element.rotation}deg)` : 'none',
  };
  
  // Generate component content based on element type
  const renderComponentContent = () => {
    // If we're editing, return nothing as the editor will handle this
    if (isEditing) return null;
    
    // If it's an NFT Card, render a more detailed component
    if (element.content === 'NFT Card') {
      return (
        <div className="flex flex-col">
          <div className="bg-gray-200 rounded-md w-full aspect-square flex items-center justify-center mb-2">
            <Image size={24} className="text-gray-400" />
          </div>
          <div className="text-sm font-medium">Bored Ape #1234</div>
          <div className="text-xs text-gray-500 flex items-center mt-1">
            <CircleDollarSign size={12} className="mr-1" />
            <span>2.5 ETH</span>
          </div>
        </div>
      );
    }
    
    // If it's a wallet connect button
    if (element.content === 'Wallet Connect Button') {
      return (
        <div className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center">
          <Wallet size={16} className="mr-2" />
          <span>Connect Wallet</span>
        </div>
      );
    }
    
    // If it's a primary button
    if (element.content === 'Primary Button') {
      return (
        <div className="bg-blue-600 text-white px-4 py-2 rounded-md text-center">
          Button Text
        </div>
      );
    }
    
    // If it's a secondary button
    if (element.content === 'Secondary Button') {
      return (
        <div className="border-2 border-gray-800 px-4 py-2 rounded-md text-center">
          Button Text
        </div>
      );
    }
    
    // If it's a feature card
    if (element.content === 'Feature Card') {
      return (
        <div className="p-4 border rounded-md shadow-sm">
          <div className="flex justify-center mb-3">
            <Star size={24} className="text-yellow-500" />
          </div>
          <h3 className="text-center font-medium mb-2">Feature Title</h3>
          <p className="text-sm text-gray-600 text-center">
            Describe your amazing feature here. Keep it short and to the point.
          </p>
        </div>
      );
    }
    
    // Default component rendering
    return element.content;
  };
  
  return (
    <div 
      key={element.id} 
      style={style} 
      className={`p-2 border rounded ${
        !editMode ? 'shadow-md pointer-events-none' : 
        activeTool === 'move' ? 'hover:shadow-md' : ''
      } ${isSelected && editMode ? 'canvas-element selected ring-2 ring-cv-accent' : 'canvas-element'}
      ${isDragging ? 'wiggle-animation z-50' : ''}`}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      {isEditing ? (
        <ComponentEditor 
          isEditing={isEditing}
          editedText={editedText}
          setEditedText={setEditedText}
          handleTextBlur={handleTextBlur}
          handleTextKeyDown={handleTextKeyDown}
        />
      ) : (
        <div className="component-content">
          {renderComponentContent()}
        </div>
      )}
      
      <ComponentControl 
        element={element}
        isSelected={isSelected}
        activeTool={activeTool}
        editMode={editMode}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default ComponentElement;
