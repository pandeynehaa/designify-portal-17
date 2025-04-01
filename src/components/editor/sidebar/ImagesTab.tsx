
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageUploadArea from "./image/ImageUploadArea";
import UploadedImagesSection from "./image/UploadedImagesSection";
import StockImagesSection from "./image/StockImagesSection";
import StickersSection from "./image/StickersSection";
import AIImageGenerator from "./image/AIImageGenerator";

interface ImagesTabProps {
  extractedImages?: string[];
}

const ImagesTab: React.FC<ImagesTabProps> = ({ extractedImages = [] }) => {
  const [activeTab, setActiveTab] = useState("upload");
  
  return (
    <div className="sidebar-content">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="stickers">Stickers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-0">
          <ImageUploadArea />
          <UploadedImagesSection extractedImages={extractedImages} />
        </TabsContent>
        
        <TabsContent value="stock" className="mt-0">
          <StockImagesSection />
        </TabsContent>
        
        <TabsContent value="stickers" className="mt-0">
          <StickersSection />
        </TabsContent>
      </Tabs>
      
      <AIImageGenerator />
    </div>
  );
};

export default ImagesTab;
