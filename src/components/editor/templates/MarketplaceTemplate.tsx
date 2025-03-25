
import React from "react";

const MarketplaceTemplate: React.FC = () => (
  <div className="h-full bg-gray-50 flex flex-col">
    <div className="h-16 border-b border-gray-200 flex items-center px-6 bg-white">
      <div className="w-36 h-6 bg-gray-200 rounded-md"></div>
      <div className="ml-auto flex space-x-4">
        <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
    
    <div className="p-6">
      <div className="mb-8">
        <div className="w-64 h-10 bg-gray-200 rounded-md mb-4"></div>
        <div className="w-full h-6 bg-gray-200 rounded-md"></div>
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="w-full h-48 bg-gray-300"></div>
            <div className="p-4">
              <div className="w-3/4 h-5 bg-gray-200 rounded-md mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default MarketplaceTemplate;
