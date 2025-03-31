
import React from "react";
import { Award } from "lucide-react";

const TokenHeader = () => {
  return (
    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
      Token Sale Settings
      <Award className="h-5 w-5 text-amber-500" />
    </h2>
  );
};

export default TokenHeader;
