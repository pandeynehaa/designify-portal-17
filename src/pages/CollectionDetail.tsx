
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Filter, Grid, List, ChevronDown, ExternalLink, Share2 } from "lucide-react";
import MarketplaceFooter from "../components/marketplace/MarketplaceFooter";

const CollectionDetail: React.FC = () => {
  const { collectionName } = useParams<{ collectionName: string }>();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortOpen, setSortOpen] = useState(false);
  
  // Mock collection data - in a real app this would come from an API
  const collection = {
    name: collectionName || "Digital Dreamscapes",
    description: "A collection of mesmerizing digital artworks that combine elements of surrealism and futurism, creating dreamlike landscapes that transcend reality.",
    image: "https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=Collection+Banner",
    logo: "https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=DD",
    creator: {
      name: "Digital Dreams Studio",
      image: "https://via.placeholder.com/50x50/10B981/FFFFFF?text=DD",
      verified: true
    },
    stats: {
      items: 1000,
      owners: 425,
      floorPrice: "0.75 ETH",
      volumeTraded: "1245.8 ETH"
    }
  };
  
  // Mock NFTs in collection
  const nfts = Array.from({ length: 8 }, (_, i) => ({
    id: `${i+1}`,
    name: `Digital Dreamscape #${42 + i}`,
    image: `https://via.placeholder.com/400x400/${i % 2 ? '4F46E5' : '8B5CF6'}/FFFFFF?text=NFT+${i+1}`,
    price: (Math.random() * 2).toFixed(2),
    likes: Math.floor(Math.random() * 100)
  }));
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <img 
            src={collection.image} 
            alt={collection.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-6 -mt-16 relative z-10">
          <div className="bg-background rounded-xl border border-border shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <img 
                src={collection.logo} 
                alt={collection.name} 
                className="w-24 h-24 rounded-xl border-4 border-background"
              />
              
              <div className="flex-1">
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">{collection.name}</h1>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">by</span>
                    <Link to={`/artist/${collection.creator.name}`} className="flex items-center gap-1">
                      <img src={collection.creator.image} alt={collection.creator.name} className="w-5 h-5 rounded-full" />
                      <span className="font-medium text-sm">{collection.creator.name}</span>
                      {collection.creator.verified && (
                        <span className="bg-blue-500 text-white rounded-full p-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground max-w-2xl">{collection.description}</p>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors">
                  <Share2 size={20} />
                </button>
                <button className="p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors">
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">{collection.stats.items}</div>
                <div className="text-sm text-muted-foreground">items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{collection.stats.owners}</div>
                <div className="text-sm text-muted-foreground">owners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{collection.stats.floorPrice}</div>
                <div className="text-sm text-muted-foreground">floor price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{collection.stats.volumeTraded}</div>
                <div className="text-sm text-muted-foreground">volume traded</div>
              </div>
            </div>
          </div>
          
          <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center">
              <div className="relative">
                <button 
                  className="px-4 py-2 border border-border rounded-lg flex items-center gap-2 hover:bg-muted/50 transition-colors"
                  onClick={() => setSortOpen(!sortOpen)}
                >
                  <Filter size={16} />
                  <span>Filter & Sort</span>
                  <ChevronDown size={16} />
                </button>
                
                {sortOpen && (
                  <div className="absolute top-full left-0 mt-2 w-60 bg-background border border-border rounded-lg shadow-lg z-20 p-4">
                    <div className="mb-4">
                      <div className="font-medium mb-2">Sort by</div>
                      <select className="w-full p-2 border border-border rounded-md bg-background">
                        <option>Recently listed</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Most popular</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <div className="font-medium mb-2">Price range</div>
                      <div className="flex gap-2">
                        <input placeholder="Min" className="w-full p-2 border border-border rounded-md bg-background" />
                        <input placeholder="Max" className="w-full p-2 border border-border rounded-md bg-background" />
                      </div>
                    </div>
                    
                    <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-lg font-medium">
                      Apply Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                className={`p-2 rounded-lg ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted transition-colors'}`}
                onClick={() => setView('grid')}
              >
                <Grid size={16} />
              </button>
              <button 
                className={`p-2 rounded-lg ${view === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted transition-colors'}`}
                onClick={() => setView('list')}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {nfts.map((nft) => (
                <Link to={`/nft/${nft.id}`} key={nft.id} className="group">
                  <div className="bg-black/5 rounded-xl overflow-hidden aspect-square mb-3">
                    <img 
                      src={nft.image} 
                      alt={nft.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium truncate">{nft.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm">{nft.price} ETH</span>
                    <span className="text-xs text-muted-foreground">
                      <Heart size={12} className="inline mr-1" />
                      {nft.likes}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4 mb-12">
              {nfts.map((nft) => (
                <Link to={`/nft/${nft.id}`} key={nft.id} className="block border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <img 
                      src={nft.image} 
                      alt={nft.name} 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{nft.name}</h3>
                      <div className="text-sm text-muted-foreground">Digital Dreams Studio</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{nft.price} ETH</div>
                      <div className="text-xs text-muted-foreground">
                        <Heart size={12} className="inline mr-1" />
                        {nft.likes}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <MarketplaceFooter />
    </div>
  );
};

export default CollectionDetail;
