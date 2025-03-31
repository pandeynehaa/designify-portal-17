
import React, { useState } from "react";
import { Layer } from "@/types/layer";
import { CanvasElement } from "@/types/canvasElement";
import { 
  ChevronDown, ChevronRight, Eye, EyeOff, Lock, 
  Unlock, Edit
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import LayerElementList from "./LayerElementList";

interface LayerItemProps {
  layer: Layer;
  selectedElement: CanvasElement | null;
  getLayerElements: (layerId: string) => CanvasElement[];
  expandedLayers: Record<string, boolean>;
  toggleLayerExpansion: (layerId: string) => void;
  handleLayerSelect: (layer: Layer) => void;
  handleRenameLayer: (layer: Layer) => void;
  reorderLayer: (layerId: string, direction: 'up' | 'down') => void;
  duplicateLayer: (layerId: string) => void;
  deleteLayer: (layerId: string) => void;
  toggleLayerVisibility: (layerId: string) => void;
  toggleLayerLock: (layerId: string) => void;
  handleMoveToLayer: (element: CanvasElement, targetLayerId: string) => void;
  handleElementSelect: (element: CanvasElement) => void;
}

const LayerItem: React.FC<LayerItemProps> = ({
  layer,
  selectedElement,
  getLayerElements,
  expandedLayers,
  toggleLayerExpansion,
  handleLayerSelect,
  handleRenameLayer,
  reorderLayer,
  duplicateLayer,
  deleteLayer,
  toggleLayerVisibility,
  toggleLayerLock,
  handleMoveToLayer,
  handleElementSelect
}) => {
  return (
    <div key={layer.id} className="rounded-md overflow-hidden bg-cv-lightgray/10">
      <div 
        className={cn(
          "flex items-center justify-between p-2 cursor-pointer",
          "border-l-2 transition-colors",
          selectedElement?.layerId === layer.id 
            ? "border-l-cv-purple bg-cv-purple/20" 
            : "border-l-transparent hover:bg-cv-lightgray/20"
        )}
        onClick={() => handleLayerSelect(layer)}
      >
        <div className="flex items-center space-x-1">
          <CollapsibleTrigger
            onClick={(e) => {
              e.stopPropagation();
              toggleLayerExpansion(layer.id);
            }}
            className="p-1 rounded hover:bg-cv-lightgray/20"
          >
            {expandedLayers[layer.id] ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </CollapsibleTrigger>
          
          <span className="font-medium text-sm">{layer.name}</span>
          {!layer.visible && (
            <span className="text-xs text-cv-white/40">(hidden)</span>
          )}
          {layer.locked && (
            <span className="text-xs text-cv-white/40">(locked)</span>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleLayerVisibility(layer.id);
            }}
            className="p-1 rounded hover:bg-cv-lightgray/20"
            title={layer.visible ? "Hide Layer" : "Show Layer"}
          >
            {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleLayerLock(layer.id);
            }}
            className="p-1 rounded hover:bg-cv-lightgray/20"
            title={layer.locked ? "Unlock Layer" : "Lock Layer"}
          >
            {layer.locked ? <Lock size={14} /> : <Unlock size={14} />}
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded hover:bg-cv-lightgray/20"
              >
                <Edit size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-cv-gray border-cv-lightgray text-cv-white">
              <DropdownMenuItem 
                onClick={() => handleRenameLayer(layer)}
                className="text-xs cursor-pointer hover:bg-cv-lightgray/20"
              >
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => duplicateLayer(layer.id)}
                className="text-xs cursor-pointer hover:bg-cv-lightgray/20"
              >
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => reorderLayer(layer.id, 'up')}
                className="text-xs cursor-pointer hover:bg-cv-lightgray/20"
              >
                Move Up
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => reorderLayer(layer.id, 'down')}
                className="text-xs cursor-pointer hover:bg-cv-lightgray/20"
              >
                Move Down
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  if (getLayerElements(layer.id).length > 0) {
                    toast({
                      title: "Cannot Delete",
                      description: "Remove all elements from this layer first",
                      variant: "destructive"
                    });
                  } else {
                    deleteLayer(layer.id);
                    toast({
                      title: "Layer Deleted",
                      description: `${layer.name} has been removed`
                    });
                  }
                }}
                className="text-xs cursor-pointer text-red-500 hover:bg-red-500/20 hover:text-red-300"
              >
                Delete Layer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Collapsible open={expandedLayers[layer.id]}>
        <CollapsibleContent>
          <LayerElementList 
            elements={getLayerElements(layer.id)}
            selectedElement={selectedElement}
            layer={layer}
            handleElementSelect={handleElementSelect}
            handleMoveToLayer={handleMoveToLayer}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default LayerItem;
