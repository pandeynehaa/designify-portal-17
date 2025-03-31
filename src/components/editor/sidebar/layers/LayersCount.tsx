
import React from "react";

interface LayersCountProps {
  count: number;
}

const LayersCount: React.FC<LayersCountProps> = ({ count }) => {
  return (
    <div className="text-xs bg-cv-lightgray/30 px-2 py-1 rounded">
      {count} {count === 1 ? 'item' : 'items'}
    </div>
  );
};

export default LayersCount;
