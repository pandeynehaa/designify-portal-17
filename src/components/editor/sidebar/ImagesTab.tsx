
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUploadArea from "./image/ImageUploadArea";
import UploadedImagesSection from "./image/UploadedImagesSection";
import StockImagesSection from "./image/StockImagesSection";
import StickersSection from "./image/StickersSection";
import AIImageGenerator from "./image/AIImageGenerator";
import { toast } from "@/components/ui/use-toast";

interface ImagesTabProps {
  extractedImages?: string[];
}

const ImagesTab: React.FC<ImagesTabProps> = ({ extractedImages = [] }) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  const handleImageUpload = () => {
    // In a real implementation, this would open a file dialog
    // For now, we'll simulate adding an image with a toast notification
    toast({
      title: "Upload feature",
      description: "Image upload functionality would be implemented here"
    });
  };
  
  const handleGenerateImage = (imageUrl: string) => {
    setUploadedImages(prev => [...prev, imageUrl]);
    toast({
      title: "Image Generated",
      description: "AI-generated image has been added to your library"
    });
    setShowAIGenerator(false);
  };
  
  return (
    <div className="sidebar-content">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="stickers">Stickers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-0">
          <ImageUploadArea onUpload={handleImageUpload} />
          <UploadedImagesSection extractedImages={extractedImages} />
        </TabsContent>
        
        <TabsContent value="stock" className="mt-0">
          <StockImagesSection />
        </TabsContent>
        
        <TabsContent value="stickers" className="mt-0">
          <StickersSection />
        </TabsContent>
      </Tabs>
      
      {showAIGenerator ? (
        <AIImageGenerator 
          onClose={() => setShowAIGenerator(false)} 
          onGenerate={handleGenerateImage} 
        />
      ) : (
        <div className="mt-4 px-3">
          <button 
            className="w-full py-2 bg-cv-accent hover:bg-cv-accent/80 rounded-md text-white font-medium text-sm flex items-center justify-center"
            onClick={() => setShowAIGenerator(true)}
          >
            <span className="mr-2">✨</span>
            Generate with AI
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagesTab;
