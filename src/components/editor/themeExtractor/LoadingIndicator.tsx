
import React from "react";
import { Loader2 } from "lucide-react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="border border-editor-border rounded-md p-4 mb-6">
      <div className="flex items-center justify-center mb-2">
        <Loader2 size={24} className="text-editor-accent animate-spin" />
      </div>
      <p className="text-center text-editor-text text-sm">
        Analyzing website design elements...
      </p>
      <div className="mt-4 space-y-2">
        <div className="ai-processing-animation h-2 rounded-full"></div>
        <div className="ai-processing-animation h-2 rounded-full"></div>
        <div className="ai-processing-animation h-2 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
