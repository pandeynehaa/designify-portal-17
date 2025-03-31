
import React from "react";
import { Shield } from "lucide-react";

const TokenGateHeader = () => {
  return (
    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      Token Gate Settings
      <Shield className="h-5 w-5 text-blue-500" />
    </h2>
  );
};

export default TokenGateHeader;
