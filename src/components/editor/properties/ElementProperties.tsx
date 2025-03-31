
import React, { useState } from "react";
import { CanvasElement } from "../../../types/canvasElement";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

interface ElementPropertiesProps {
  element: CanvasElement;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
}

const ElementProperties: React.FC<ElementPropertiesProps> = ({ element, updateElement }) => {
  const [content, setContent] = useState(element.content || "");
  const [position, setPosition] = useState({ x: element.x, y: element.y });

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handlePositionChange = (axis: 'x' | 'y', value: string) => {
    const numValue = parseInt(value) || 0;
    setPosition({ ...position, [axis]: numValue });
  };

  const handleSave = () => {
    updateElement(element.id, { 
      content, 
      x: position.x, 
      y: position.y 
    });
    
    toast({
      title: "Element Updated",
      description: "Changes have been saved"
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <Label className="text-xs text-editor-muted mb-1.5">Element Type</Label>
        <div className="text-sm font-medium capitalize">{element.type}</div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="content" className="flex-1">Content</TabsTrigger>
          <TabsTrigger value="position" className="flex-1">Position</TabsTrigger>
          <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4 pt-4">
          {element.type === 'component' && (
            <div>
              <Label htmlFor="content-input" className="text-xs text-editor-muted mb-1.5">Text Content</Label>
              <Input
                id="content-input"
                value={content}
                onChange={handleContentChange}
                className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
          )}
          
          {element.type === 'image' && (
            <div>
              <Label htmlFor="image-src" className="text-xs text-editor-muted mb-1.5">Image Source</Label>
              <Input
                id="image-src"
                value={content}
                onChange={handleContentChange}
                className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
              <div className="mt-2">
                <img 
                  src={content} 
                  alt="Preview" 
                  className="max-w-full h-auto max-h-32 object-contain mt-2 border border-gray-200 rounded"
                />
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="position" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pos-x" className="text-xs text-editor-muted mb-1.5">X Position</Label>
              <Input
                id="pos-x"
                type="number"
                value={position.x}
                onChange={(e) => handlePositionChange('x', e.target.value)}
                className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
            <div>
              <Label htmlFor="pos-y" className="text-xs text-editor-muted mb-1.5">Y Position</Label>
              <Input
                id="pos-y"
                type="number"
                value={position.y}
                onChange={(e) => handlePositionChange('y', e.target.value)}
                className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="style" className="space-y-4 pt-4">
          <div className="text-sm text-editor-muted">
            Style options will vary based on the element type.
          </div>
          {/* We can add more style options here in the future */}
        </TabsContent>
      </Tabs>

      <button 
        className="w-full py-2 px-4 bg-cv-accent text-white rounded-md hover:bg-cv-accent/90 transition-colors"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
};

export default ElementProperties;
