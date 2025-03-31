
import React, { useState } from "react";
import { Sparkles, Plus, Trash2, Download, Share, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

const SavedDesignsPanel: React.FC = () => {
  const [showMintDialog, setShowMintDialog] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  
  // In a real app, these would be fetched from an API or state management
  const [savedDesigns] = useState([
    { 
      id: 1, 
      name: "Marketplace Theme 1", 
      template: "marketplace",
      thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=300",
      date: "2023-05-15" 
    },
    { 
      id: 2, 
      name: "Token Gate Design", 
      template: "token-gate",
      thumbnail: "https://images.unsplash.com/photo-1639322537234-e7895e08a659?w=300",
      date: "2023-06-20" 
    },
    { 
      id: 3, 
      name: "NFT Drops Page", 
      template: "drops",
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300",
      date: "2023-07-10" 
    }
  ]);
  
  const handleMintNFT = (designId: number) => {
    setSelectedDesign(designId);
    setShowMintDialog(true);
  };
  
  const handleConfirmMint = () => {
    // In a real app, this would call an API to mint the NFT
    toast({
      title: "NFT Minting Initiated",
      description: "Your design is being minted as an NFT. This may take a few minutes."
    });
    setShowMintDialog(false);
    
    // Simulate minting completion
    setTimeout(() => {
      toast({
        title: "NFT Minted Successfully",
        description: "Your design has been minted and is now available in the marketplace."
      });
    }, 3000);
  };
  
  const getTemplateLabel = (template: string) => {
    switch(template) {
      case 'marketplace': return 'Marketplace';
      case 'token-gate': return 'Token Gate';
      case 'drops': return 'NFT Drops';
      case 'buy-coin': return 'Buy Coin';
      default: return template;
    }
  };
  
  const getTemplateColor = (template: string) => {
    switch(template) {
      case 'marketplace': return 'bg-pink-500';
      case 'token-gate': return 'bg-blue-500';
      case 'drops': return 'bg-purple-500';
      case 'buy-coin': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const handleDeleteDesign = (designId: number) => {
    // In a real app, this would delete the design via an API call
    toast({
      title: "Design Deleted",
      description: "The design has been removed from your saved designs."
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-cv-white">Saved Designs</h3>
        <Button size="sm" variant="ghost" className="text-cv-white">
          <Plus size={16} className="mr-1" /> New
        </Button>
      </div>
      
      <div className="space-y-4">
        {savedDesigns.map(design => (
          <div key={design.id} className="bg-cv-darkgray border border-cv-lightgray rounded-lg overflow-hidden">
            <div className="relative">
              <img 
                src={design.thumbnail} 
                alt={design.name} 
                className="w-full h-32 object-cover"
              />
              <Badge className={`absolute top-2 right-2 ${getTemplateColor(design.template)} text-white`}>
                {getTemplateLabel(design.template)}
              </Badge>
            </div>
            
            <div className="p-3">
              <h4 className="text-cv-white font-medium mb-1">{design.name}</h4>
              <p className="text-cv-white/60 text-xs mb-3">Saved on {design.date}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Download size={14} />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Share size={14} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                    onClick={() => handleDeleteDesign(design.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                
                <Button 
                  size="sm"
                  className="bg-cv-accent hover:bg-cv-accent/90 text-white"
                  onClick={() => handleMintNFT(design.id)}
                >
                  <Sparkles size={14} className="mr-1" /> Mint as NFT
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 border border-dashed border-cv-lightgray rounded-lg text-center">
        <p className="text-cv-white/70 text-sm mb-3">Want to make your designs available to others?</p>
        <Button className="bg-cv-accent hover:bg-cv-accent/90">
          Visit Themes Marketplace <ExternalLink size={14} className="ml-1" />
        </Button>
      </div>
      
      {/* Mint NFT Dialog */}
      <Dialog open={showMintDialog} onOpenChange={setShowMintDialog}>
        <DialogContent className="bg-cv-darkgray border-cv-lightgray text-cv-white">
          <DialogHeader>
            <DialogTitle className="text-cv-white flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-cv-accent" />
              Mint Your Design as NFT
            </DialogTitle>
            <DialogDescription className="text-cv-white/70">
              Your design will be minted as an NFT on the blockchain and listed in the Themes Marketplace.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4 bg-cv-black/30 rounded-md">
            <div className="flex items-center space-x-4">
              <img 
                src={savedDesigns.find(d => d.id === selectedDesign)?.thumbnail} 
                alt="Design preview" 
                className="w-24 h-24 object-cover rounded border border-cv-lightgray"
              />
              <div>
                <h4 className="text-cv-white font-medium">
                  {savedDesigns.find(d => d.id === selectedDesign)?.name}
                </h4>
                <p className="text-cv-white/60 text-sm mt-1">
                  Template: {getTemplateLabel(savedDesigns.find(d => d.id === selectedDesign)?.template || '')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm text-cv-white/70 mb-1 block">Minting Fee</label>
              <p className="text-cv-white font-medium">0.01 ETH</p>
            </div>
            
            <div>
              <label className="text-sm text-cv-white/70 mb-1 block">Creator Royalties</label>
              <p className="text-cv-white font-medium">5% on future sales</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowMintDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-cv-accent hover:bg-cv-accent/90" onClick={handleConfirmMint}>
              <Sparkles size={14} className="mr-1" /> 
              Mint NFT
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavedDesignsPanel;
