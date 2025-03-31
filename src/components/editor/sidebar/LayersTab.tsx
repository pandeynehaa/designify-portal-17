
import React from "react";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { CanvasElement } from "../../../types/canvasElement";
import { ChevronDown, ChevronRight, Eye, EyeOff, Layers as LayersIcon } from "lucide-react";
import { useCanvasState } from "../../../hooks/useCanvasState";
import { toast } from "@/components/ui/use-toast";

const LayersTab: React.FC = () => {
  const { droppedElements, updateElement } = useCanvasState();
  const { selectedElement, selectElement } = useSelectedElement();

  const handleLayerClick = (element: CanvasElement) => {
    selectElement(element);
    toast({
      title: "Layer Selected",
      description: `Selected ${element.type}: ${element.content || element.id}`
    });
  };

  const toggleVisibility = (e: React.MouseEvent, element: CanvasElement) => {
    e.stopPropagation();
    // For now, we'll just show a toast since we don't have a visibility property yet
    toast({
      title: "Toggle Visibility",
      description: `${element.type} visibility toggled`
    });
  };

  const groupedElements = {
    components: droppedElements.filter(el => el.type === 'component'),
    images: droppedElements.filter(el => el.type === 'image')
  };

  if (droppedElements.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-cv-white/70">
        <LayersIcon className="mx-auto mb-2 h-10 w-10 opacity-50" />
        <p>No elements on canvas yet.</p>
        <p className="mt-2 text-xs">Add elements using the Insert menu or drag from Components/Images panel.</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-2 text-cv-white">
      <div className="flex items-center justify-between">
        <h3 className="text-xs uppercase font-medium text-cv-white/70 px-2">Layers</h3>
        <div className="flex space-x-1">
          <button className="p-1 hover:bg-cv-lightgray rounded" title="Expand All">
            <ChevronDown size={14} />
          </button>
          <button className="p-1 hover:bg-cv-lightgray rounded" title="Collapse All">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(groupedElements).map(([groupType, elements]) => (
          elements.length > 0 && (
            <div key={groupType} className="space-y-1">
              <div className="flex items-center gap-1 px-2 py-1 text-xs uppercase font-medium text-cv-white/70">
                <ChevronDown size={14} />
                <span>{groupType}</span>
                <span className="text-cv-white/50">({elements.length})</span>
              </div>
              
              <div className="pl-4 space-y-1">
                {elements.map((element) => (
                  <div
                    key={element.id}
                    onClick={() => handleLayerClick(element)}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer text-sm ${
                      selectedElement?.id === element.id 
                        ? "bg-cv-accent" 
                        : "hover:bg-cv-lightgray"
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="truncate">{element.content || element.id}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => toggleVisibility(e, element)}
                        className="p-1 hover:bg-cv-gray/50 rounded"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default LayersTab;
