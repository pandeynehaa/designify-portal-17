
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowLeft, Share2, Heart, Eye, ExternalLink, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import MarketplaceFooter from "../components/marketplace/MarketplaceFooter";

const NFTDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  
  // Mock NFT data - in a real app this would come from an API
  const nft = {
    id: id || "1",
    name: "Digital Dreamscape #42",
    description: "A mesmerizing digital artwork that combines elements of surrealism and futurism, creating a dreamlike landscape that transcends reality.",
    image: "https://via.placeholder.com/600x600/4F46E5/FFFFFF?text=NFT",
    price: "0.85 ETH",
    usdPrice: "$1,452.63",
    creator: {
      name: "Digital Dreams Studio",
      image: "https://via.placeholder.com/50x50/10B981/FFFFFF?text=DD",
      verified: true
    },
    collection: {
      name: "Digital Dreamscapes",
      image: "https://via.placeholder.com/50x50/8B5CF6/FFFFFF?text=DD"
    },
    attributes: [
      { trait: "Background", value: "Nebula", rarity: "12%" },
      { trait: "Base", value: "Cyborg", rarity: "8%" },
      { trait: "Eyes", value: "Laser", rarity: "15%" },
      { trait: "Outfit", value: "Space Suit", rarity: "20%" },
      { trait: "Accessory", value: "Floating Crystal", rarity: "5%" }
    ],
    views: 1285,
    likes: 342
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-6">
          <div className="mb-6">
            <Link to="/marketplace" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Back to marketplace
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* NFT Image */}
            <div className="bg-black/5 rounded-xl p-4 aspect-square flex items-center justify-center">
              <img 
                src={nft.image} 
                alt={nft.name} 
                className="max-w-full max-h-full rounded-lg object-contain"
              />
            </div>
            
            {/* NFT Details */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Link to={`/collection/${nft.collection.name}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <img src={nft.collection.image} alt={nft.collection.name} className="w-5 h-5 rounded-full mr-1" />
                      {nft.collection.name}
                    </Link>
                  </div>
                  <h1 className="text-3xl font-display font-bold text-foreground">{nft.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : ""} />
                  </button>
                  <button className="p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <Link to={`/artist/${nft.creator.name}`} className="flex items-center gap-2">
                  <img src={nft.creator.image} alt={nft.creator.name} className="w-8 h-8 rounded-full" />
                  <span className="font-medium">{nft.creator.name}</span>
                  {nft.creator.verified && (
                    <span className="bg-blue-500 text-white rounded-full p-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  )}
                </Link>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye size={16} className="mr-1" />
                  {nft.views.toLocaleString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Heart size={16} className="mr-1" />
                  {nft.likes.toLocaleString()}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">Current Price</div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold">{nft.price}</div>
                  <div className="text-muted-foreground">{nft.usdPrice}</div>
                </div>
              </div>
              
              <div className="flex gap-3 mb-8">
                <button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium flex items-center justify-center">
                  <ShoppingCart size={18} className="mr-2" />
                  Buy Now
                </button>
                <button className="flex-1 border border-border hover:bg-muted py-3 rounded-lg font-medium">
                  Make Offer
                </button>
              </div>
              
              <div className="border-t border-border pt-6 mb-6">
                <h3 className="font-medium mb-4">Description</h3>
                <p className="text-muted-foreground">{nft.description}</p>
              </div>
              
              <div className="border-t border-border pt-6">
                <h3 className="font-medium mb-4">Properties</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {nft.attributes.map((attr, index) => (
                    <div key={index} className="border border-border rounded-lg p-3 bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="text-xs text-muted-foreground uppercase">{attr.trait}</div>
                      <div className="font-medium truncate">{attr.value}</div>
                      <div className="text-xs text-primary">{attr.rarity} rarity</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-2xl font-display font-semibold mb-6">More from this collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Link to={`/nft/${nft.id}-${i}`} key={i} className="group">
                  <div className="bg-black/5 rounded-xl overflow-hidden aspect-square mb-3">
                    <img 
                      src={`https://via.placeholder.com/400x400/${i % 2 ? '4F46E5' : '8B5CF6'}/FFFFFF?text=NFT+${i}`} 
                      alt={`NFT ${i}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium truncate">Digital Dreamscape #{42 + i}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm">{(Math.random() * 2).toFixed(2)} ETH</span>
                    <span className="text-xs text-muted-foreground">
                      <Heart size={12} className="inline mr-1" />
                      {Math.floor(Math.random() * 100)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <MarketplaceFooter />
    </div>
  );
};

export default NFTDetail;
