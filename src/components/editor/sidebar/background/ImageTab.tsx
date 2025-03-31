
import React from "react";
import { Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ImageTabProps {
  onImageUpload: () => void;
}

const ImageTab: React.FC<ImageTabProps> = ({ onImageUpload }) => {
  const handleUploadImage = () => {
    onImageUpload();
    toast({
      title: "Upload Background",
      description: "Image upload feature will be available soon"
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-cv-lightgray rounded-md p-6 mb-4">
        <Upload size={24} className="text-cv-white mb-2" />
        <p className="text-sm text-cv-white mb-2">Upload Background Image</p>
        <p className="text-xs text-cv-lightgray mb-4">PNG, JPG, WEBP up to 5MB</p>
        <button 
          className="px-4 py-2 bg-cv-purple rounded-md text-white text-sm hover:bg-cv-accent transition-colors"
          onClick={handleUploadImage}
        >
          Choose File
        </button>
      </div>
      
      <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
        <label className="block text-xs text-cv-white mb-1">Image URL</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            className="flex-1 bg-cv-gray border border-cv-lightgray rounded px-2 py-1 text-sm text-cv-white"
          />
          <button 
            className="px-2 py-1 bg-cv-accent rounded text-white text-xs"
            onClick={() => toast({
              title: "URL Added",
              description: "Background image from URL has been applied"
            })}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageTab;
