
import React from "react";
import { CalendarDays, Clock, Wallet, Share2 } from "lucide-react";

const DropsTemplate: React.FC = () => (
  <div className="h-full bg-[#0F0F15] flex flex-col">
    {/* Header */}
    <div className="h-16 border-b border-gray-800 flex items-center px-8 bg-[#18181E]">
      <div className="font-display text-2xl text-white tracking-wider">CYBERPUNK 2077</div>
      <div className="ml-auto flex items-center space-x-6">
        <button className="text-gray-300 hover:text-white transition-colors">Home</button>
        <button className="text-gray-300 hover:text-white transition-colors">Collection</button>
        <button className="text-gray-300 hover:text-white transition-colors">Roadmap</button>
        <button className="text-gray-300 hover:text-white transition-colors">Team</button>
        <button className="bg-cv-purple text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <Wallet className="h-4 w-4" />
          <span>Connect</span>
        </button>
      </div>
    </div>
    
    <div className="flex-1 flex overflow-hidden">
      {/* Left Column */}
      <div className="w-1/2 p-10 overflow-auto">
        <div className="mb-8">
          <h1 className="font-display text-5xl text-white mb-6">EXCLUSIVE CYBERPUNK<br/>DIGITAL COLLECTIBLES</h1>
          <div className="flex space-x-4 mb-6">
            <div className="flex items-center space-x-2 bg-[#18181E] px-4 py-2 rounded-lg">
              <CalendarDays className="w-4 h-4 text-cv-purple" />
              <span className="text-gray-300">May 15, 2023</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#18181E] px-4 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-cv-purple" />
              <span className="text-gray-300">10,000 Items</span>
            </div>
          </div>
          
          <p className="text-gray-300 mb-8 leading-relaxed">
            Step into the futuristic world of Night City with our exclusive Cyberpunk 2077 NFT collection. Each digital collectible grants you unique in-game benefits and access to exclusive community events. Join the resistance and own a piece of the future.
          </p>
          
          <div className="space-y-6">
            <div className="bg-[#18181E] p-6 rounded-lg border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-xl text-white">DROP DETAILS</h3>
                <div className="bg-cv-purple/20 text-cv-purple px-3 py-1 rounded-md text-sm font-medium">UPCOMING</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 mb-1">Mint Price</div>
                  <div className="text-white font-medium">0.15 ETH</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Total Supply</div>
                  <div className="text-white font-medium">10,000</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Mint Date</div>
                  <div className="text-white font-medium">May 15, 2023</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Mint Time</div>
                  <div className="text-white font-medium">2:00 PM UTC</div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="bg-cv-purple text-white px-8 py-4 rounded-lg font-medium flex-1">Mint Now</button>
              <button className="bg-transparent border border-cv-purple text-cv-purple px-8 py-4 rounded-lg font-medium">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Column */}
      <div className="w-1/2 bg-[#18181E] border-l border-gray-800 flex items-center justify-center p-10">
        <div className="relative w-full max-w-md">
          <div className="w-full h-[450px] rounded-xl bg-gradient-to-br from-cv-purple/30 via-blue-500/20 to-purple-500/20 overflow-hidden flex items-center justify-center">
            <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-cv-purple to-blue-500 flex items-center justify-center transform rotate-12 shadow-2xl border-4 border-white/10">
              <div className="font-display text-4xl text-white transform -rotate-12">CYBER</div>
            </div>
          </div>
          
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#232329] px-8 py-4 rounded-lg shadow-xl border border-gray-700 w-4/5">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-400 text-sm">Current Bid</div>
                <div className="text-white font-medium">0.325 ETH</div>
              </div>
              <div className="bg-cv-purple/10 border border-cv-purple/30 rounded-lg px-4 py-2">
                <div className="text-gray-400 text-xs">Ends in</div>
                <div className="text-cv-purple font-medium">23:45:12</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DropsTemplate;
