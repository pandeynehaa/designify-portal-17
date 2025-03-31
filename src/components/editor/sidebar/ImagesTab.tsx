
import React, { useState, DragEvent } from "react";
import { ChevronDown, ChevronRight, Upload, FolderOpen, Sparkles, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import AIImageGenerator from "./image/AIImageGenerator";

const ImagesTab: React.FC = () => {
  const [stockImagesExpanded, setStockImagesExpanded] = useState(true);
  const [savedImagesExpanded, setSavedImagesExpanded] = useState(true);
  const [uploadedImagesExpanded, setUploadedImagesExpanded] = useState(true);
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  // Sample images for the Images tab
  const sampleImages = [
    { id: "img1", url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300", label: "Woman with Laptop" },
    { id: "img2", url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300", label: "Laptop Screen" },
    { id: "img3", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300", label: "Circuit Board" },
    { id: "img4", url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300", label: "Code Screen" },
    { id: "img5", url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300", label: "MacBook User" },
  ];

  // Sample saved images (could be fetched from an API in a real app)
  const savedImages = [
    { id: "saved1", url: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=300", label: "Saved Image 1" },
    { id: "saved2", url: "https://images.unsplash.com/photo-1639322537234-e7895e08a659?w=300", label: "Saved Image 2" },
  ];

  // Sample uploaded images (could be stored in local storage or fetched from an API)
  const uploadedImages = [
    { id: "uploaded1", url: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300", label: "Uploaded Image 1" },
  ];

  // Handle dragging of images
  const handleImageDragStart = (e: DragEvent<HTMLDivElement>, image: any) => {
    e.dataTransfer.setData("application/image", JSON.stringify(image));
    e.dataTransfer.effectAllowed = "copy";
    
    // Show visual feedback
    const overlay = document.getElementById('dropOverlay');
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.zIndex = '50';
    }
    
    // Reset the drop overlay after dragging ends
    const resetOverlay = () => {
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.zIndex = '0';
      }
      window.removeEventListener('dragend', resetOverlay);
    };
    
    window.addEventListener('dragend', resetOverlay);
  };

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
        {/* Stock Images Section */}
        <div className="image-section">
          <button 
            className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-cv-white hover:bg-cv-gray"
            onClick={() => setStockImagesExpanded(!stockImagesExpanded)}
          >
            <div className="flex items-center">
              <Image size={14} className="mr-2" />
              <span>Stock Images</span>
            </div>
            {stockImagesExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
          
          {stockImagesExpanded && (
            <div className="grid grid-cols-2 gap-2 mt-2 px-2">
              {sampleImages.map((image) => (
                <div 
                  key={image.id}
                  className="cursor-grab relative group"
                  draggable
                  onDragStart={(e) => handleImageDragStart(e, image)}
                >
                  <img 
                    src={image.url} 
                    alt={image.label} 
                    className="w-full h-20 object-cover rounded-md border border-cv-lightgray group-hover:border-cv-accent transition-colors"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-md transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs text-white font-medium px-2 py-1 rounded bg-black/70">Drag me</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Saved Images Section */}
        <div className="image-section">
          <button 
            className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-cv-white hover:bg-cv-gray"
            onClick={() => setSavedImagesExpanded(!savedImagesExpanded)}
          >
            <div className="flex items-center">
              <FolderOpen size={14} className="mr-2" />
              <span>Saved Images</span>
            </div>
            {savedImagesExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
          
          {savedImagesExpanded && (
            <div className="grid grid-cols-2 gap-2 mt-2 px-2">
              {savedImages.length > 0 ? (
                savedImages.map((image) => (
                  <div 
                    key={image.id}
                    className="cursor-grab relative group"
                    draggable
                    onDragStart={(e) => handleImageDragStart(e, image)}
                  >
                    <img 
                      src={image.url} 
                      alt={image.label} 
                      className="w-full h-20 object-cover rounded-md border border-cv-lightgray group-hover:border-cv-accent transition-colors"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-md transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-xs text-white font-medium px-2 py-1 rounded bg-black/70">Drag me</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-4 text-cv-white/50 text-sm">
                  No saved images yet
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Uploaded Images Section */}
        <div className="image-section">
          <button 
            className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-cv-white hover:bg-cv-gray"
            onClick={() => setUploadedImagesExpanded(!uploadedImagesExpanded)}
          >
            <div className="flex items-center">
              <Upload size={14} className="mr-2" />
              <span>Uploaded Images</span>
            </div>
            {uploadedImagesExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
          
          {uploadedImagesExpanded && (
            <div className="grid grid-cols-2 gap-2 mt-2 px-2">
              {uploadedImages.length > 0 ? (
                uploadedImages.map((image) => (
                  <div 
                    key={image.id}
                    className="cursor-grab relative group"
                    draggable
                    onDragStart={(e) => handleImageDragStart(e, image)}
                  >
                    <img 
                      src={image.url} 
                      alt={image.label} 
                      className="w-full h-20 object-cover rounded-md border border-cv-lightgray group-hover:border-cv-accent transition-colors"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-md transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-xs text-white font-medium px-2 py-1 rounded bg-black/70">Drag me</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-4 text-cv-white/50 text-sm">
                  No uploaded images yet
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 px-3 py-2">
        <div className="border-2 border-dashed border-cv-lightgray rounded-lg p-4 text-center cursor-pointer hover:bg-cv-gray/30 hover:border-cv-accent/30 transition-colors"
             onClick={handleImageUpload}>
          <p className="text-sm text-cv-white/70">
            Drag & drop images here <br /> or click to upload
          </p>
        </div>
      </div>
      
      {/* AI Image Generator Dialog */}
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
