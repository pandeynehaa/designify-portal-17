
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { 
  Save, 
  Plus, 
  Bookmark, 
  ArrowRight, 
  Trash2, 
  Copy, 
  Share,
  Edit 
} from "lucide-react";
import { useCanvasState } from "@/hooks/useCanvasState";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface SavedDesign {
  id: string;
  name: string;
  template: string;
  thumbnail: string;
  createdAt: Date;
  elements: any[];
  minted: boolean;
}

const TEMPLATE_COLORS = {
  "marketplace": "bg-purple-500/20 border-purple-500 text-purple-300",
  "drops": "bg-pink-500/20 border-pink-500 text-pink-300",
  "token-gate": "bg-blue-500/20 border-blue-500 text-blue-300",
  "buy-coin": "bg-green-500/20 border-green-500 text-green-300"
};

const SavedDesignsPanel: React.FC = () => {
  const { droppedElements } = useCanvasState();
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [newDesignName, setNewDesignName] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [mintDialogOpen, setMintDialogOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<SavedDesign | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<string>("marketplace");
  
  const handleSaveDesign = () => {
    if (!newDesignName.trim()) {
      toast({
        title: "Design Name Required",
        description: "Please enter a name for your design.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a thumbnail (in a real app this would be a canvas snapshot)
    const thumbnailUrl = "https://via.placeholder.com/300x200/6d28d9/ffffff?text=Design";
    
    const newDesign: SavedDesign = {
      id: `design-${Date.now()}`,
      name: newDesignName,
      template: currentTemplate,
      thumbnail: thumbnailUrl,
      createdAt: new Date(),
      elements: JSON.parse(JSON.stringify(droppedElements)),
      minted: false
    };
    
    setSavedDesigns([...savedDesigns, newDesign]);
    setNewDesignName("");
    setSaveDialogOpen(false);
    
    toast({
      title: "Design Saved",
      description: `Your design "${newDesignName}" has been saved successfully.`
    });
  };
  
  const handleDeleteDesign = (designId: string) => {
    setSavedDesigns(savedDesigns.filter(design => design.id !== designId));
    
    toast({
      title: "Design Deleted",
      description: "Your design has been deleted."
    });
  };
  
  const handleMintDesign = () => {
    if (!selectedDesign) return;
    
    // In a real app, this would initiate the NFT minting process
    setSavedDesigns(savedDesigns.map(design => 
      design.id === selectedDesign.id 
        ? { ...design, minted: true } 
        : design
    ));
    
    setMintDialogOpen(false);
    
    toast({
      title: "Design Minted",
      description: `Your design "${selectedDesign.name}" has been minted as an NFT and is now available on the marketplace.`
    });
  };
  
  const handleDesignClick = (design: SavedDesign) => {
    // In a real app, this would load the selected design
    toast({
      title: "Design Selected",
      description: `Loading "${design.name}" into the editor.`
    });
  };
  
  const getTemplateColor = (template: string) => {
    return TEMPLATE_COLORS[template as keyof typeof TEMPLATE_COLORS] || "bg-gray-500/20 border-gray-500 text-gray-300";
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="h-full flex flex-col bg-cv-darkgray">
      <div className="editor-toolbar justify-between bg-cv-gray border-b border-cv-lightgray">
        <span className="text-cv-white text-sm font-medium">Saved Designs</span>
        <div>
          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-cv-white hover:bg-cv-lightgray/20">
                <Plus size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-cv-gray border border-cv-lightgray text-cv-white">
              <DialogHeader>
                <DialogTitle>Save Current Design</DialogTitle>
                <DialogDescription className="text-cv-lightgray">
                  Save your design to access it later or mint it as an NFT.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="design-name">Design Name</Label>
                  <Input 
                    id="design-name" 
                    value={newDesignName} 
                    onChange={(e) => setNewDesignName(e.target.value)}
                    placeholder="My Awesome Design"
                    className="bg-cv-darkgray border-cv-lightgray"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Template</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["marketplace", "drops", "token-gate", "buy-coin"].map(template => (
                      <Button 
                        key={template}
                        type="button"
                        variant={currentTemplate === template ? "default" : "outline"}
                        className={`capitalize ${
                          currentTemplate === template 
                            ? "bg-cv-accent" 
                            : "border-cv-lightgray hover:bg-cv-lightgray/20"
                        }`}
                        onClick={() => setCurrentTemplate(template)}
                      >
                        {template.replace('-', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveDesign}>Save Design</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {savedDesigns.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <Bookmark className="h-12 w-12 text-cv-lightgray mb-4" />
            <h3 className="text-cv-white font-medium mb-2">No Saved Designs</h3>
            <p className="text-cv-lightgray text-sm">
              Save your current design to access it later or mint it as an NFT.
            </p>
            <Button 
              className="mt-6" 
              onClick={() => setSaveDialogOpen(true)}
            >
              Save Current Design
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {savedDesigns.map(design => (
              <Card 
                key={design.id} 
                className="bg-cv-gray border border-cv-lightgray overflow-hidden group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                
                <img 
                  src={design.thumbnail} 
                  alt={design.name} 
                  className="w-full h-32 object-cover"
                />
                
                <CardContent className="p-3 relative">
                  <div className="absolute top-3 right-3 flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-cv-lightgray hover:text-cv-white hover:bg-cv-lightgray/20"
                      onClick={() => handleDeleteDesign(design.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                  
                  <h3 className="font-medium text-cv-white truncate">{design.name}</h3>
                  
                  <div className="flex items-center justify-between mt-2">
                    <Badge className={`${getTemplateColor(design.template)} text-xs`}>
                      {design.template.replace('-', ' ')}
                    </Badge>
                    <span className="text-xs text-cv-lightgray">{formatDate(design.createdAt)}</span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cv-darkgray to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center z-20">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-cv-white hover:bg-cv-lightgray/20"
                      onClick={() => handleDesignClick(design)}
                    >
                      <Edit size={14} className="mr-1" /> Edit
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className={design.minted ? "bg-green-600 hover:bg-green-700" : ""}
                          onClick={() => {
                            setSelectedDesign(design);
                            setMintDialogOpen(true);
                          }}
                          disabled={design.minted}
                        >
                          {design.minted ? "Minted" : "Mint NFT"}
                        </Button>
                      </DialogTrigger>
                      
                      <DialogContent className="bg-cv-gray border border-cv-lightgray text-cv-white">
                        <DialogHeader>
                          <DialogTitle>Mint Design as NFT</DialogTitle>
                          <DialogDescription className="text-cv-lightgray">
                            This will mint your design as an NFT on the blockchain and make it available in the marketplace.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="py-4">
                          <Card className="bg-cv-darkgray border border-cv-lightgray p-4">
                            <img 
                              src={selectedDesign?.thumbnail} 
                              alt={selectedDesign?.name} 
                              className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="font-medium text-cv-white">{selectedDesign?.name}</h3>
                            <p className="text-cv-lightgray text-sm mt-1">
                              Template: <span className="capitalize">{selectedDesign?.template.replace('-', ' ')}</span>
                            </p>
                          </Card>
                          
                          <div className="mt-4 space-y-2">
                            <h4 className="font-medium text-cv-white">Minting Details</h4>
                            <p className="text-cv-lightgray text-sm">
                              Your design will be minted as an NFT on the blockchain and listed on the Themes marketplace.
                            </p>
                            <p className="text-cv-lightgray text-sm">
                              You will receive 85% of all sales of your theme.
                            </p>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setMintDialogOpen(false)}>Cancel</Button>
                          <Button onClick={handleMintDesign}>Mint as NFT</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
      
      <div className="p-4 border-t border-cv-lightgray">
        <Button 
          className="w-full"
          onClick={() => setSaveDialogOpen(true)}
        >
          <Save size={16} className="mr-2" /> Save Current Design
        </Button>
      </div>
    </div>
  );
};

export default SavedDesignsPanel;
