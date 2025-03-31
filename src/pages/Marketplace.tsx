
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { mockThemes } from "../data/mockThemes";
import MarketplaceHeader from "../components/marketplace/MarketplaceHeader";
import SearchFilter from "../components/marketplace/SearchFilter";
import ThemeSection from "../components/marketplace/ThemeSection";
import MarketplaceFooter from "../components/marketplace/MarketplaceFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Heart, Grid, List } from "lucide-react";

const Marketplace: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  
  // Mock featured NFTs
  const featuredNFTs = [
    {
      id: "1",
      name: "Digital Dreamscape #42",
      image: "https://via.placeholder.com/400x400/4F46E5/FFFFFF?text=Featured+1",
      creator: "Digital Dreams Studio",
      price: "0.85",
      likes: 342
    },
    {
      id: "2",
      name: "Neon Warrior #15",
      image: "https://via.placeholder.com/400x400/10B981/FFFFFF?text=Featured+2",
      creator: "NeonArtLab",
      price: "1.2",
      likes: 221
    },
    {
      id: "3",
      name: "Cosmic Journey #7",
      image: "https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=Featured+3",
      creator: "Cosmic Creators",
      price: "0.75",
      likes: 189
    },
    {
      id: "4",
      name: "Abstract Reality #19",
      image: "https://via.placeholder.com/400x400/EC4899/FFFFFF?text=Featured+4",
      creator: "Abstract Studios",
      price: "2.5",
      likes: 278
    }
  ];
  
  // Mock collections
  const collections = [
    {
      name: "Digital Dreamscapes",
      creator: "Digital Dreams Studio",
      image: "https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=Collection+1",
      itemCount: 100,
      floorPrice: "0.75"
    },
    {
      name: "Neon Futures",
      creator: "NeonArtLab",
      image: "https://via.placeholder.com/400x200/10B981/FFFFFF?text=Collection+2",
      itemCount: 15,
      floorPrice: "1.2"
    },
    {
      name: "Cosmic Journeys",
      creator: "Cosmic Creators",
      image: "https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Collection+3",
      itemCount: 42,
      floorPrice: "0.5"
    },
    {
      name: "Abstract Realities",
      creator: "Abstract Studios",
      image: "https://via.placeholder.com/400x200/EC4899/FFFFFF?text=Collection+4",
      itemCount: 28,
      floorPrice: "2.5"
    }
  ];
  
  // Mock top artists
  const topArtists = [
    {
      name: "Digital Dreams Studio",
      avatar: "https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=DD",
      verified: true,
      volumeTraded: "523.4"
    },
    {
      name: "NeonArtLab",
      avatar: "https://via.placeholder.com/100x100/10B981/FFFFFF?text=NA",
      verified: true,
      volumeTraded: "342.8"
    },
    {
      name: "Cosmic Creators",
      avatar: "https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=CC",
      verified: false,
      volumeTraded: "189.2"
    },
    {
      name: "Abstract Studios",
      avatar: "https://via.placeholder.com/100x100/EC4899/FFFFFF?text=AS",
      verified: true,
      volumeTraded: "756.1"
    }
  ];
  
  // Trending NFTs - these will show in the "Explore" tab
  const trendingNFTs = Array.from({ length: 12 }, (_, i) => ({
    id: `${i+5}`,
    name: `Digital Art #${42 + i}`,
    image: `https://via.placeholder.com/400x400/${i % 4 === 0 ? '4F46E5' : i % 4 === 1 ? '10B981' : i % 4 === 2 ? '8B5CF6' : 'EC4899'}/FFFFFF?text=NFT+${i+5}`,
    creator: i % 4 === 0 ? "Digital Dreams Studio" : i % 4 === 1 ? "NeonArtLab" : i % 4 === 2 ? "Cosmic Creators" : "Abstract Studios",
    price: (Math.random() * 3).toFixed(2),
    likes: Math.floor(Math.random() * 300)
  }));
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-6">
          <MarketplaceHeader />
          <SearchFilter view={view} setView={setView} />
          
          <Tabs defaultValue="featured" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
              <TabsTrigger value="artists">Top Artists</TabsTrigger>
              <TabsTrigger value="explore">Explore</TabsTrigger>
            </TabsList>
            
            <TabsContent value="featured">
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-semibold text-foreground">Featured NFTs</h2>
                  <Link to="/marketplace" className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
                    View All
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredNFTs.map((nft) => (
                    <Link to={`/nft/${nft.id}`} key={nft.id} className="group">
                      <div className="bg-black/5 rounded-xl overflow-hidden aspect-square mb-3">
                        <img 
                          src={nft.image} 
                          alt={nft.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-medium truncate">{nft.name}</h3>
                      <div className="text-xs text-muted-foreground mb-1">by {nft.creator}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{nft.price} ETH</span>
                        <span className="text-xs text-muted-foreground">
                          <Heart size={12} className="inline mr-1" />
                          {nft.likes}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <ThemeSection title="Featured Themes" themes={mockThemes.slice(0, 3)} />
            </TabsContent>
            
            <TabsContent value="collections">
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-semibold text-foreground">Popular Collections</h2>
                  <Link to="/marketplace" className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
                    View All
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {collections.map((collection, index) => (
                    <Link to={`/collection/${collection.name}`} key={index} className="group">
                      <div className="bg-black/5 rounded-xl overflow-hidden aspect-video mb-3">
                        <img 
                          src={collection.image} 
                          alt={collection.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-medium truncate">{collection.name}</h3>
                      <div className="text-xs text-muted-foreground mb-1">by {collection.creator}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{collection.itemCount} items</span>
                        <span className="text-xs text-muted-foreground">
                          Floor: {collection.floorPrice} ETH
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="artists">
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-semibold text-foreground">Top Creators</h2>
                  <Link to="/marketplace" className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
                    View All
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {topArtists.map((artist, index) => (
                    <Link to={`/artist/${artist.name}`} key={index} className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col items-center text-center">
                        <img 
                          src={artist.avatar} 
                          alt={artist.name} 
                          className="w-20 h-20 rounded-full mb-4"
                        />
                        <div className="flex items-center gap-1 mb-2">
                          <h3 className="font-medium">{artist.name}</h3>
                          {artist.verified && (
                            <span className="bg-blue-500 text-white rounded-full p-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                          )}
                        </div>
                        <div className="text-muted-foreground text-sm mb-3">
                          Volume: {artist.volumeTraded} ETH
                        </div>
                        <button className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                          Follow
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="explore">
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-semibold text-foreground">Explore NFTs</h2>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingNFTs.map((nft) => (
                      <Link to={`/nft/${nft.id}`} key={nft.id} className="group">
                        <div className="bg-black/5 rounded-xl overflow-hidden aspect-square mb-3">
                          <img 
                            src={nft.image} 
                            alt={nft.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-medium truncate">{nft.name}</h3>
                        <div className="text-xs text-muted-foreground mb-1">by {nft.creator}</div>
                        <div className="flex justify-between items-center">
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
                  <div className="space-y-4">
                    {trendingNFTs.map((nft) => (
                      <Link to={`/nft/${nft.id}`} key={nft.id} className="block border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
                        <div className="flex items-center gap-4">
                          <img 
                            src={nft.image} 
                            alt={nft.name} 
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{nft.name}</h3>
                            <div className="text-sm text-muted-foreground">by {nft.creator}</div>
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
            </TabsContent>
          </Tabs>
          
          <ThemeSection title="Popular Themes" themes={mockThemes.slice(3)} />
        </div>
      </main>
      
      <MarketplaceFooter />
    </div>
  );
};

export default Marketplace;
