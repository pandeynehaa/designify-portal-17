
import React from "react";
import { Search } from "lucide-react";

interface ComponentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ComponentSearch: React.FC<ComponentSearchProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="px-2 pb-3">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search components..."
          className="w-full py-1.5 pl-9 pr-3 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ComponentSearch;
