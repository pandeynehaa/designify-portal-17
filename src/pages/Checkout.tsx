
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowLeft, AlertCircle, CreditCard, Wallet, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import MarketplaceFooter from "../components/marketplace/MarketplaceFooter";

const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock NFT data - in a real app this would come from an API
  const nft = {
    id: id || "1",
    name: "Digital Dreamscape #42",
    description: "A mesmerizing digital artwork that combines elements of surrealism and futurism.",
    image: "https://via.placeholder.com/400x400/4F46E5/FFFFFF?text=NFT",
    price: "0.85",
    usdPrice: "1452.63",
    creator: {
      name: "Digital Dreams Studio",
      royalty: "10%"
    },
    marketplace: {
      fee: "2.5%"
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Purchase successful!",
        description: `You are now the proud owner of ${nft.name}`,
      });
    }, 2000);
  };
  
  // Calculate the totals
  const price = parseFloat(nft.price);
  const usdPrice = parseFloat(nft.usdPrice);
  const royaltyPercentage = parseFloat(nft.creator.royalty) / 100;
  const royalty = price * royaltyPercentage;
  const feePercentage = parseFloat(nft.marketplace.fee) / 100;
  const fee = price * feePercentage;
  const total = price + royalty + fee;
  const usdTotal = usdPrice + (usdPrice * royaltyPercentage) + (usdPrice * feePercentage);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-6">
          <div className="mb-6">
            <Link to={`/nft/${id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} className="mr-1" />
              Back to item
            </Link>
          </div>
          
          <h1 className="text-3xl font-display font-bold text-foreground mb-8">Complete Purchase</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <div className="bg-muted/30 rounded-xl p-6 mb-6">
                <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                
                <div className="space-y-3 mb-6">
                  <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      className="mr-3" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')} 
                    />
                    <CreditCard size={20} className="mr-3 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-muted-foreground">Pay with Visa, Mastercard, etc.</div>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                    paymentMethod === 'crypto' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      className="mr-3" 
                      checked={paymentMethod === 'crypto'} 
                      onChange={() => setPaymentMethod('crypto')} 
                    />
                    <Wallet size={20} className="mr-3 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Crypto Wallet</div>
                      <div className="text-sm text-muted-foreground">Pay with ETH directly from your wallet</div>
                    </div>
                  </label>
                </div>
                
                {paymentMethod === 'card' ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="cardName" className="block text-sm font-medium mb-1">Name on Card</label>
                      <input 
                        type="text" 
                        id="cardName" 
                        className="w-full p-3 border border-border rounded-lg bg-background" 
                        required 
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                      <input 
                        type="text" 
                        id="cardNumber" 
                        className="w-full p-3 border border-border rounded-lg bg-background" 
                        placeholder="1234 5678 9012 3456" 
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry Date</label>
                        <input 
                          type="text" 
                          id="expiry" 
                          className="w-full p-3 border border-border rounded-lg bg-background" 
                          placeholder="MM/YY" 
                          required 
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                        <input 
                          type="text" 
                          id="cvc" 
                          className="w-full p-3 border border-border rounded-lg bg-background" 
                          placeholder="123" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium flex items-center justify-center"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Pay $${usdTotal.toFixed(2)} USD`}
                    </button>
                  </form>
                ) : (
                  <div>
                    <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="text-sm mb-2">Connect your wallet to complete this purchase with ETH</div>
                      <button 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium"
                        onClick={() => {
                          toast({
                            title: "Wallet connection",
                            description: "Wallet connection would be initiated here"
                          });
                        }}
                      >
                        Connect Wallet
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <ShieldCheck size={16} />
                <span>Secure payment processing</span>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-muted/30 rounded-xl p-6 sticky top-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="flex gap-4 p-4 border border-border rounded-lg mb-6">
                  <img 
                    src={nft.image} 
                    alt={nft.name} 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{nft.name}</h3>
                    <div className="text-sm text-muted-foreground">{nft.creator.name}</div>
                  </div>
                </div>
                
                <div className="space-y-3 border-b border-border pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Item Price</span>
                    <div className="text-right">
                      <div>{nft.price} ETH</div>
                      <div className="text-sm text-muted-foreground">${nft.usdPrice} USD</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Creator Royalty ({nft.creator.royalty})</span>
                    <div className="text-right">
                      <div>{royalty.toFixed(3)} ETH</div>
                      <div className="text-sm text-muted-foreground">${(usdPrice * royaltyPercentage).toFixed(2)} USD</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee ({nft.marketplace.fee})</span>
                    <div className="text-right">
                      <div>{fee.toFixed(3)} ETH</div>
                      <div className="text-sm text-muted-foreground">${(usdPrice * feePercentage).toFixed(2)} USD</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between font-medium text-lg mb-6">
                  <span>Total</span>
                  <div className="text-right">
                    <div>{total.toFixed(3)} ETH</div>
                    <div className="text-sm text-muted-foreground">${usdTotal.toFixed(2)} USD</div>
                  </div>
                </div>
                
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm flex gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <div>By completing this purchase, you agree to our Terms of Service and NFT Purchase Agreement.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <MarketplaceFooter />
    </div>
  );
};

export default Checkout;
