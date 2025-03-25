
import React from "react";

const BuyCoinTemplate: React.FC = () => (
  <div className="h-full bg-gray-50 flex flex-col">
    <div className="h-16 border-b border-gray-200 flex items-center px-6 bg-white">
      <div className="w-36 h-6 bg-gray-200 rounded-md"></div>
      <div className="ml-auto flex space-x-4">
        <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
    
    <div className="flex flex-col items-center justify-center flex-1 p-8">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
        </div>
        <div className="w-48 h-8 bg-gray-200 rounded-md mx-auto mb-2"></div>
        <div className="w-64 h-4 bg-gray-200 rounded-md mx-auto"></div>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="w-1/2 h-6 bg-gray-200 rounded-md mb-4"></div>
        <div className="w-full h-12 bg-gray-100 rounded-md mb-6"></div>
        
        <div className="mb-6">
          <div className="w-full h-6 bg-gray-200 rounded-md mb-2"></div>
          <div className="w-full h-6 bg-gray-200 rounded-md"></div>
        </div>
        
        <div className="w-full h-12 bg-blue-600 rounded-md"></div>
      </div>
    </div>
  </div>
);

export default BuyCoinTemplate;
