
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Filter, ChevronDown, ExternalLink, Share2, Globe, Twitter, Instagram } from "lucide-react";
import MarketplaceFooter from "../components/marketplace/MarketplaceFooter";

const ArtistProfile: React.FC = () => {
  const { artistName } = useParams<{ artistName: string }>();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortOpen, setSortOpen] = useState(false);
  
  // Mock artist data - in a real app this would come from an API
  const artist = {
    name: artistName || "Digital Dreams Studio",
    description: "Award-winning digital art studio specializing in surrealist dreamscapes and futuristic concepts, founded in 2018 and based in San Francisco.",
    image: "https://via.placeholder.com/1200x400/10B981/FFFFFF?text=Artist+Banner",
    avatar: "https://via.placeholder.com/100x100/10B981/FFFFFF?text=DD",
    verified: true,
    joined: "April 2021",
    followers: 12500,
    following: 85,
    website: "https://digitaldreams.studio",
    twitter: "@digitaldreams",
    instagram: "@digitaldreamsstudio",
    stats: {
      items: 124,
      collections: 3,
      sold: 78,
      volumeTraded: "675.8 ETH"
    }
  };
  
  // Mock collections
  const collections = [
    {
      id: "1",
      name: "Digital Dreamscapes",
      image: "https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=Collection+1",
      itemCount: 100,
      floorPrice: "0.75 ETH"
    },
    {
      id: "2",
      name: "Neon Futures",
      image: "https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Collection+2",
      itemCount: 15,
      floorPrice: "1.2 ETH"
    },
    {
      id: "3",
      name: "Abstract Realities",
      image: "https://via.placeholder.com/400x200/EC4899/FFFFFF?text=Collection+3",
      itemCount: 9,
      floorPrice: "2.5 ETH"
    }
  ];
  
  // Mock NFTs
  const nfts = Array.from({ length: 8 }, (_, i) => ({
    id: `${i+1}`,
    name: `Digital Dreamscape #${42 + i}`,
    image: `https://via.placeholder.com/400x400/${i % 2 ? '4F46E5' : '8B5CF6'}/FFFFFF?text=NFT+${i+1}`,
    collection: i < 4 ? "Digital Dreamscapes" : i < 6 ? "Neon Futures" : "Abstract Realities",
    price: (Math.random() * 2).toFixed(2),
    likes: Math.floor(Math.random() * 100)
  }));
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-6 -mt-16 relative z-10">
          <div className="bg-background rounded-xl border border-border shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <img 
                src={artist.avatar} 
                alt={artist.name} 
                className="w-24 h-24 rounded-full border-4 border-background"
              />
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-3xl font-display font-bold text-foreground">{artist.name}</h1>
                  {artist.verified && (
                    <span className="bg-blue-500 text-white rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-3 text-sm">
                  <div className="text-muted-foreground">Joined {artist.joined}</div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{artist.followers.toLocaleString()}</span>
                    <span className="text-muted-foreground">followers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{artist.following.toLocaleString()}</span>
                    <span className="text-muted-foreground">following</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground max-w-2xl mb-3">{artist.description}</p>
                
                <div className="flex flex-wrap gap-3">
                  <a href={artist.website} className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer">
                    <Globe size={14} className="mr-1" />
                    Website
                  </a>
                  <a href={`https://twitter.com/${artist.twitter}`} className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer">
                    <Twitter size={14} className="mr-1" />
                    Twitter
                  </a>
                  <a href={`https://instagram.com/${artist.instagram}`} className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer">
                    <Instagram size={14} className="mr-1" />
                    Instagram
                  </a>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-medium">
                  Follow
                </button>
                <button className="p-2 rounded-full bg-muted/80 hover:bg-muted transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">{artist.stats.items}</div>
                <div className="text-sm text-muted-foreground">items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{artist.stats.collections}</div>
                <div className="text-sm text-muted-foreground">collections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{artist.stats.sold}</div>
                <div className="text-sm text-muted-foreground">sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{artist.stats.volumeTraded}</div>
                <div className="text-sm text-muted-foreground">volume traded</div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="nfts" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="nfts">NFTs</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nfts">
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
                          <div className="font-medium mb-2">Collections</div>
                          {collections.map(collection => (
                            <div key={collection.id} className="flex items-center gap-2 mb-2">
                              <input type="checkbox" id={`collection-${collection.id}`} className="w-4 h-4" />
                              <label htmlFor={`collection-${collection.id}`}>{collection.name}</label>
                            </div>
                          ))}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      <div className="text-xs text-muted-foreground mb-1">{nft.collection}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{nft.price} ETH</span>
                        <span className="text-xs text-muted-foreground">
                          Likes: {nft.likes}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
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
                          <div className="text-sm text-muted-foreground">{nft.collection}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{nft.price} ETH</div>
                          <div className="text-xs text-muted-foreground">
                            Likes: {nft.likes}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="collections">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <Link to={`/collection/${collection.name}`} key={collection.id} className="border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <img 
                      src={collection.image} 
                      alt={collection.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{collection.name}</h3>
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="text-muted-foreground">Items: </span>
                          <span>{collection.itemCount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Floor: </span>
                          <span>{collection.floorPrice}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <MarketplaceFooter />
    </div>
  );
};

export default ArtistProfile;
