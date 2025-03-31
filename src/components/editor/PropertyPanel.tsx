
import React from "react";
import { X } from "lucide-react";
import { TemplateStyles } from "../../types/templateStyles";
import { CanvasElement } from "../../types/canvasElement";
import { useSelectedElement } from "../../hooks/useSelectedElement";
import TypographyProperties from "./properties/TypographyProperties";
import ColorProperties from "./properties/ColorProperties";
import ImageProperties from "./properties/ImageProperties";
import LayoutProperties from "./properties/LayoutProperties";
import EffectsProperties from "./properties/EffectsProperties";
import ThemeProperties from "./properties/ThemeProperties";
import ElementProperties from "./properties/ElementProperties";

interface PropertyPanelProps {
  activeTab: string;
  onClose: () => void;
  templateStyles: TemplateStyles;
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ 
  activeTab, 
  onClose, 
  templateStyles, 
  updateTemplateStyles 
}) => {
  const { selectedElement } = useSelectedElement();
  
  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    if (typeof (window as any).updateCanvasElement === 'function') {
      (window as any).updateCanvasElement(id, updates);
    } else {
      console.error("updateCanvasElement function not available");
    }
  };

  return (
    <div className="editor-panel w-72 flex flex-col h-full">
      <div className="editor-toolbar justify-between">
        <span className="text-editor-text text-sm font-medium capitalize">
          {selectedElement ? `${selectedElement.type} Properties` : `${activeTab} Properties`}
        </span>
        <button className="editor-button p-1.5" onClick={onClose}>
          <X size={14} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {selectedElement ? (
          <ElementProperties 
            element={selectedElement} 
            updateElement={updateElement}
          />
        ) : (
          <>
            {activeTab === "typography" && (
              <TypographyProperties 
                templateStyles={templateStyles} 
                updateTemplateStyles={updateTemplateStyles} 
              />
            )}
            {activeTab === "colors" && (
              <ColorProperties 
                templateStyles={templateStyles} 
                updateTemplateStyles={updateTemplateStyles} 
              />
            )}
            {activeTab === "images" && <ImageProperties />}
            {activeTab === "layout" && (
              <LayoutProperties 
                templateStyles={templateStyles} 
                updateTemplateStyles={updateTemplateStyles} 
              />
            )}
            {activeTab === "effects" && <EffectsProperties />}
            {activeTab === "theme" && (
              <ThemeProperties 
                templateStyles={templateStyles} 
                updateTemplateStyles={updateTemplateStyles} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyPanel;
