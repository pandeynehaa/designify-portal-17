
import React from "react";
import { Pencil, Trash2, Copy, Move } from "lucide-react";

const ElementControls: React.FC = () => {
  return (
    <div className="canvas-element-controls">
      <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
        <Move size={12} />
      </button>
      <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
        <Pencil size={12} />
      </button>
      <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
        <Copy size={12} />
      </button>
      <button className="p-1 bg-cv-darkgray text-cv-white hover:bg-cv-accent transition-colors rounded">
        <Trash2 size={12} />
      </button>
    </div>
  );
};

export default ElementControls;
