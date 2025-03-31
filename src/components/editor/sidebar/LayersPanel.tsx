
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCanvasState } from "@/hooks/useCanvasState";
import { useSelectedElement } from "@/hooks/useSelectedElement";
import { Layer } from "@/types/layer";
import { CanvasElement } from "@/types/canvasElement";
import { 
  Layers, Eye, EyeOff, Lock, Unlock, 
  ChevronDown, ChevronRight, Plus, Trash2,
  MoveUp, MoveDown, Edit, Copy, ArrowUp, ArrowDown
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const LayersPanel: React.FC = () => {
  const { 
    layers, 
    droppedElements, 
    addLayer, 
    deleteLayer, 
    updateLayer, 
    moveElementToLayer,
    assignElementToLayer,
    toggleLayerVisibility,
    toggleLayerLock,
    reorderLayer,
    duplicateLayer
  } = useCanvasState();
  
  const { selectedElement, selectElement } = useSelectedElement();
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({});
  
  // Toggle layer expansion
  const toggleLayerExpansion = (layerId: string) => {
    setExpandedLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };
  
  // Get elements belonging to a layer
  const getLayerElements = (layerId: string): CanvasElement[] => {
    return droppedElements.filter(el => el.layerId === layerId);
  };
  
  // Handle creating a new layer
  const handleAddLayer = () => {
    const newLayer = addLayer(`Layer ${layers.length + 1}`);
    toast({
      title: "Layer Created",
      description: `${newLayer.name} has been added`
    });
    
    // Auto-expand the new layer
    setExpandedLayers(prev => ({
      ...prev,
      [newLayer.id]: true
    }));
  };
  
  // Handle selecting an element
  const handleElementSelect = (element: CanvasElement) => {
    selectElement(element);
  };
  
  // Handle selecting a layer
  const handleLayerSelect = (layer: Layer) => {
    // Select the first element in the layer or just focus on the layer
    const layerElements = getLayerElements(layer.id);
    if (layerElements.length > 0) {
      selectElement(layerElements[0]);
    } else {
      // Just visually highlight the layer
      toast({
        title: "Layer Selected",
        description: `${layer.name} is now active`
      });
    }
  };
  
  // Rename layer
  const handleRenameLayer = (layer: Layer) => {
    const newName = prompt("Enter new layer name:", layer.name);
    if (newName && newName.trim() !== "") {
      updateLayer(layer.id, { name: newName.trim() });
      toast({
        title: "Layer Renamed",
        description: `Layer has been renamed to ${newName}`
      });
    }
  };
  
  // Move element to a different layer
  const handleMoveToLayer = (element: CanvasElement, targetLayerId: string) => {
    moveElementToLayer(element.id, targetLayerId);
    toast({
      title: "Element Moved",
      description: "Element has been moved to a different layer"
    });
  };

  if (layers.length === 0) {
    return (
      <div className="p-6 text-center">
        <Layers className="h-10 w-10 mx-auto mb-3 text-cv-purple/50" />
        <h3 className="font-medium text-cv-white mb-2">No Layers Created Yet</h3>
        <p className="text-sm text-cv-white/60 mb-4">
          Layers help you organize elements on your canvas
        </p>
        <Button 
          onClick={handleAddLayer}
          className="bg-cv-purple hover:bg-cv-purple/80"
        >
          <Plus size={14} className="mr-1" /> Add First Layer
        </Button>
      </div>
    );
  }

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-cv-white uppercase">Layers</h3>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={handleAddLayer}
          className="h-7 px-2 text-cv-white"
        >
          <Plus size={14} className="mr-1" /> Add Layer
        </Button>
      </div>
      
      <ScrollArea className="flex-1 pr-3">
        <div className="space-y-2">
          {layers.map((layer) => (
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
                  <div className="pl-6 pr-2 py-1 space-y-1 border-t border-cv-lightgray/20">
                    {getLayerElements(layer.id).length > 0 ? (
                      getLayerElements(layer.id).map((element) => (
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
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="mt-3 pt-3 border-t border-cv-lightgray/20 text-xs text-center text-cv-white/40">
        Layers help you organize your canvas elements
      </div>
    </div>
  );
};

export default LayersPanel;
