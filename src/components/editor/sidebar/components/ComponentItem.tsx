
import React, { DragEvent } from "react";
import type { ComponentItem as ComponentItemType } from "@/types/componentLibraryTypes";
import { toast } from "@/components/ui/use-toast";

interface ComponentItemProps {
  item: ComponentItemType;
  categoryId: string;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ item, categoryId }) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (item.isTemplate) {
      // For template components, use a different data type
      e.dataTransfer.setData("application/template-component", JSON.stringify({
        type: item.type,
        name: item.name,
        description: item.description
      }));
    } else {
      // Regular components use the existing data type
      e.dataTransfer.setData("application/component", JSON.stringify({
        name: item.name,
        category: categoryId,
        isTemplate: item.isTemplate,
        type: item.type,
        description: item.description
      }));
    }
    
    e.dataTransfer.effectAllowed = "copy";
    
    // Show visual feedback
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.zIndex = '50';
    }
    
    // Reset the drop overlay after dragging ends
    const resetOverlay = () => {
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.zIndex = '0';
      }
      window.removeEventListener('dragend', resetOverlay);
    };
    
    window.addEventListener('dragend', resetOverlay);
    
    toast({
      title: "Component Ready",
      description: "Drag to canvas to add component"
    });
  };

  const Icon = item.icon;

  return (
    <div 
      className={`flex flex-col px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-grab ${
        item.isTemplate ? 'border-l-2 border-theme-primary/30' : ''
      }`}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex items-center">
        <Icon size={14} className="mr-2 opacity-70" />
        <span className="font-medium">{item.name}</span>
      </div>
      {item.description && (
        <span className="text-xs text-gray-500 mt-1 ml-6">{item.description}</span>
      )}
    </div>
  );
};

export default ComponentItem;
