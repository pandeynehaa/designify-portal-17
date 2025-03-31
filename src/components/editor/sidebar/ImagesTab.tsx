
import React, { useState } from "react";
import { Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import AIImageGenerator from "./image/AIImageGenerator";
import StockImagesSection from "./image/StockImagesSection";
import StickersSection from "./image/StickersSection";
import SavedImagesSection from "./image/SavedImagesSection";
import UploadedImagesSection from "./image/UploadedImagesSection";
import ImageUploadArea from "./image/ImageUploadArea";

const ImagesTab: React.FC = () => {
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  const handleImageUpload = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        // Here you would typically upload these files to a server
        // For now, we'll just show a toast message
        toast({
          title: "Images Uploaded",
          description: `${target.files.length} image(s) have been added to your uploaded images.`
        });
      }
    };
    
    input.click();
  };

  return (
    <div className="p-2 h-full flex flex-col">
      <div className="mb-3 flex justify-between items-center">
        <h3 className="text-sm font-medium text-cv-white">Images</h3>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0 text-cv-white"
            onClick={() => setShowAIGenerator(true)}
            title="Generate with AI"
          >
            <Sparkles size={14} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0 text-cv-white"
            onClick={handleImageUpload}
            title="Upload Images"
          >
            <Upload size={14} />
          </Button>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1">
        <StockImagesSection />
        <StickersSection />
        <SavedImagesSection />
        <UploadedImagesSection />
      </div>
      
      <ImageUploadArea onUpload={handleImageUpload} />
      
      {showAIGenerator && (
        <AIImageGenerator 
          onClose={() => setShowAIGenerator(false)} 
          onGenerate={(imageUrl) => {
            toast({
              title: "AI Image Generated",
              description: "Your AI-generated image is ready to use!"
            });
            setShowAIGenerator(false);
          }}
        />
      )}
    </div>
  );
};

export default ImagesTab;
