
import React from "react";
import { CanvasElement } from "@/types/canvasElement";
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface LayerGroupItemProps {
  groupType: string;
  elements: CanvasElement[];
  expandedGroups: { [key: string]: boolean };
  toggleGroup: (group: string) => void;
  selectedElement: CanvasElement | null;
  handleLayerClick: (element: CanvasElement) => void;
  toggleVisibility: (e: React.MouseEvent, element: CanvasElement) => void;
  moveLayer: (element: CanvasElement, direction: 'up' | 'down') => void;
  handleDuplicateLayer: (e: React.MouseEvent, element: CanvasElement) => void;
  handleDeleteLayer: (e: React.MouseEvent, element: CanvasElement) => void;
  getElementName: (element: CanvasElement) => string;
}

const LayerGroupItem: React.FC<LayerGroupItemProps> = ({
  groupType,
  elements,
  expandedGroups,
  toggleGroup,
  selectedElement,
  handleLayerClick,
  toggleVisibility,
  moveLayer,
  handleDuplicateLayer,
  handleDeleteLayer,
  getElementName
}) => {
  if (elements.length === 0) return null;
  
  return (
    <Collapsible 
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
  );
};

export default LayerGroupItem;
