
import React, { useState } from "react";
import { useSelectedElement } from "../../../hooks/useSelectedElement";
import { CanvasElement } from "../../../types/canvasElement";
import { 
  ChevronDown, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  Layers as LayersIcon,
  Move,
  Trash2,
  Copy,
  Edit
} from "lucide-react";
import { useCanvasState } from "../../../hooks/useCanvasState";
import { toast } from "@/components/ui/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const LayersTab: React.FC = () => {
  const { droppedElements, updateElement, deleteElement, duplicateElement } = useCanvasState();
  const { selectedElement, selectElement } = useSelectedElement();
  
  // State to track which element type groups are expanded
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
    components: true,
    images: true,
    nft: true
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const handleLayerClick = (element: CanvasElement) => {
    selectElement(element);
    toast({
      title: "Layer Selected",
      description: `Selected ${element.type} layer`
    });
  };

  const toggleVisibility = (e: React.MouseEvent, element: CanvasElement) => {
    e.stopPropagation();
    
    // Update the visibility of the element
    updateElement(element.id, { 
      visible: element.visible === false ? true : false 
    });
    
    toast({
      title: element.visible === false ? "Layer Shown" : "Layer Hidden",
      description: `${element.type} layer is now ${element.visible === false ? "visible" : "hidden"}`
    });
  };
  
  const handleDeleteLayer = (e: React.MouseEvent, element: CanvasElement) => {
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete this ${element.type}?`)) {
      deleteElement(element.id);
      
      // If the deleted element was selected, clear the selection
      if (selectedElement?.id === element.id) {
        selectElement(null);
      }
    }
  };
  
  const handleDuplicateLayer = (e: React.MouseEvent, element: CanvasElement) => {
    e.stopPropagation();
    duplicateElement(element.id);
  };
  
  const moveLayer = (element: CanvasElement, direction: 'up' | 'down') => {
    // Find current index of the element
    const currentIndex = droppedElements.findIndex(el => el.id === element.id);
    
    // Calculate new zIndex
    const currentZIndex = element.zIndex || 0;
    const newZIndex = direction === 'up' ? currentZIndex + 1 : currentZIndex - 1;
    
    // Update the element's zIndex
    updateElement(element.id, { zIndex: newZIndex });
    
    toast({
      title: "Layer Moved",
      description: `${element.type} layer moved ${direction}`
    });
  };

  // Group elements by type
  const groupedElements = {
    components: droppedElements.filter(el => el.type === 'component'),
    images: droppedElements.filter(el => el.type === 'image'),
    nft: droppedElements.filter(el => el.type === 'nft')
  };

  // Get display name for an element
  const getElementName = (element: CanvasElement): string => {
    if (element.type === 'nft' && element.nftData?.name) {
      return element.nftData.name;
    }
    
    if (element.content) {
      // For text content, limit to first 15 chars
      if (element.type === 'component') {
        return element.content.substring(0, 15) + (element.content.length > 15 ? "..." : "");
      }
      return element.content.split('/').pop() || element.id;
    }
    
    return `${element.type}-${element.id.split('-').pop()}`;
  };

  if (droppedElements.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-cv-white/70 flex flex-col items-center">
        <LayersIcon className="mx-auto mb-3 h-12 w-12 opacity-50" />
        <p className="font-medium">No layers on canvas yet</p>
        <p className="mt-2 text-xs">Add elements using the Insert menu or drag items from the panels</p>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-3 text-cv-white">
      <div className="flex items-center justify-between">
        <h3 className="text-sm uppercase font-medium text-cv-white/90 px-2">Layers</h3>
        <div className="text-xs bg-cv-lightgray/30 px-2 py-1 rounded">
          {droppedElements.length} {droppedElements.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      <div className="bg-cv-gray/30 rounded-lg shadow-inner p-2 space-y-2">
        {Object.entries(groupedElements).map(([groupType, elements]) => (
          elements.length > 0 && (
            <Collapsible 
              key={groupType} 
              open={expandedGroups[groupType]} 
              onOpenChange={() => toggleGroup(groupType)}
              className="space-y-1"
            >
              <CollapsibleTrigger className="flex items-center gap-1.5 px-2 py-1.5 w-full text-cv-white/90 text-sm rounded hover:bg-cv-lightgray/30">
                {expandedGroups[groupType] ? (
                  <ChevronDown size={16} className="text-cv-white/70" />
                ) : (
                  <ChevronRight size={16} className="text-cv-white/70" />
                )}
                <span className="capitalize">{groupType}</span>
                <span className="text-cv-white/50 ml-1">({elements.length})</span>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="pl-2 space-y-1 overflow-hidden">
                {elements.map((element) => (
                  <div
                    key={element.id}
                    onClick={() => handleLayerClick(element)}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer text-sm transition-colors ${
                      selectedElement?.id === element.id 
                        ? "bg-cv-accent text-white" 
                        : "hover:bg-cv-lightgray/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {/* Element type icon */}
                      {element.type === 'component' && <Edit size={14} />}
                      {element.type === 'image' && <img src="/placeholder.svg" className="w-3.5 h-3.5" />}
                      {element.type === 'nft' && <LayersIcon size={14} />}
                      
                      {/* Element name */}
                      <span className="truncate max-w-[120px]">{getElementName(element)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {/* Layer actions */}
                      <button
                        onClick={(e) => {e.stopPropagation(); moveLayer(element, 'up')}}
                        className="p-1 hover:bg-cv-gray/50 rounded opacity-70 hover:opacity-100"
                        title="Move Up"
                      >
                        <Move size={14} className="transform rotate-180" />
                      </button>
                      
                      <button
                        onClick={(e) => {e.stopPropagation(); moveLayer(element, 'down')}}
                        className="p-1 hover:bg-cv-gray/50 rounded opacity-70 hover:opacity-100"
                        title="Move Down"
                      >
                        <Move size={14} />
                      </button>
                      
                      <button
                        onClick={(e) => toggleVisibility(e, element)}
                        className="p-1 hover:bg-cv-gray/50 rounded opacity-70 hover:opacity-100"
                        title={element.visible === false ? "Show" : "Hide"}
                      >
                        {element.visible === false ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </button>
                      
                      <button
                        onClick={(e) => handleDuplicateLayer(e, element)}
                        className="p-1 hover:bg-cv-gray/50 rounded opacity-70 hover:opacity-100"
                        title="Duplicate"
                      >
                        <Copy size={14} />
                      </button>
                      
                      <button
                        onClick={(e) => handleDeleteLayer(e, element)}
                        className="p-1 hover:bg-cv-gray/50 rounded opacity-70 hover:opacity-100"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )
        ))}
      </div>
      
      <div className="p-2 text-xs text-center text-cv-white/50 italic">
        Tip: Click on a layer to select it, or use the buttons to make changes
      </div>
    </div>
  );
};

export default LayersTab;
