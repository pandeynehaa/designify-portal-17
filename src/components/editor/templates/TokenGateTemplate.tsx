
import React from "react";

const TokenGateTemplate: React.FC = () => (
  <div className="h-full bg-gray-100 flex items-center justify-center p-8">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
      <div className="h-20 bg-gray-800 flex items-center justify-center">
        <div className="w-36 h-8 bg-gray-700 rounded-md"></div>
      </div>
      
      <div className="p-6">
        <div className="w-full h-8 bg-gray-200 rounded-md mb-6"></div>
        
        <div className="space-y-4 mb-6">
          <div className="w-full h-6 bg-gray-200 rounded-md"></div>
          <div className="w-3/4 h-6 bg-gray-200 rounded-md"></div>
        </div>
        
        <div className="w-full h-12 bg-blue-600 rounded-md"></div>
      </div>
    </div>
  </div>
);

export default TokenGateTemplate;
