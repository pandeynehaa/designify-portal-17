
import React from "react";
import { Eye, Share2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ZoomControlsProps {
  handleEyeClick?: () => void;
  handleShareClick?: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  handleEyeClick,
  handleShareClick
}) => {
  const handleDefaultEyeClick = () => {
    toast({
      title: "Preview Mode",
      description: "Previewing the design at actual size"
    });
  };
  
  const handleDefaultShareClick = () => {
    toast({
      title: "Share Design",
      description: "Sharing options will be available soon"
    });
  };

  return (
    <div className="flex items-center space-x-3">
      <button className="p-1.5 hover:bg-editor-surface rounded-md toolbar-button-hover" 
        onClick={handleEyeClick || handleDefaultEyeClick}>
        <Eye size={16} className="text-editor-text" />
      </button>
      <button className="p-1.5 hover:bg-editor-surface rounded-md toolbar-button-hover" 
        onClick={handleShareClick || handleDefaultShareClick}>
        <Share2 size={16} className="text-editor-text" />
      </button>
    </div>
  );
};

export default ZoomControls;
