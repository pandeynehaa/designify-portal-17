
import React from "react";
import { Shield, CheckCircle } from "lucide-react";

const TokenGateHeader = () => {
  return (
    <div className="relative flex justify-between items-center mb-8 p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold flex items-center gap-3 text-white text-shadow">
        <div className="bg-blue-500/80 backdrop-blur-sm p-2 rounded-full shadow-inner flex items-center justify-center">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <span className="tracking-tight">Token Gate Settings</span>
      </h2>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl -z-10"></div>
    </div>
  );
};

export default TokenGateHeader;
