
import React from "react";
import { Layer } from "@/types/layer";
import { CanvasElement } from "@/types/canvasElement";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useCanvasState } from "@/hooks/useCanvasState";

interface LayerElementListProps {
  elements: CanvasElement[];
  selectedElement: CanvasElement | null;
  layer: Layer;
  handleElementSelect: (element: CanvasElement) => void;
  handleMoveToLayer: (element: CanvasElement, targetLayerId: string) => void;
}

const LayerElementList: React.FC<LayerElementListProps> = ({
  elements,
  selectedElement,
  layer,
  handleElementSelect,
  handleMoveToLayer
}) => {
  // Get all layers to populate the dropdown
  const { layers } = useCanvasState();

  return (
    <div className="pl-6 pr-2 py-1 space-y-1 border-t border-cv-lightgray/20">
      {elements.length > 0 ? (
        elements.map((element) => (
          <div 
            key={element.id}
            className={cn(
              "flex items-center justify-between py-1 px-2 rounded text-xs",
              selectedElement?.id === element.id 
                ? "bg-cv-purple/30 text-white" 
                : "hover:bg-cv-lightgray/20"
            )}
            onClick={() => handleElementSelect(element)}
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="truncate max-w-[120px]">
                {element.type === 'component' && element.content 
                  ? element.content.substring(0, 15) 
                  : element.type}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 rounded hover:bg-cv-lightgray/30">
                    <ArrowUp size={12} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-cv-gray border-cv-lightgray text-cv-white">
                  {layers
                    .filter(l => l.id !== layer.id)
                    .map(targetLayer => (
                      <DropdownMenuItem 
                        key={targetLayer.id}
                        onClick={() => handleMoveToLayer(element, targetLayer.id)}
                        className="text-xs cursor-pointer hover:bg-cv-lightgray/20"
                      >
                        Move to {targetLayer.name}
                      </DropdownMenuItem>
                    ))
                  }
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      ) : (
        <div className="text-xs text-cv-white/40 py-2 text-center">
          No elements in this layer
        </div>
      )}
    </div>
  );
};

export default LayerElementList;
