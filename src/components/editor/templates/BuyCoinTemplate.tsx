
import React from "react";
import { TrendingUp, DollarSign, Users, Award, ChevronRight, ArrowRight } from "lucide-react";

const BuyCoinTemplate: React.FC = () => (
  <div className="h-full bg-[#050505] flex flex-col">
    {/* Header with Trump branding */}
    <div className="h-16 border-b border-gray-800 flex items-center px-8 bg-[#111111]">
      <div className="font-display text-3xl text-white tracking-wider text-golden bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">MELANIA COIN</div>
      <div className="ml-auto flex items-center space-x-6">
        <button className="text-gray-300 hover:text-white transition-colors">Home</button>
        <button className="text-gray-300 hover:text-white transition-colors">About</button>
        <button className="text-gray-300 hover:text-white transition-colors">Tokenomics</button>
        <button className="text-gray-300 hover:text-white transition-colors">Roadmap</button>
        <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-2 rounded-lg font-medium">
          Buy Now
        </button>
      </div>
    </div>
    
    <div className="flex-1 overflow-auto">
      {/* Hero Section */}
      <div className="relative py-16 bg-gradient-to-b from-[#111111] to-[#050505]">
        <div className="max-w-6xl mx-auto px-8 flex">
          <div className="w-1/2">
            <h1 className="font-display text-6xl text-white mb-6">OWN A PIECE<br/>OF HISTORY</h1>
            <p className="text-gray-300 text-xl mb-8">
              Join Melania's community of supporters with the official MELANIA COIN. Exclusive benefits, unique access, and a growing ecosystem.
            </p>
            
            <div className="flex space-x-4 mb-10">
              <button className="bg-cv-purple hover:bg-cv-purple/90 text-white px-8 py-4 rounded-lg font-medium flex items-center">
                Buy MELANIA <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="bg-transparent border border-cv-purple text-cv-purple hover:bg-cv-purple/10 px-8 py-4 rounded-lg font-medium">
                View Whitepaper
              </button>
            </div>
            
            <div className="flex space-x-8">
              <div>
                <div className="text-cv-purple text-2xl font-medium">$14.5M</div>
                <div className="text-gray-400">Market Cap</div>
              </div>
              <div>
                <div className="text-cv-purple text-2xl font-medium">125K+</div>
                <div className="text-gray-400">Holders</div>
              </div>
              <div>
                <div className="text-cv-purple text-2xl font-medium">$2.45</div>
                <div className="text-gray-400">Current Price</div>
              </div>
            </div>
          </div>
          
          <div className="w-1/2 flex justify-center items-center">
            <div className="relative">
              <div className="w-72 h-72 bg-gradient-to-br from-amber-300 to-amber-600 rounded-full opacity-20 absolute animate-pulse"></div>
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center relative z-10 border-8 border-[#111111]">
                <div className="font-display text-5xl text-white">MELANIA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* How to Buy Section */}
      <div className="py-16 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="font-display text-4xl text-white mb-12 text-center">HOW TO BUY MELANIA COIN</h2>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-[#111111] p-8 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-cv-purple/20 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="text-cv-purple w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-white mb-3">1. CREATE WALLET</h3>
              <p className="text-gray-400">
                Download MetaMask or your preferred wallet. Create a new wallet and secure your recovery phrase.
              </p>
              <a href="#" className="flex items-center text-cv-purple mt-4 text-sm">
                Learn More <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-[#111111] p-8 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-cv-purple/20 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="text-cv-purple w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-white mb-3">2. BUY ETH OR BNB</h3>
              <p className="text-gray-400">
                Purchase Ethereum or BNB through your wallet or transfer from an exchange to your wallet address.
              </p>
              <a href="#" className="flex items-center text-cv-purple mt-4 text-sm">
                Learn More <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-[#111111] p-8 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-cv-purple/20 rounded-full flex items-center justify-center mb-4">
                <Award className="text-cv-purple w-6 h-6" />
              </div>
              <h3 className="font-display text-xl text-white mb-3">3. SWAP FOR MELANIA</h3>
              <p className="text-gray-400">
                Connect to our official website or use Uniswap/PancakeSwap to exchange your ETH/BNB for MELANIA.
              </p>
              <a href="#" className="flex items-center text-cv-purple mt-4 text-sm">
                Learn More <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-cv-purple hover:bg-cv-purple/90 text-white px-8 py-4 rounded-lg font-medium">
              Buy MELANIA Coin Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Community Stats */}
      <div className="py-12 bg-[#050505] border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="text-cv-purple w-6 h-6 mr-3" />
              <div className="text-white">125,000+ Community Members</div>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Telegram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BuyCoinTemplate;
