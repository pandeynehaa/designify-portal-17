
import React from "react";
import { Globe, Wand2, Loader2 } from "lucide-react";

interface URLInputProps {
  url: string;
  setUrl: (url: string) => void;
  error: string | null;
  extracting: boolean;
  handleExtract: () => void;
}

const URLInput: React.FC<URLInputProps> = ({ 
  url, 
  setUrl, 
  error, 
  extracting, 
  handleExtract 
}) => {
  return (
    <div className="mb-6">
      <p className="text-editor-text text-sm mb-4">
        Enter a website URL to extract its design elements. Our AI will analyze the site and create a theme based on its colors, typography, spacing, and images.
      </p>
      
      <div className="flex">
        <div className="flex-1 flex items-center bg-editor-surface border border-editor-border rounded-l-md px-3">
          <Globe size={16} className="text-editor-muted mr-2" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 bg-transparent border-none text-editor-text py-2 focus:outline-none text-sm"
          />
        </div>
        <button
          className="editor-button-primary rounded-l-none px-4 flex items-center"
          onClick={handleExtract}
          disabled={!url || extracting}
        >
          {extracting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Extracting...
            </>
          ) : (
            <>
              <Wand2 size={16} className="mr-2" />
              Extract
            </>
          )}
        </button>
      </div>
      
      {error && (
        <div className="mt-2 text-red-500 text-xs">
          {error}
        </div>
      )}
    </div>
  );
};

export default URLInput;
