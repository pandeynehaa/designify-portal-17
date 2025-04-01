
import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface ApplyToAllSitesProps {
  property: string;
  value: any;
  onApply: (property: string, value: any) => void;
}

const ApplyToAllSites: React.FC<ApplyToAllSitesProps> = ({ 
  property, 
  value, 
  onApply 
}) => {
  const handleApplyToAll = () => {
    onApply(property, value);
  };

  const getPropertyName = (prop: string) => {
    return prop
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="mt-4 border-t border-editor-border pt-4">
      <Button 
        onClick={handleApplyToAll}
        variant="outline" 
        size="sm"
        className="w-full text-xs flex items-center justify-center gap-2 bg-editor-surface border-editor-border hover:bg-editor-highlight"
      >
        <Globe size={12} />
        Apply {getPropertyName(property)} to All Sites
      </Button>
    </div>
  );
};

export default ApplyToAllSites;
