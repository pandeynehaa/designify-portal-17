
import React from "react";
import { Copy, CopyCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

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
  const [isApplying, setIsApplying] = useState(false);
  
  const handleApply = () => {
    setIsApplying(true);
    onApply(property, value);
    
    // Show success animation briefly
    setTimeout(() => {
      setIsApplying(false);
    }, 1500);
  };

  return (
    <div className="border-t border-editor-border pt-4 mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-editor-muted">Apply to All Web3 Sites</span>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        className="w-full text-xs border-cv-purple text-cv-purple hover:bg-cv-purple hover:text-white"
        onClick={handleApply}
      >
        {isApplying ? (
          <>
            <CopyCheck size={14} className="mr-1.5" />
            Applied to All Sites
          </>
        ) : (
          <>
            <Copy size={14} className="mr-1.5" />
            Apply to All Web3 Sites
          </>
        )}
      </Button>
    </div>
  );
};

export default ApplyToAllSites;
