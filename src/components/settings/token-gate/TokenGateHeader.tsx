
import React from "react";
import { Shield, CheckCircle } from "lucide-react";

const TokenGateHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        Token Gate Settings
        <Shield className="h-5 w-5 text-blue-500" />
      </h2>
    </div>
  );
};

export default TokenGateHeader;
