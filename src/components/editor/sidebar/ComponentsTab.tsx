
import React, { useState } from "react";
import { componentCategories } from "@/data/componentLibraryData";
import ComponentSearch from "./components/ComponentSearch";
import ComponentCategory from "./components/ComponentCategory";

const ComponentsTab: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["web3", "ui"]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };
  
  // Filter components based on search query
  const filteredCategories = componentCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="p-2 border-t border-gray-200">
      <ComponentSearch 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      {filteredCategories.map((category) => (
        <ComponentCategory
          key={category.id}
          category={category}
          isExpanded={expandedCategories.includes(category.id)}
          onToggle={toggleCategory}
        />
      ))}
    </div>
  );
};

export default ComponentsTab;
