
import React from "react";
import { Shield } from "lucide-react";

const TokenGateInfoBox = () => {
  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-3 animate-fade-in">
      <Shield className="h-6 w-6 text-blue-500" />
      <div>
        <h3 className="font-medium text-blue-700">Access Granted!</h3>
        <p className="text-sm text-blue-600">
          Creating token gates gives your community exclusive access to content and features.
          Great for building membership benefits!
        </p>
      </div>
    </div>
  );
};

export default TokenGateInfoBox;
