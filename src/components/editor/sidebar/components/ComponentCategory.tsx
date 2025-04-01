
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ComponentCategory as ComponentCategoryType } from "@/types/componentLibraryTypes";
import ComponentItem from "./ComponentItem";

interface ComponentCategoryProps {
  category: ComponentCategoryType;
  isExpanded: boolean;
  onToggle: (categoryId: string) => void;
}

const ComponentCategory: React.FC<ComponentCategoryProps> = ({
  category,
  isExpanded,
  onToggle
}) => {
  return (
    <div key={category.id} className="mb-3">
      <button 
        className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
        onClick={() => onToggle(category.id)}
      >
        <span>{category.label}</span>
        {isExpanded ? (
          <ChevronDown size={14} />
        ) : (
          <ChevronRight size={14} />
        )}
      </button>
      
      {isExpanded && (
        <div className="ml-2 pl-2 border-l border-gray-200 mt-1">
          {category.items.map((item, index) => (
            <ComponentItem 
              key={index} 
              item={item} 
              categoryId={category.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentCategory;
