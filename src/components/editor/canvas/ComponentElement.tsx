
import React, { useEffect } from "react";
import { CanvasElement } from "../../../types/canvasElement";
import { useComponentElement } from "../../../hooks/useComponentElement";
import ComponentControl from "./component/ComponentControl";
import ComponentEditor from "./component/ComponentEditor";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { toast } from "@/components/ui/use-toast";
import { 
  CircleDollarSign, 
  Wallet, 
  Star, 
  ImageIcon, 
  ShoppingCart, 
  CreditCard, 
  Users, 
  Check, 
  Package, 
  ArrowRight, 
  Grid, 
  Heart
} from "lucide-react";

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
    
    // NFT Card component
    if (element.content === 'NFT Card') {
      return (
        <div className="flex flex-col h-full">
          <div className="bg-gray-200 rounded-t-md w-full aspect-square flex items-center justify-center overflow-hidden">
            <ImageIcon size={32} className="text-gray-400" />
          </div>
          <div className="p-3 bg-white">
            <div className="text-sm font-medium mb-1">Bored Ape #1234</div>
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500 flex items-center">
                <CircleDollarSign size={12} className="mr-1" />
                <span>2.5 ETH</span>
              </div>
              <div className="text-xs flex items-center text-gray-500">
                <Heart size={12} className="mr-1" />
                <span>23</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Wallet Connect Button
    if (element.content === 'Wallet Connect Button') {
      return (
        <div className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center justify-center shadow-sm hover:bg-indigo-700 transition-colors">
          <Wallet size={16} className="mr-2" />
          <span className="font-medium">Connect Wallet</span>
        </div>
      );
    }
    
    // Primary Button
    if (element.content === 'Primary Button') {
      return (
        <div className="bg-blue-600 text-white px-4 py-2 rounded-md text-center shadow-sm font-medium hover:bg-blue-700 transition-colors">
          Get Started
        </div>
      );
    }
    
    // Secondary Button
    if (element.content === 'Secondary Button') {
      return (
        <div className="border-2 border-gray-800 px-4 py-2 rounded-md text-center font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
          <span>Learn More</span>
          <ArrowRight size={16} className="ml-2" />
        </div>
      );
    }
    
    // Feature Card
    if (element.content === 'Feature Card') {
      return (
        <div className="p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow bg-white">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <Star size={24} />
            </div>
          </div>
          <h3 className="text-center font-medium mb-2">Feature Title</h3>
          <p className="text-sm text-gray-600 text-center">
            Describe your amazing feature here. Keep it short and to the point.
          </p>
        </div>
      );
    }
    
    // Token Gate
    if (element.content === 'Token Gate') {
      return (
        <div className="p-4 border rounded-md shadow-sm bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
              <CreditCard size={20} />
            </div>
            <h3 className="font-medium">Token-Gated Access</h3>
          </div>
          <div className="bg-white p-3 rounded border mb-3">
            <div className="text-xs text-gray-500 mb-1">Required Token</div>
            <div className="text-sm font-medium">CryptoKitties #1234+</div>
          </div>
          <button className="w-full bg-purple-600 text-white rounded py-2 text-sm font-medium">
            Verify Ownership
          </button>
        </div>
      );
    }
    
    // Price Display
    if (element.content === 'Price Display') {
      return (
        <div className="p-3 border rounded-md shadow-sm bg-white">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mr-2">
                <CircleDollarSign size={16} />
              </div>
              <span className="font-medium">ETH</span>
            </div>
            <span className="text-green-600 text-xs">+2.4%</span>
          </div>
          <div className="text-xl font-bold mb-1">$1,824.53</div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>24h Volume: $1.2B</span>
            <span>Market Cap: $219.8B</span>
          </div>
        </div>
      );
    }
    
    // NFT Gallery Grid
    if (element.content === 'NFT Gallery Grid') {
      return (
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map(item => (
            <div key={item} className="bg-gray-200 aspect-square rounded flex items-center justify-center">
              <ImageIcon size={24} className="text-gray-400" />
            </div>
          ))}
        </div>
      );
    }
    
    // Collection List
    if (element.content === 'Collection List') {
      return (
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-100 p-2 text-sm font-medium">Top Collections</div>
          {[1, 2, 3].map(item => (
            <div key={item} className="p-2 border-t flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mr-3">
                <Package size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Collection {item}</div>
                <div className="text-xs text-gray-500">Floor: 0.5 ETH</div>
              </div>
              <div className="text-sm font-medium text-green-600">+12.3%</div>
            </div>
          ))}
        </div>
      );
    }
    
    // Data Table
    if (element.content === 'Data Table') {
      return (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Change</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map(item => (
                <tr key={item} className="border-t">
                  <td className="p-2">Item {item}</td>
                  <td className="p-2">2.5 ETH</td>
                  <td className="p-2 text-green-600">+5.2%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    
    // Star Rating
    if (element.content === 'Star Rating') {
      return (
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map(star => (
            <Star 
              key={star} 
              size={20} 
              className={star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">4.0 (128 reviews)</span>
        </div>
      );
    }
    
    // Testimonial Card
    if (element.content === 'Testimonial Card') {
      return (
        <div className="p-4 border rounded-md shadow-sm bg-white">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
              <Users size={16} />
            </div>
            <div>
              <div className="text-sm font-medium">Jane Cooper</div>
              <div className="text-xs text-gray-500">Product Designer</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 italic">
            "This platform completely transformed how we manage our digital assets. The user experience is fantastic!"
          </p>
          <div className="mt-3 flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                size={14} 
                className="text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
        </div>
      );
    }
    
    // Toggle Switch
    if (element.content === 'Toggle Switch') {
      return (
        <div className="flex items-center">
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <div className="w-10 h-5 bg-green-500 rounded-full"></div>
            <div className="absolute block w-4 h-4 mt-0.5 ml-0.5 bg-white rounded-full shadow"></div>
          </div>
          <span className="text-sm">Enabled</span>
        </div>
      );
    }
    
    // Container
    if (element.content === 'Container') {
      return (
        <div className="border-2 border-dashed border-gray-300 p-4 rounded-md bg-gray-50 flex items-center justify-center min-h-[100px]">
          <div className="text-gray-400 text-sm">Container — Drag components here</div>
        </div>
      );
    }
    
    // Flex Row
    if (element.content === 'Flex Row') {
      return (
        <div className="border-2 border-dashed border-gray-300 p-3 rounded-md bg-gray-50 flex flex-row items-center justify-between">
          <div className="w-12 h-8 bg-gray-200 rounded"></div>
          <div className="w-12 h-8 bg-gray-200 rounded"></div>
          <div className="w-12 h-8 bg-gray-200 rounded"></div>
        </div>
      );
    }
    
    // Flex Column
    if (element.content === 'Flex Column') {
      return (
        <div className="border-2 border-dashed border-gray-300 p-3 rounded-md bg-gray-50 flex flex-col items-center space-y-2">
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
        </div>
      );
    }
    
    // Default component rendering
    return element.content;
  };
  
  return (
    <div 
      key={element.id} 
      id={element.id}
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
