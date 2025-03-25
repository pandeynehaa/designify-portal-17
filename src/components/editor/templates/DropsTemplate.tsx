
import React from "react";

const DropsTemplate: React.FC = () => (
  <div className="h-full bg-gray-900 flex flex-col">
    <div className="h-16 border-b border-gray-800 flex items-center px-6 bg-gray-800">
      <div className="w-36 h-6 bg-gray-700 rounded-md"></div>
      <div className="ml-auto flex space-x-4">
        <div className="w-20 h-6 bg-gray-700 rounded-md"></div>
        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      </div>
    </div>
    
    <div className="flex-1 flex">
      <div className="w-1/2 p-8">
        <div className="mb-6">
          <div className="w-3/4 h-10 bg-gray-800 rounded-md mb-4"></div>
          <div className="w-full h-5 bg-gray-800 rounded-md mb-2"></div>
          <div className="w-full h-5 bg-gray-800 rounded-md"></div>
        </div>
        
        <div className="w-full h-12 bg-blue-600 rounded-md mb-4"></div>
        <div className="w-full h-12 bg-gray-800 rounded-md"></div>
      </div>
      
      <div className="w-1/2 p-8 flex justify-center items-center">
        <div className="w-full h-[400px] bg-gray-800 rounded-md"></div>
      </div>
    </div>
  </div>
);

export default DropsTemplate;
