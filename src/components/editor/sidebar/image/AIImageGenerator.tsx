
import React, { useState } from "react";
import { X, Sparkles, Wand2, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

interface AIImageGeneratorProps {
  onClose: () => void;
  onGenerate: (imageUrl: string) => void;
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [creativeLevel, setCreativeLevel] = useState([50]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [sampledPrompts] = useState([
    "Futuristic NFT marketplace UI with glowing elements",
    "Cyberpunk theme for web3 token gate interface",
    "Abstract digital wallet dashboard with 3D elements",
    "Modern NFT gallery layout with dark mode aesthetics",
    "Crypto dashboard with data visualization and neon accents"
  ]);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a description for your image",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI image generation (in a real app, this would call an API)
    setTimeout(() => {
      // These are placeholder images focused on NFTs, themes and UI designs
      const placeholderImages = [
        "https://via.placeholder.com/500x500/4F46E5/FFFFFF?text=NFT+Theme+1",
        "https://via.placeholder.com/500x500/10B981/FFFFFF?text=UI+Design",
        "https://via.placeholder.com/500x500/8B5CF6/FFFFFF?text=Web3+Interface",
        "https://via.placeholder.com/500x500/EC4899/FFFFFF?text=Dashboard+Theme",
        "https://via.placeholder.com/500x500/F59E0B/FFFFFF?text=Token+Gate+UI",
        "https://via.placeholder.com/500x500/3B82F6/FFFFFF?text=NFT+Gallery"
      ];
      
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      setGeneratedImageUrl(randomImage);
      setIsGenerating(false);
    }, 2000);
  };

  const handleUseImage = () => {
    if (generatedImageUrl) {
      onGenerate(generatedImageUrl);
    }
  };

  const handleSamplePromptClick = (samplePrompt: string) => {
    setPrompt(samplePrompt);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-cv-darkgray border-cv-lightgray text-cv-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-cv-white flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-cv-accent" />
            Generate Images with AI
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-cv-white/70 mb-1 block">Describe what you want to create</label>
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a detailed description..."
                className="bg-cv-gray border-cv-lightgray text-cv-white"
              />
            </div>
            
            <div>
              <label className="text-sm text-cv-white/70 mb-1 block">Creativity Level</label>
              <div className="flex items-center gap-2">
                <span className="text-xs">Realistic</span>
                <Slider
                  value={creativeLevel}
                  onValueChange={setCreativeLevel}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs">Creative</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-cv-white/70 mb-1 block">Try these examples:</label>
              <div className="grid grid-cols-1 gap-2">
                {sampledPrompts.map((samplePrompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSamplePromptClick(samplePrompt)}
                    className="text-left text-xs p-2 rounded bg-cv-gray hover:bg-cv-gray/70 text-cv-white/80 truncate"
                  >
                    {samplePrompt}
                  </button>
                ))}
              </div>
            </div>
            
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-cv-accent hover:bg-cv-accent/80"
            >
              {isGenerating ? (
                <>
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>
          </div>
          
          <div className="bg-cv-gray/30 rounded-md flex items-center justify-center p-4 min-h-[300px]">
            {generatedImageUrl ? (
              <div className="space-y-4">
                <img
                  src={generatedImageUrl}
                  alt="Generated by AI"
                  className="w-full h-auto rounded-md shadow-lg"
                />
                <Button
                  onClick={handleUseImage}
                  className="w-full bg-cv-accent hover:bg-cv-accent/80"
                >
                  Use This Image
                </Button>
              </div>
            ) : (
              <div className="text-center p-6">
                <Sparkles className="h-12 w-12 text-cv-accent/30 mx-auto mb-4" />
                <p className="text-cv-white/50 text-sm">
                  {isGenerating
                    ? "Creating your masterpiece..."
                    : "Your AI-generated image will appear here"}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIImageGenerator;
