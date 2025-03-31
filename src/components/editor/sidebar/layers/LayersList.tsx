
import React from "react";
import { Layer } from "@/types/layer";
import { CanvasElement } from "@/types/canvasElement";
import { ScrollArea } from "@/components/ui/scroll-area";
import LayerItem from "./LayerItem";

interface LayersListProps {
  layers: Layer[];
  droppedElements: CanvasElement[];
  selectedElement: CanvasElement | null;
  expandedLayers: Record<string, boolean>;
  toggleLayerExpansion: (layerId: string) => void;
  handleLayerSelect: (layer: Layer) => void;
  handleElementSelect: (element: CanvasElement) => void;
  handleRenameLayer: (layer: Layer) => void;
  handleMoveToLayer: (element: CanvasElement, targetLayerId: string) => void;
  reorderLayer: (layerId: string, direction: 'up' | 'down') => void;
  duplicateLayer: (layerId: string) => void;
  deleteLayer: (layerId: string) => void;
  toggleLayerVisibility: (layerId: string) => void;
  toggleLayerLock: (layerId: string) => void;
  getLayerElements: (layerId: string) => CanvasElement[];
}

const LayersList: React.FC<LayersListProps> = ({
  layers,
  selectedElement,
  expandedLayers,
  toggleLayerExpansion,
  handleLayerSelect,
  handleElementSelect,
  handleRenameLayer,
  handleMoveToLayer,
  reorderLayer,
  duplicateLayer,
  deleteLayer,
  toggleLayerVisibility,
  toggleLayerLock,
  getLayerElements
}) => {
  return (
    <ScrollArea className="flex-1 pr-3">
      <div className="space-y-2">
        {layers.map((layer) => (
          <LayerItem
            key={layer.id}
            layer={layer}
            selectedElement={selectedElement}
            getLayerElements={getLayerElements}
            expandedLayers={expandedLayers}
            toggleLayerExpansion={toggleLayerExpansion}
            handleLayerSelect={handleLayerSelect}
            handleRenameLayer={handleRenameLayer}
            reorderLayer={reorderLayer}
            duplicateLayer={duplicateLayer}
            deleteLayer={deleteLayer}
            toggleLayerVisibility={toggleLayerVisibility}
            toggleLayerLock={toggleLayerLock}
            handleMoveToLayer={handleMoveToLayer}
            handleElementSelect={handleElementSelect}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default LayersList;
