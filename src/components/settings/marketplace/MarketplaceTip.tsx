
import React from "react";
import { Trophy } from "lucide-react";

const MarketplaceTip = () => {
  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-3 animate-fade-in">
      <Trophy className="h-6 w-6 text-blue-500" />
      <div>
        <h3 className="font-medium text-blue-700">Pro Tip!</h3>
        <p className="text-sm text-blue-600">
          Setting appropriate marketplace fees helps balance revenue and user adoption. 
          Most successful marketplaces charge between 2-5%.
        </p>
      </div>
    </div>
  );
};

export default MarketplaceTip;
