
import React from "react";
import { Search, Filter, ArrowUpDown, Grid, List } from "lucide-react";

interface SearchFilterProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ view, setView }) => {
  return (
    <div className="bg-card border border-border/60 rounded-lg shadow-subtle mb-8">
      <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search themes..."
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
          />
        </div>
        
        <div className="flex space-x-2">
          <button className="px-3 py-2 border border-border rounded-md flex items-center text-sm hover:bg-muted transition-colors">
            <Filter size={14} className="mr-2" />
            Filter
          </button>
          <button className="px-3 py-2 border border-border rounded-md flex items-center text-sm hover:bg-muted transition-colors">
            <ArrowUpDown size={14} className="mr-2" />
            Sort
          </button>
          <div className="flex border border-border rounded-md overflow-hidden">
            <button 
              className={`p-2 flex items-center justify-center ${view === "grid" ? "bg-muted" : "hover:bg-muted"} transition-colors`}
              onClick={() => setView("grid")}
            >
              <Grid size={16} />
            </button>
            <button 
              className={`p-2 flex items-center justify-center ${view === "list" ? "bg-muted" : "hover:bg-muted"} transition-colors`}
              onClick={() => setView("list")}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
